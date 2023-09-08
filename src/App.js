import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Login";


function App() {
////////////////////////////////
  return (
//making router for login and todo page
    <div>
      <Router>
        {/* <AuthProvider> */
        <Routes>
          <Route path="/" component={Login} />
          </Routes>}

      </Router>


    </div>
  );
}

export default App;
