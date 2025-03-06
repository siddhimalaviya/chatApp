import React, { useContext } from 'react'
import { Navbar, Container, Nav, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext)
    return (
        <Navbar bg='dark' expand='lg' variant='dark' className="mb-4" style={{ height: '3.75rem' }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/" className='text-decoration-none text-white'>
                        Chat App
                    </Link>
                </Navbar.Brand>
                <span className='text-warning'>Logged in as {user?.name}</span>
                <Nav>
                    <Stack gap={2} direction='horizontal'>
                        {user ?
                            <Link to="/login" onClick={logOutUser} className='text-decoration-none text-white'>
                                Logout
                            </Link>
                            :
                            <>
                                <Link to="/login" className='text-decoration-none text-white'>
                                    Login
                                </Link>
                                <Link to="/register" className='text-decoration-none text-white'>
                                    Register
                                </Link>
                            </>
                        }
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar