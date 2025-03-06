import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import UserChat from '../components/chat/UserChat'
import PotentialChats from '../components/chat/PotentialChats'

const Chat = () => {
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    console.log(userChats);

    return (
        <Container>
            <PotentialChats />
            {userChats.length < 1 ? null : <Stack direction='horizontal' gap={4} className='align-items-start'>
                <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
                    {isUserChatsLoading && <p>Loading Chats...</p>}
                    {userChats.map((chat, index) => (
                        <div key={index}>
                            <UserChat chat={chat} user={user} />
                        </div>
                    ))}
                </Stack>
                <p className='chat-box flex-grow-1'>ChatBox</p>
            </Stack>}
        </Container>
    )
}

export default Chat