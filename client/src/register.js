import { useContext, useState } from "react";
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Register = () => {
  const [regData, setRegData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (yep) => {
    yep.preventDefault();
    postRegData();
    console.log(regData)
  }

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setRegData({
      ...regData,
      [name]: value,
    });
  };

const postRegData = async () => {
  const hashedPassword = await bcrypt.hash(regData.password, 10);
  const requestBody = {
    firstname: regData.firstname,
    lastname: regData.lastname,
    username: regData.username,
    password: hashedPassword,
  };
  const response = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(res => res.json())
    .then(navigate('/login'))
  }



  return (
    <>
    <div>
      <h1>Register a new account</h1>
      <div className='reg-form'>
        <form onSubmit={handleSubmit}>
          <label>
            <a className='label'>First Name</a>
            <input className='input-field' type='text' name='firstname'
            value={regData.firstname} placeholder='Your First Name' onChange={handleInputChange}>
            </input>
          </label>
          <label>
            <a className='label'>Last Name</a>
            <input className='input-field' type='text' name='lastname'
            value={regData.lastname} placeholder='Your Last Name' onChange={handleInputChange}>
            </input>
          </label>
          <label>
            <a className='label'>Username</a>
            <input className='input-field' type='text' name='username'
            value={regData.username} placeholder='Your username' onChange={handleInputChange}>
            </input>
          </label>
          <label>
            <a className='label'>Password</a>
            <input className='input-field' type='text' name='password'
            value={regData.password} placeholder='create a password' onChange={handleInputChange}>
            </input>
          </label>
          <button type="submit" className='button'>Register</button>
        </form>
      </div>
    </div>
    </>
  );
};