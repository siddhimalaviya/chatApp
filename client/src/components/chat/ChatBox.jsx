import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import { Button, Stack } from 'react-bootstrap'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { messages, isMessagesLoading, messagesError, currentChat, sendTextMessage, updateCurrentChat } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState('');
    const scroll = useRef(null);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!recipientUser) return (
        <p style={{ textAlign: 'center', width: '100%' }}>No conversation selected yet...</p>
    )

    if (isMessagesLoading) return (
        <p style={{ textAlign: 'center', width: '100%' }}>Loading Chat...</p>
    )

    return (
        <Stack gap={2} className='chat-box'>
            <div className="chat-header bg-dark">
                {currentChat && (
                    <Button
                        className='bg-transparent text-white d-md-none mb-2 border-0'
                        onClick={() => updateCurrentChat(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Button>
                )}
                <h3><strong>{recipientUser?.name}</strong></h3>
            </div>
            <Stack gap={2} className='messages'>
                {messages && messages?.map((message, index) => (
                    <Stack key={index} gap={1} className={`${message.senderId === user._id ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}`}
                        ref={scroll}
                    >
                        <span style={{ display: "flex", justifyContent: "end" }}>{message.text}</span>
                        <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
                    </Stack>
                ))}
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input'>
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily='nunito' borderColor='rgba(72,112,223,0.2)' />
                <button className='send-btn' onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                </button>
            </Stack>
        </Stack>
    )
}

export default ChatBox;