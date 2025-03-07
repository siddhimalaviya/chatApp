export const unreadNotification = (notifications) => {
    return notifications.filter((n) => !n.isRead)
}


