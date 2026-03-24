import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import todoRoutes from './routes/todo.routes.js'
import connectDb from './config/db.js'
import userRouter from './routes/user.routes.js'
import cookieParser from "cookie-parser";
const app= express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
  })
)

connectDb()
app.use("/todo",todoRoutes)
app.use("/user",userRouter)
app.listen(port,()=>{
  console.log(`Server is running at http://localhost:4000`);
  
})