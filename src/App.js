import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"
import Login from "./Login";
import TodoPage from "./TodoPage";
import { AuthContextProvider } from './context/AuthContext'
import Protected from "./Protected";




function App() {
  // const location = useLocation();
  // console.log("Current Location:", location.pathname);

////////////////////////////////
  return (
//making routes for login and todo page
    <div>
   
        <AuthContextProvider> 
        <Routes>
        <Route path="/" element={<Login  />} exact />
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
