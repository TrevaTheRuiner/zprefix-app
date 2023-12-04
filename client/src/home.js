import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Home = () => {
  const { setLoggedIn, setUserData } = useContext(invContext);

  return (
    <>
    <div>
      <h1>Hello</h1>
    </div>
    </>
  );
};