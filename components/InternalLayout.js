import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { isLoggedIn } from '../lib/auth';
import Sidebar from './SideBar'
import { useRouter } from 'next/router';

function InternalLayout({ children, ...props }) {

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login');
        } else {
            setLoading(false);
        }

    }, [])

    return (
        <Container fluid>
            {
                loading ?
                    <center style={{ marginTop: "45vh" }}>
                        <Spinner animation="border" role="status" />
                    </center>
                    :
                    <Row>
                        <Col xs={2} id="sidebar-wrapper">
                            <Sidebar />
                        </Col>
                        <Col xs={10} id="page-content-wrapper pt-3" style={{ paddingTop: 30 }}>
                            {children}
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default InternalLayout
