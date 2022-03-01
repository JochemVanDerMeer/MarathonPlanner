import './App.css';
import React from "react"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import { UserAuthContextProvider } from './contexts/UserAuthContext';
import TrainingPlanner from './screens/trainingPlanner';
import EditProfile from './screens/editProfile';
import MarathonSchedule from './screens/marathonSchedule';
import GenerateTrainings from './screens/generateTrainings';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
      <Routes>
        <Route path = "/home" element = {<ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path = "/trainingplanner" element = {<ProtectedRoute> <TrainingPlanner/> </ProtectedRoute>} />
        <Route path = "/" element = {<Login/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />
        <Route path = "/profile" element = {<EditProfile/>} />
        <Route path = "/marathonschedule" element = {<MarathonSchedule/>} />
        <Route path = "/generatetrainings" element = {<GenerateTrainings/>} />
      </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
