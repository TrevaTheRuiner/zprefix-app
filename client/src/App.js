import { Routes, Route, Link } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import { Home } from './home.js';
import { Login } from './login.js';
import { Register } from './register.js';
import { Manage } from './manage.js';
import { Viewall } from './viewall.js';

export const invContext = createContext();

function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [userData, setUserData] = useState({});

  return (
    <invContext.Provider value={{ userData, setUserData, loggedIn, setLoggedIn }}>
      <div className='navbar'>
        <div>Inventory Manager</div>
        <Link to='/home' className='navbarLink'>Home</Link>
        <Link to='/viewall' className='navbarLink'>View All Inv</Link>
        <Link to='/register' className='navbarLink'>Register</Link>
        <Link to='/login' className='navbarLink'>Login</Link>
        <Link to='/manage' className='navbarLink'>Manage Inventory</Link>
      </div>

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/viewall' element={<Viewall />} />
      </Routes>
    </invContext.Provider>
  );
}

export default App;
