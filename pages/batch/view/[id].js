import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { createClient } from '../../../lib/api';
import { useEffect } from 'react';
import InternalLayout from '../../../components/InternalLayout'
import { Container, FormControl, Form, Row, Col, Button, ProgressBar } from 'react-bootstrap';

const base = process.env.NEXT_PUBLIC_BASE_URL;

const Batch = () => {

    const [batch, setBatch] = useState({})

    const router = useRouter();

    const client = createClient();

    const { id } = router.query;

    useEffect(() => {
        fetchBatchData();
    }, [id])

    async function fetchBatchData() {
        try {
            const res = await client.get(`/batch/${id}`);
            setBatch(res.data.data);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <InternalLayout>
            <h3>
                Batch Name: {batch?.batchName}
            </h3>
            <Container>
                {
                    batch?.keys?.map((key, i) => (
                        <Row key={i}>
                            <Col>
                                {key}
                            </Col>
                            <Col>
                                <DownloadButton
                                    fileName={key}
                                />
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </InternalLayout >
    )
}

function DownloadButton(props) {
    const {
        fileName
    } = props;

    const [downloading, setDownloading] = useState(false);

    const [downloadStatus, setDownloadStatus] = useState(0);

    const client = createClient();

    const downloadFunc = async (e) => {
        try {
            setDownloading(true);
            setDownloadStatus(0);
            const response = await client.get(
                `/upload/${fileName}`,
                {
                    headers: {
                        responseType: 'blob', // important
                    },
                    onDownloadProgress: progressEvent => {
                        const total = parseFloat(progressEvent?.total)
                        const current = progressEvent.loaded

                        let percentCompleted = Math.floor(current / total * 100)
                        setDownloadStatus(percentCompleted)
                    }
                }
            )
            await new Promise((resolve, reject) => setTimeout(() => resolve(true)), 1000)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();

        } catch (e) {
            console.log(e);
        } finally {
            setDownloading(false)
        }
    }

    return (<>
        {
            downloading ?
                <ProgressBar variant="success" label={`${downloadStatus}%`} now={downloadStatus} />
                : <Button
                    onClick={
                        downloadFunc
                    }
                >
                    download
        </Button>
        }
    </>)
}


export default Batch 
