import React from "react";
import './App.css'
import NavBar from "./components/navbar"
import Login from "./pages/login";
import UserProfile from "./pages/user-profile";
import Registration from "./pages/registration";
import EventForm from "./pages/add-event";
import HomePage from "./pages/home-page";
import VolunteerMatching from "./pages/volunteer-matching";
import Recover from "./pages/forgot-password";
import EventList from "./pages/event-list";
import Reports from "./pages/reports"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { AuthProvider } from "./middleware/user-vertification";
import Footer from "./components/footer";
import NotAuthorized from "./pages/not-authorized";
import About from "./pages/about";

export default function App(){
  return(
    <AuthProvider>
      <div>
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
              path="/recover"
              element={<Recover/>}
            />
            <Route 
              exact
              path="/eventlist"
              element={<EventList/>}
            />
            <Route 
              exact
              path="/not-authorized"
              element={<NotAuthorized/>}
            />
            <Route 
              exact
              path="/about"
              element={<About/>}
            />
            <Route 
              exact
              path="/reports"
              element={<Reports/>}
            />
          </Routes>
        </BrowserRouter>

        <Footer/>
      </div>
    </AuthProvider>
  )
}