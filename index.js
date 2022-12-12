const express=require("express")
const dotenv=require("dotenv").config()
const cors = require("cors")
const auth=require("./middlewares/authentication")
const connect=require("./config/db")
const userRouter=require("./route/userRoute")
const todoRouter=require("./route/todoRoute")
const app=express()

app.use(express.json())
app.use(cors({
    origin : "*"
}))

const PORT= process.env.PORT||8000
app.get("/",(req,res)=>{
    res.send("homepage")
})
app.use("/users",userRouter)
// app.use(auth)
app.use("/todos",todoRouter)

app.listen(PORT,async()=>{
    await connect()
    console.log(`http://localhost:${PORT}`)
})