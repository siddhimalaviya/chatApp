const { Server } = require("socket.io");

const io = new Server({ cors: "http://192.168.29.142:5173/" });
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New Connection", socket.id);

    //listen to a connection
    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers);
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            });
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    })

    // socket.on("sendTextMessage", (message) => {
    //     const user = onlineUsers.find((user) => user.userId === message.recipientId);
    //     if (user) {
    //         io.to(user.socketId).emit("newMessage", message);
    //     }
    // })
});

io.listen(3000);