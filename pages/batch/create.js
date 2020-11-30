import React, { useEffect, useState, useRef } from 'react'
import InternalLayout from '../../components/InternalLayout'
import { Container, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import { client } from '../../lib/api';
import FileUpload from '../../components/FileUpload'

export default function Create() {

    const [keys, setKeys] = useState([]);
    const [batchName, setBatchName] = useState();
    const [n, setN] = useState(1);
    const [userList, setUserList] = useState([]);
    const viewerRef = useRef();

    useEffect(() => {
        fetchUserList();
    }, [])

    async function fetchUserList() {
        try {
            const res = await client.get('/user/all');
            setUserList(res.data.data);
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
                        Enter the Batch Name:
                    <FormControl
                            type="text"
                            value={batchName}
                            onChange={
                                (e) => {
                                    setBatchName(e.target.value)
                                }
                            }
                        />
                    </Col>
                    <Col>
                        Search of user who can view:
                    <Form.Control
                            as="select"
                            ref={viewerRef}
                        >
                            {
                                userList.map((user, index) => (
                                    <option value={user._id} key={index}>{user.userName}</option>
                                ))
                            }
                        </Form.Control>
                    </Col>
                </Row>
                {
                    (Array(n).fill(n)).map((key, index) => (
                        <FileUpload
                            key={index}
                            index={index}
                            setKeys={setKeys}
                        />
                    ))
                }
                <Button
                    size={"sm"}
                    onClick={
                        () => {
                            setN((n) => {
                                return n + 1
                            })
                        }
                    }
                >Add more files</Button>
            </Container>
            <Container className="py-3">
                <Row>
                    <Col>
                        <Button
                            className="btn-success pl-auto ml-auto"
                            onClick={
                                handleCreateBatch
                            }
                        >
                            Create Batch
                        </Button>
                    </Col>
                </Row>
            </Container>
        </InternalLayout>
    )
}
