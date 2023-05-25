import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegistrationForm } from './components/auth/Register';
import { ActivateAccount } from './components/auth/Activate';
import { LoginForm } from './components/auth/Login';
import { LogoutForm } from './components/auth/Logout';
import { AppMenu } from './components/AppMenu';
import { AppHome } from './components/AppHome';
import { PrivateVacDestAddPrivate } from './components/privateVacationDestination/privateVacDestAddPrivate';
import { PrivatecVacDestBucketList } from './components/privateVacationDestination/privateVacDestBucketList';
import { PrivateVacDestShowAll } from './components/privateVacationDestination/privateVacDestShowAllPublic';
import { PublicVacDestShowAll } from './components/publicVacationDestination/publicVacDestShowAll';
import { PrivateVacDestDetail } from './components/privateVacationDestination/privateVacDestDetail';
import { PublicVacDestAdd } from './components/publicVacationDestination/publicVacDestAdd';
import { PublicVacDestDetail } from './components/publicVacationDestination/publicVacDestDetail';

function App() {
  const [count, setCount] = useState(0)

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
          <Route path='/private-destination/bucket-list' element = {<PrivatecVacDestBucketList/> }/>
          <Route path='/private-destination/add-private' element={<PrivateVacDestAddPrivate/>} />
          <Route path='/private-destination/show-public' element={<PrivateVacDestShowAll/>} />
          <Route path='/private-destination/:destinationId' element={<PrivateVacDestDetail/>} />
          <Route path='/public-destination/show-all' element={<PublicVacDestShowAll/>} />
          <Route path='/public-destination/add-public' element={<PublicVacDestAdd/>}/>
          <Route path='/public-destination/:destinationId' element={<PublicVacDestDetail/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
