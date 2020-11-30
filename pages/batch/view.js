import React, { useEffect, useState, useRef } from 'react'
import InternalLayout from '../../components/InternalLayout'
import { Container, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import { client } from '../../lib/api';
import FileUpload from '../../components/FileUpload'

export default function Create() {

    const [keys, setKeys] = useState([]);
    const [batchName, setBatchName] = useState();
    const [n, setN] = useState(1);
    const [batches, setBatches] = useState([]);
    const viewerRef = useRef();

    useEffect(() => {
        fetchBatches();
    }, [])

    async function fetchBatches() {
        try {
            const res = await client.get('/batch/userbatch/all');
            setBatches(res.data.data);
        } catch (e) {
            console.log(e.response.message)
        }
    }

    const handleCreateBatch = async (e) => {
        e.preventDefault();
        try {
            console.log(keys)
            const res = await client.post('/batch', {
                batchName,
                keys,
                viewer: viewerRef.current.value,
                batchCreatedBy: 'Raj'
            });
        } catch (e) {
            console.log(e.response.message)
        }
    }

    return (
        <InternalLayout>
            <Container>
                <Row className="py-3">
                    <Col>
                        Batch name
                    </Col>
                    <Col>
                        Action
                    </Col>
                </Row>
                {
                    batches.length > 0 ? batches?.map((batch, i) => (
                        <Row key={i}>
                            <Col>
                                {
                                    JSON.stringify(batch)
                                }
                            </Col>
                        </Row>
                    )) :
                        <p>
                            No Batch Assigned Yet
                        </p>
                }
            </Container>
        </InternalLayout>
    )
}
