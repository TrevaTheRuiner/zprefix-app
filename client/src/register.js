import { useContext, useState } from "react";
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

  const handleSubmit = () => {
    setRegData();
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

const postRegData = () => {
  const queryParams = `?firstname=${encodeURIComponent(regData.firstname)}&lastname=${encodeURIComponent(regData.lastname)}&username=${encodeURIComponent(regData.username)}&password=${encodeURIComponent(regData.password)}`;
  fetch(`http://localhost:8080/register${queryParams}`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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