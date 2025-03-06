import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const PotentialChats = () => {
    const { potentialChats } = useContext(ChatContext)
    console.log(potentialChats);

    return (
        <div className='all-users'>
            {potentialChats.map((u, index) => (
                <div className='single-user' key={index}>
                    <p>{u.name}</p>
                    <span className="user-online"></span>
                </div>
            ))}
        </div>
    )
}

export default PotentialChats