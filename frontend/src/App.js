import React from "react";
import './App.css'
import NavBar from "./components/navbar"
import Login from "./pages/login";
import UserProfile from "./pages/user-profile";
import Registration from "./pages/registration";
import EventForm from "./pages/event-form";
import HomePage from "./pages/home-page";
import VolunteerMatching from "./pages/volunteer-matching";
import VolunteerHistory from "./pages/volunteer-history";
import Recover from "./pages/forgot-password";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App(){
  return(
    <div className="bg-slate-100">
      <NavBar/>
      
      <BrowserRouter>
        <Routes>
          <Route 
            exact
            path="/"
            element={<HomePage/>}
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
          <Route 
            exact
            path="/volunteermatching"
            element={<VolunteerMatching/>}
          />
          <Route 
            exact
            path="/volunteerhistory"
            element={<VolunteerHistory/>}
          />
          <Route 
            exact
            path="/recover"
            element={<Recover/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
