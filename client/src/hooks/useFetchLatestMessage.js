import { useContext, useEffect, useState } from "react";
import { getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext)
    const [latestMessage, setLatestMessage] = useState(null);


    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`messages/${chat?._id}`)
            if (response.error) {
                return console.log(response)
            }
            const latestMessage = response[response.length - 1]
            setLatestMessage(latestMessage)
        }
        getMessages()
    }, [newMessage, notifications])

    return { latestMessage }


}
