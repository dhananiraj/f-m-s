import React from "react";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

const SideBar = props => {
    const router = useRouter();
    return (
        <>

            <Nav className="col-md-12 sidebar"
                activeKey="/home"
                onSelect={selectedKey => {
                    router.push(selectedKey)
                }}
                style={{
                    color: "white !important",
                    display: "inline-block"
                }}
            >
                <div className="sidebar-sticky">
                    <Nav.Item>
                        <Nav.Link href="/batch/create">Create Batch</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/batch/view">View Batches</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/logout">logout</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>

        </>
    );
};

export default SideBar