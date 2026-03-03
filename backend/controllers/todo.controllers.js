import Todo from "../models/todo.model.js"

export const getTodo=async (req,res) => {
  try {
    const todos=await Todo.find()
    res.status(200).json({message:"Get Todos",todos})
  } catch (error) {
        res.status(400).json({message:"error occure in get todo"})
  }
}
export const createTodo=async (req,res) => {
  try {
    const {text,completed}=req.body;
    
    const todo=new Todo({
      text,completed
    })
    const newTodo=await todo.save();
    res.status(200).json({message:" Todo create successfully",newTodo})
  } catch (error) {
        res.status(400).json({message:"error occure in create todo"})
  }
}
export const updateTodo=async (req,res) => {
  try {
        const {text,completed}=req.body;
        const {id}=req.params;
    const updateTodo=await Todo.findByIdAndUpdate(id,{text,completed},{new:true,runValidators:true})
    res.status(200).json({message:"Update Todo",updateTodo})
  } catch (error) {
        res.status(400).json({message:"error occure in update todo"})
  }
}
export const deleteTodo=async (req,res) => {
  try {     
        const {id}=req.params
        console.log(id);
        
  await Todo.findByIdAndDelete(id)
    res.status(200).json({message:"Delete Todo"})
  } catch (error) {
        res.status(400).json({message:"error occure in delete todo"})
  }
}