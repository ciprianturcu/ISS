import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppMenu } from './components/AppMenu';
import { AppHome } from './components/AppHome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import { RegistrationForm } from './components/auth/Register';
import { ActivateAccount } from './components/auth/Activate';
import { LoginForm } from './components/auth/Login';
import { LogoutForm } from './components/auth/Logout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Router>
        <AppMenu/>
        <Routes>
          <Route path="/" element={<AppHome />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/activate/:activationCode" element={<ActivateAccount />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />

        </Routes>
      </Router>
    </React.Fragment>

  )
}

export default App;
