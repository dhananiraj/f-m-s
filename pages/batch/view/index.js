import React, { useEffect, useState, useRef } from 'react'
import InternalLayout from '../../../components/InternalLayout'
import { Container, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import { createClient } from '../../../lib/api';
import Link from "next/Link";


export default function view() {

    const client = createClient();
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

    console.log(batches)
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
                        <Row key={i} className="py-2">
                            <Col>
                                {
                                    batch?.batchName
                                }
                            </Col>
                            <Col>
                                <Link href={`/batch/view/${batch._id}`}>
                                    <a>
                                        view
                                    </a>
                                </Link>
                            </Col>
                        </Row>
                    )) :
                        <p>
                            No Batch Assigned Yet
                        </p>
                }
            </Container >
        </InternalLayout >
    )
}
