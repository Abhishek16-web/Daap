import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ManagerLogin from "./components/ManagerLogin";
import ParticipantsLogin from "./components/ParticipantLogin"
import ParticipantsSignup from "./components/ParticipantsSignup"
import Lottery from "./components/Lottery";
import Error from "./components/Error"
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";


function App() {


  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participantssignup" element={<ParticipantsSignup />} />
        <Route path="/participantsLogin" element={<ParticipantsLogin />} />
        <Route path="/managerLogin" element={<ManagerLogin />} />
        <Route path="/lottery" element={<Lottery />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Error />} />
      </Routes>
      
    </Router>
    </>
  );
}

export default App;
