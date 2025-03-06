import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, loginError, isLoggingLoading } = useContext(AuthContext)

    return (
        <div>
            <Form onSubmit={loginUser}>
                <Row style={{ height: '90vh', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Col md={6} xs={12}>
                        <Stack gap={2}>
                            <h1 className='text-center'>Login</h1>
                            <Form.Control type='email' placeholder='Enter email' value={loginInfo.email} onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
                            <Form.Control type='password' placeholder='Enter password' value={loginInfo.password} onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
                            <Button type='submit'>
                                {isLoggingLoading ? 'Getting you in...' : 'Login'}
                            </Button >
                            {loginError && <Alert variant='danger'><p>{loginError}</p></Alert>}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login