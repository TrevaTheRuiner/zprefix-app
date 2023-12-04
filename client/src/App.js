import './App.css';
import { Router, Route, Link } from 'react-router-dom';
import React, { createContext, useState } from 'react';

export const invContext = createContext();

function App() {
  return (
    <div className='navbar'>
      <div>Inventory Manager</div>
      <Link to='/' className='navbarLink'>Home</Link>
      <Link to='/register' className='navbarLink'>Register</Link>
      <Link to='/login' className='navbarLink'>Login</Link>
      <Link to='/manage' className='navbarLink'>Manage Inventory</Link>
    </div>
  );
}

export default App;
