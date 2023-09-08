import React from "react";
import { Routes, Route } from "react-router-dom"
import Login from "./Login";
import TodoPage from "./TodoPage";
import { AuthContextProvider } from './context/AuthContext'




function App() {
////////////////////////////////
  return (
//making routes for login and todo page
    <div>
   
        <AuthContextProvider> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<TodoPage />} />
          </Routes>
         </AuthContextProvider>
      


    </div>
  );
}

export default App;
