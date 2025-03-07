import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, isRegisterLoading, registerError } = useContext(AuthContext)
    return (
        <>
            <Form onSubmit={registerUser}>
                <Row style={{ height: '90vh', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Col md={6} xs={12}>
                        <Stack gap={2}>
                            <h1 className='text-center'>Register</h1>
                            <Form.Control
                                type='text'
                                placeholder='Enter username'
                                value={registerInfo.name}
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={registerInfo.email}
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={registerInfo.password}
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
                            <Button type='submit' className='bg-success text-white'>
                                {isRegisterLoading ? 'Creating your account...' : 'Register'}
                            </Button>
                            {registerError && (
                                <Alert variant='danger'><p>{registerError}</p></Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>

        </>
    )
}

export default Register