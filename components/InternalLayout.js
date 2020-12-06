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
                    <>
                        <div
                            style={{
                                width: 250,
                                display: "inline-block",
                                background: "#007bff",
                                color: "white !important"
                            }}
                            id="sidebar-wrapper">
                            <Sidebar />
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                width: "calc(100% - 250px)"
                            }}
                        >
                            <div id="page-content-wrapper pt-3" style={{ width: '100%', paddingTop: 30 }}>
                                {children}
                            </div>
                        </div>
                    </>
            }
        </Container>
    )
}

export default InternalLayout
