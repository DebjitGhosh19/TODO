import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import todoRoutes from './routes/todo.routes.js'
import connectDb from './config/db.js'
import userRouter from './routes/user.routes.js'
const app= express()
const port=4000
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
  res.send("Hello")
})
connectDb()
app.use("/todo",todoRoutes)
app.use("/user",userRouter)
app.listen(port,()=>{
  console.log(`Server is running at http://localhost:4000`);
  
})