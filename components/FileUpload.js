import React, { useRef, useState } from 'react';
import { Row, Col, Form, FormControl, Spinner } from 'react-bootstrap';
import { client } from '../lib/api';

function FileUpload({
    setKeys,
    index
}) {

    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [fileName, setFileName] = useState("Select a file");

    const ref = useRef();

    const handleUpload = async function (e) {
        console.log(ref?.current?.files[0]);
        try {
            setLoading(true);
            const file = new FormData();
            file.append('file', ref?.current?.files[0])
            const res = await client.post('/upload', file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            setKeys((keys) => {
                keys[index] = res.data.data.key;
                return keys
            })
            setUploaded(true);
        } catch (e) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <Row className="py-2">
            <Col>
                <Form.File
                    ref={ref}
                    type="file"
                    name="file"
                    label={fileName}
                    onChange={(e) => {
                        setFileName(e.target.files[0].name)
                    }}
                    data-browse="Select"
                    custom
                />
            </Col>
            <Col>
                {(!loading && !uploaded) && <FormControl
                    type="button"
                    onClick={handleUpload}
                    name="upload"
                    value="upload"
                />}
                {
                    loading && <Spinner animation="border" role="status" />
                }
                {
                    uploaded && <p>uploaded</p>
                }
            </Col>
        </Row>
    )
}

export default FileUpload
