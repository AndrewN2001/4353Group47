import React from "react";
import './App.css'
import Login from "./pages/login";
import UserProfile from "./pages/user-profile";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App(){
  return(
    <div className="bg-slate-100">
      <BrowserRouter>
        <Routes>
          <Route 
            exact
            path="/"
            element={<></>}
          />
          <Route 
            exact
            path="/login"
            element={<Login/>}
          />
          <Route 
            exact
            path="/userprofile"
            element={<UserProfile/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
