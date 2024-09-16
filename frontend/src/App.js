import React from "react";
import './App.css'
import Login from "./pages/login";
import UserProfile from "./pages/user-profile";
import Registration from "./pages/registration";
import EventForm from "./pages/event-form";
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
          <Route 
            exact
            path="/registration"
            element={<Registration/>}
          />
          <Route 
            exact
            path="/eventform"
            element={<EventForm/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
