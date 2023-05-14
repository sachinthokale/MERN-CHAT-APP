const express = require("express");
// import { chats } from "./Data/Dummydata.cjs";
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const userRoutes = require("./Routes/userRoutes.js")
const { notFound, errorHandler } = require("./middleware/errorMiddlewares.js")


dotenv.config()
const PORT = process.env.PORT
connectDB()

const app = express();
app.use(express.json())  // to accept json data 
// console.log(dummydata)
app.get("/", (req, res) => {
    res.send("Api is working......")


})

app.use('/api/user', userRoutes)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, console.log(`Server started on port ${PORT}`))