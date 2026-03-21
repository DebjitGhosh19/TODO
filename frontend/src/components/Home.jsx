import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/todo/get");
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todo");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTodo = async () => {
    if (!text) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/todo/create", {
        text,
        completed: false,
      });
      setTodos([...todos, response.data.newTodo]);
      setText("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const DeleteTodo = async (id) => {
    
    
    try {
      const response = await axios.delete(
        `http://localhost:4000/todo/delete/${id}`,
      );
   
     setTodos(todos.filter((t)=>t._id!==id))
      
    } catch (error) {
      setError("Error occuring in deleting todo")
    }
  };
 const updateTodo=async (id) => {
  const todo=todos.find((t)=>t._id===id)
 try {
   const response=await  axios.put(
         `http://localhost:4000/todo/update/${id}`,{text:todo.text,completed:!todo.completed}
       );
     
       
       setTodos(todos.map((t)=>(t._id===id?response.data.updateTodo:t)))
 
 } catch (error) {
  setError("Failed to find todo status")
 }
}
  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout",);
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

const remainingTodo=todos.filter((todo)=>!todo.completed).length

  return (
    <div className=" flex justify-center mt-10   ">
      <div className=" bg-gray-200 p-10 rounded shadow-2xl ">
        <h1 className="text-center  text-2xl mb-4 font-bold">Todo App</h1>
        <div className="flex  justify-between ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter Task"
            className=" px-4  py-2 w-full bg-gray-50 outline-none  rounded"
          />
          <button
            onClick={addTodo}
            className=" text-white bg-blue-500 px-4 py-2 rounded-r-md cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="mt-4">
          {isLoding ? (
            <h1 className="text-center">Is Loading...</h1>
          ) : error ? (
            <h>{error}</h>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="flex justify-between my-3 gap-4">
                <div className="flex gap-2">
                  <input onChange={()=>updateTodo(todo._id)} type="checkbox" 
                  checked={todo.completed}
                  className="cursor-pointer" />
                  <p className={`${todo.completed?"line-through":""}`}>{todo.text}</p>
                </div>
                <button
                  onClick={() => DeleteTodo(todo._id)}
                  className="bg-red-500 text-amber-50 py-1 px-2 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <p className="text-center"> {remainingTodo} Todo remaining</p>
        <div className="text-center mt-4">
          <button onClick={()=>logout()} className="bg-red-500 p-2 text-white rounded cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
