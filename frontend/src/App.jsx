import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import PageNotFound from "./components/PageNotFound";
const App = () => {
  const token = localStorage.getItem("jwt");
 
  

  return (
    <>
    <Toaster/>
   <Routes>
    
    <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
   <Route path='/login' element={<Login/>} />
   <Route path='/signup' element={<Signup/>} />
    <Route path="*" element={<PageNotFound/>} />
   </Routes>
   </>
  )
}

export default App