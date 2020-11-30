import React from "react";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

const SideBar = props => {
    const router = useRouter();
    return (
        <>

            <Nav className="col-md-12 d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => {
                    router.push(selectedKey)
                }}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/batch/create">Create Batch</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/batch/view">View Batches</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/logout">logout</Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};

export default SideBar