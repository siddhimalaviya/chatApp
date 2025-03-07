import { createContext, useCallback, useEffect, useState } from 'react'
import { getRequest, postRequest } from '../utils/services'
import { io } from 'socket.io-client'
export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState([])
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [notifications, setNotifications] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const newSocket = io("http://192.168.29.142:3000")
        setSocket(newSocket)
        return () => newSocket.disconnect()
    }, [user])

    //get online users
    useEffect(() => {
        if (socket === null) return
        socket?.emit("addNewUser", user?._id)
        socket?.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
        return () => {
            socket?.off("getOnlineUsers")
        }
    }, [socket])

    //send message to the recipient
    useEffect(() => {
        if (socket === null) return
        const recipientId = currentChat?.members?.find((id) => id !== user?._id);
        socket?.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage])

    //receive message and notification from the recipient
    useEffect(() => {
        if (socket === null) return
        socket?.on("getMessage", (res) => {
            if (currentChat?._id !== res?.chatId) return
            setMessages((prev) => [...prev, res])
        })
        socket?.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members?.some((id) => id === res.senderId)
            if (isChatOpen) {
                setNotifications((prev) => [{ ...res, isRead: true }, ...prev])
            } else {
                setNotifications((prev) => [res, ...prev])
            }
        })
        return () => {
            socket?.off("getMessage")
            socket?.off("getNotification")
        }
    }, [socket, currentChat])

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`users`)
            if (response.error) {
                return console.log("Error fetching users", response)
            }
            const pChats = response.filter(u => {
                let isChatCreated = false
                if (user?._id === u?._id) return false
                if (userChats) {
                    isChatCreated = userChats.some(chat => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChats)
            setAllUsers(response)
        }

        getUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
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
    }, [user, notifications])

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true)
            setMessagesError(null)
            const response = await getRequest(`messages/${currentChat?._id}`)
            setIsMessagesLoading(false)
            if (response.error) {
                return setMessagesError(response.error)
            }
            setMessages(response)

        }
        getMessages()
    }, [currentChat])

    const sendTextMessage = async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must enter a message");
        const response = await postRequest(`messages`, JSON.stringify({ text: textMessage, senderId: sender._id, chatId: currentChatId }))
        if (response.error) {
            return setSendTextMessageError(response)
        }
        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage('')
    }

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`chats`, JSON.stringify({ firstId, secondId }))
        if (response.error) {
            return console.log("Error creating chat", response)
        }
        setUserChats((prev) => [...prev, response])
    }, [userChats])

    const markAllNotificationsAsRead = useCallback(async (notifications) => {
        const modifiedNotifications = notifications.map((n) => {
            return { ...n, isRead: true }
        })
        setNotifications(modifiedNotifications)
    }, [])

    const markNotificationAsRead = useCallback(async (n, userChats, user, notifications) => {
        const desiredChat = userChats.find((chat) => {
            const chatMembers = [user._id, n.senderId]
            const isDesiredChat = chat?.members?.every((member) => chatMembers.includes(member))
            return isDesiredChat
        })

        //mark notification as read
        const mNotifications = notifications.map((el) => {
            if (el.senderId === n.senderId) {
                return { ...el, isRead: true }
            } else {
                return el
            }
        })
        setNotifications(mNotifications)
        updateCurrentChat(desiredChat)
    }, [])

    const markThisUserNotificationsAsRead = useCallback(async (thisUserNotifications, notifications) => {
        const mNotifications = notifications.map((el) => {
            let notification;
            thisUserNotifications.forEach(n => {
                if (n.senderId === el.senderId) {
                    notification = { ...n, isRead: true }
                } else {
                    notification = el
                }
            })
            return notification
        })
        setNotifications(mNotifications)
    }, [])
    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError, potentialChats, createChat, updateCurrentChat, messages, isMessagesLoading, messagesError, currentChat, sendTextMessage, onlineUsers, notifications, allUsers, markAllNotificationsAsRead, markNotificationAsRead, markThisUserNotificationsAsRead }}>
            {children}
        </ChatContext.Provider>
    )
}

