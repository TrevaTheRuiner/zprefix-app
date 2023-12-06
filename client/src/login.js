import { useState, useContext } from "react";
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Login = () => {
  const { setLoggedIn, setUserData } = useContext(invContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // const hashPassword = async (password) => {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   return hashedPassword;
  // }

  const handleSubmit = (input) => {
    input.preventDefault();
    getUserData();
  }


  const getUserData = async () => {
    // const hashedPassword = await hashPassword(loginData.password);
    const queryParams = `?username=${encodeURIComponent(loginData.username)}&password=${encodeURIComponent(loginData.password)}`;
    await fetch(`http://localhost:8080/login${queryParams}`)
    .then(res => res.json())
    .then(userdata => {
      if (userdata.user) {
        setLoggedIn(true)
        setUserData(userdata.user[0])
        navigate('/manage')
      } else {
        console.log(userdata)
      }
    })
  }

  return (
    <>
    <div className='loginpage'>
      <h1>Login</h1><br></br>
      <div className='login-form'>
          <form onSubmit={handleSubmit}>
            <label>
              <a className="label">Username</a>
              <input className="input-field" type="text" name="username" value={loginData.username} onChange={handleInputChange}
              placeholder='username'/>
            </label>
            <label>
              <a className="label">Password</a>
              <input className="input-field" type="password" name="password" value={loginData.password} onChange={handleInputChange}
              placeholder='password'/>
            </label>
            <div>
              <button className='button' type="submit">Login</button>
            </div>
          </form>
          </div>
    </div>
    </>
  );
};