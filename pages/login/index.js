import React, { useState } from 'react';

import { login } from '../../lib/auth';

import { FormControl, Container, Row, Col, Spinner } from 'react-bootstrap';

import { useRouter } from 'next/router';

import Particles from 'react-particles-js';


const style = {
    page: {
        paddingTop: 70,
        paddingBottom: 20,
        backgroundColor: "#007bff",
        minHeight: "100vh"
    },
    container: {
        paddingTop: 30,
        paddingBottom: 30,
        maxWidth: 400,
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 20,
    }
}


function index() {

    const [message, setMessage] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        userName: '',
        password: '',
    });

    const router = useRouter();

    const formChangehandler = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setMessage(null);
    }

    const loginHandler = async (e) => {
        try {
            setLoading(true)
            const res = await login(form);
            setError(false);
            setMessage(res.data.message)

            setTimeout(() => {
                router.push('/batch/create')
            }, 2000)
        } catch (e) {
            setError(true);
            setMessage(e.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={style.page}>
            <Particles
                style={{
                    zIndex: 0,
                    position: 'fixed',
                    top: 0,
                    height: '100vh'

                }}
            />
            <Container style={style.container}>
                <center>
                    <h1>
                        Sign In
                    </h1>
                </center>
                <Row>
                    <Col xs={12}>
                        <label htmlFor="userName" className="pt-3">
                            User Name
                        </label>
                        <FormControl
                            id="userName"
                            onChange={formChangehandler}
                            className="p-auto m-auto"
                            type="text"
                            name="userName"
                            placeholder="user name"
                            value={form?.userName}
                        ></FormControl>
                    </Col>
                    <Col xs={12}>
                        <label htmlFor="password" className="pt-3">
                            Password
                        </label>
                        <FormControl
                            id="password"
                            className="p-auto m-auto"
                            onChange={formChangehandler}
                            type="password"
                            name="password"
                            value={form?.password}
                        ></FormControl>
                    </Col>
                    <Col xs={12} className="py-3">
                        {
                            !loading ? <FormControl
                                id="submitButton"
                                className="p-auto mx-auto btn btn-primary"
                                type="submit"
                                onClick={
                                    (e) => {
                                        loginHandler();
                                    }
                                }
                                value="Sign in"
                            >
                            </FormControl>
                                : <center>
                                    <Spinner animation="border" role="status" />
                                </center>
                        }
                    </Col>
                </Row>
                {!loading && <Row>
                    <Col xs="12">
                        <FormControl
                            type="button"
                            onClick={
                                (e) => {
                                    router.push('/signup')
                                }
                            }
                            value="Sign up"
                        />
                    </Col>
                </Row>}
                {message && <center style={{ color: `${error ? 'red' : 'green'}` }}>{message}</center>}
                <center className="pt-3">
                    <small>
                        <a>
                            Powered by Raj Flex Banner
                        </a>
                    </small>
                </center>
            </Container >
        </div >
    )
}

export default index
