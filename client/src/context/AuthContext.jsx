import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [isLoggingLoading, setIsLoggingLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [registerInfo])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [loginInfo])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegistering(true)
        setRegisterError(null)
        const response = await postRequest('users/register', JSON.stringify(registerInfo))
        setIsRegistering(false)
        if (response.error) {
            return setRegisterError(response.message)
        }
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response)
    }, [registerInfo])

    const logOutUser = useCallback(() => {
        localStorage.removeItem('user')
        setUser(null)
    }, [])

    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoggingLoading(true)
        setLoginError(null)
        const response = await postRequest('users/login', JSON.stringify(loginInfo))
        setIsLoggingLoading(false)
        if (response.error) {
            return setLoginError(response.message)
        }
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response)
    }, [loginInfo])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logOutUser,
        loginUser,
        loginError,
        loginInfo,
        isLoggingLoading,
        updateLoginInfo
    }}>{children}</AuthContext.Provider>
}
