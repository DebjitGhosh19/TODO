import express from'express'
import { createTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controllers.js';

const todoRoutes=express.Router()

todoRoutes.get("/get",getTodo)
todoRoutes.post("/create",createTodo)
todoRoutes.put("/update/:id",updateTodo)
todoRoutes.delete("/delete/:id",deleteTodo)


export default todoRoutes;