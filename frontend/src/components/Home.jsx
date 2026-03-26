import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/todo/get", {
          withCredentials: true,
        });
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
    if (!text) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/todo/create",
        { text, completed: false },
        { withCredentials: true },
      );

      setTodos([...todos, response.data.newTodo]);
      setText("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const DeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
      });

      setTodos(todos.filter((t) => t._id !== id));
    } catch {
      setError("Error deleting todo");
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);

    try {
      const response = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        { text: todo.text, completed: !todo.completed },
        { withCredentials: true },
      );

      setTodos(todos.map((t) => (t._id === id ? response.data.updateTodo : t)));
    } catch {
      setError("Failed to update todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
      });

      toast.success("User logged out successfully");
      localStorage.removeItem("jwt");
      navigateTo("/login");
    } catch {
      toast.error("Error logging out");
    }
  };

  const remainingTodo = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-6 md:px-10 py-6 bg-gray-100">
      {/* Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-2xl rounded-xl p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Todo App
        </h1>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim() !== "") {
                addTodo();
              }
            }}
            type="text"
            placeholder="Enter Task"
            className="w-full px-3 py-2 border rounded outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="mt-4">
          {isLoading ? (
            <h1 className="text-center">Loading...</h1>
          ) : error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b py-2"
              >
               
                <div className="flex gap-2 items-start flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateTodo(todo._id)}
                    className="mt-1 cursor-pointer shrink-0"
                  />

                  <p
                    className={`break-words flex-1 min-w-0 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                </div>
                <button
                  onClick={() => DeleteTodo(todo._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded w-fit cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Remaining */}
        <p className="text-center mt-4 text-sm sm:text-base">
          {remainingTodo} Todo remaining
        </p>

        {/* Logout */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={logout}
            className="bg-red-600 text-white w-full sm:w-auto px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
