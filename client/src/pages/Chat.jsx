import React, { useContext, useState, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import UserChat from '../components/chat/UserChat'
import PotentialChats from '../components/chat/PotentialChats'
import ChatBox from '../components/chat/ChatBox'
import { useIsMobile } from '../hooks/useIsMobile'

// Add this custom hook at the top of your file or in a separate hooks file

const Chat = () => {
    const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const isMobile = useIsMobile();

    return (
        <>
            <PotentialChats />
            {userChats.length < 1 ? null : (
                <Stack direction='horizontal' gap={4} className='align-items-start'>
                    {/* UserChats - Hide on mobile when currentChat exists */}
                    <Stack
                        className='messages-box flex-grow-0 pe-3'
                        gap={3}
                        style={{
                            display: (isMobile && currentChat) ? 'none' : 'flex',
                        }}
                    >
                        {isUserChatsLoading && <p>Loading Chats...</p>}
                        {userChats?.map((chat, index) => (
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </Stack>

                    {/* ChatBox - Show when selected or on desktop */}
                    <Stack
                        className='chat-box-container'
                        style={{
                            display: (isMobile && !currentChat) ? 'none' : 'flex',
                            width: '100%'
                        }}
                    >
                        <ChatBox />
                    </Stack>
                </Stack>
            )}
        </>
    )
}

export default Chat