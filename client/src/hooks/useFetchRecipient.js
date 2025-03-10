import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;
            const response = await getRequest(`users/find/${recipientId}`);
            if (response.error) {
                return console.log(response);
            }
            setRecipientUser(response);
        }
        getUser();
    }, [recipientId]);
    return { recipientUser };
} 
