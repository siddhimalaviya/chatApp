import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const PotentialChats = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)

    return (
        <div className='all-users'>
            {potentialChats.map((u, index) => (
                <div className='single-user' key={index} onClick={() => createChat(user._id, u._id)}>
                    <p>{u.name}</p>
                    <span className={onlineUsers?.some((user) => user.userId === u._id) ? "user-online" : ""}></span>
                </div>
            ))}
        </div>
    )
}

export default PotentialChats