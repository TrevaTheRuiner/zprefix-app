import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Manage = () => {
  const { loggedIn, userData } = useContext(invContext);

  const [itemData, setItemData] = useState({
    id: '',
    userid: userData.id,
    itemname: '',
    description: '',
    quantity: ''
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    setItemData();
    postItemData();
    console.log(itemData)
  }

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

const postItemData = () => {
  const queryParams = `?itemname=${encodeURIComponent(itemData.itemname)}&description=${encodeURIComponent(itemData.description)}&quantity=${encodeURIComponent(itemData.quantity)}`;
  fetch(`http://localhost:8080/manage${queryParams}`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(message => alert('item added'))
  }

  return (
    <>
    {loggedIn ?
    <div>
      <h1>Welcome, {userData.firstname}</h1>
      <div>
      <h1>Add an item to inventory</h1>
      <div className='add-form'>
        <form onSubmit={handleSubmit}>
          <label>
            <a className='label'>Item Name</a>
            <input className='input-field' type='text' name='itemname'
            value={itemData.itemname} placeholder='Item Name' onChange={handleInputChange}>
            </input>
          </label>

          <label>
            <a className='label'>Description</a>
            <input className='input-field' type='text' name='description'
            value={itemData.description} placeholder='Describe the item in 100char or less' onChange={handleInputChange}>
            </input>
          </label>

          <label>
            <a className='label'>Quantity</a>
            <input className='input-field' type='number' name='quantity'
            value={itemData.quantity} placeholder='Quanitity of items added' onChange={handleInputChange}>
            </input>
          </label>

          <button type="submit" className='button'>Add to inventory</button>
        </form>
      </div>
    </div>
    </div>
    : <></>}
    </>
  );
};