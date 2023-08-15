const express = require("express");
// import { chats } from "./Data/Dummydata.cjs";
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const userRoutes = require("./Routes/userRoutes.js")
const { notFound, errorHandler } = require("./middleware/errorMiddlewares.js")
const chatRoutes = require("./Routes/chatRoutes.js")
const messageRoutes = require("./Routes/messageRoutes.js")
const path = require("path")


dotenv.config()
const PORT = process.env.PORT
connectDB()

const app = express();
app.use(express.json())  // to accept json data 
// console.log(dummydata)


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// --------Deployment---------

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/Frontend/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"))
    })

} else {
    app.get('/', (req, res) => { res.send("api is running successfully") })
}

// --------Deployment---------

app.use(notFound)
app.use(errorHandler)


const server = app.listen(PORT, console.log(`Server started on port ${PORT}`))
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
})

io.on("connection", (socket) => {
    console.log("connected to socket.io")

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)

    })

    socket.on("typing", (room) => socket.in(room).emit("typing")
    )
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing")
    )

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) {
            return console.log("chat.user npt defined")

        }

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) {
                return;
            }
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        })

    })
})