import express from'express'
import { createTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controllers.js';
import { authenticate } from '../middleware/authorize.js';

const todoRoutes=express.Router()

todoRoutes.get("/get",authenticate,getTodo)
todoRoutes.post("/create",authenticate,createTodo)
todoRoutes.put("/update/:id",authenticate,updateTodo)
todoRoutes.delete("/delete/:id",authenticate,deleteTodo)


export default todoRoutes;