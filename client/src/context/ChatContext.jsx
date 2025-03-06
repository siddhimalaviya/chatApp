import { createContext, useEffect, useState } from 'react'
import { getRequest } from '../utils/services'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState([])
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            debugger
            const response = await getRequest(`chats/${user?._id}`)
            if (response.error) {
                return console.log("Error fetching users", response)
            }
            const pChats = response.filter(u => {
                let isChatCreated = false
                if (user._id === u._id) return false
                if (userChats) {
                    isChatCreated = userChats.some(chat => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChats)
        }

        getUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const response = await getRequest(`chats/${user?._id}`)
                setIsUserChatsLoading(false)
                if (response.error) {
                    return setUserChatsError(response.error)
                }
                setUserChats(response)
            }
        }
        getUserChats()
    }, [user])

    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError, potentialChats }}>
            {children}
        </ChatContext.Provider>
    )
}

