import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { ChatContextProvider } from './context/ChatContext'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Router>
        <ChatContextProvider user={user}>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/*" element={user ? <Chat /> : <Navigate to="/login" />} />
          </Routes>
        </ChatContextProvider>
      </Router>
    </>
  )
}

export default App
