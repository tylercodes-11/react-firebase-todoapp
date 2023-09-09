import React from "react";
import { Routes, Route } from "react-router-dom"
import Login from "./Login";
import TodoPage from "./TodoPage";
import { AuthContextProvider } from './context/AuthContext'
import Protected from "./Protected";




function App() {
////////////////////////////////
  return (
//making routes for login and todo page
    <div>
   
        <AuthContextProvider> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={
          <Protected>
            <TodoPage />
            </Protected>}
             />
          </Routes>
         </AuthContextProvider>
      


    </div>
  );
}

export default App;
