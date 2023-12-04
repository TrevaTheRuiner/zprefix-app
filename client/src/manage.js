import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Manage = () => {
  const { loggedIn, userData } = useContext(invContext);
  const [currentInv, setCurrentInv] = useState([])
  const [currItem, setCurrItem] = useState("")
  const [currDesc, setCurrDesc] = useState("")
  const [currQuan, setCurrQuan] = useState("")
  const [itemData, setItemData] = useState({
    id: '',
    userid: '',
    itemname: '',
    description: '',
    quantity: ''
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    setItemData( {
      id: '',
      userid: userData.id,
      itemname: currItem,
      description: currDesc,
      quantity: currQuan
    });
    postItemData();
    console.log(itemData)
  }

  const handleItemInput = (input) => {
    setCurrItem(input.target.value)
  }

  const handleDescInput = (input) => {
    setCurrDesc(input.target.value)
  }

  const handleQuanInput = (input) => {
    setCurrQuan(input.target.value)
  }


const postItemData = () => {
  const queryParams = `?itemname=${encodeURIComponent(itemData.itemname)}&description=${encodeURIComponent(itemData.description)}&quantity=${encodeURIComponent(itemData.quantity)}`;
  fetch(`http://localhost:8080/manage${queryParams}`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(message => alert('item added'))
    navigate('/manage')
  }

useEffect(() => {
  const getCurrentInv = async() => {
    const queryParams = `?userid=${encodeURIComponent(userData.id)}`
    fetch(`http://localhost:8080/manage${queryParams}`)
    .then(res => res.json())
    .then(data => setCurrentInv(data))
    .then(console.log(currentInv))
  };
  getCurrentInv();
}, [])


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
              value={itemData.itemname} placeholder='Item Name' onChange={handleItemInput}>
              </input>
            </label>

            <label>
              <a className='label'>Description</a>
              <input className='input-field' type='text' name='description'
              value={itemData.description} placeholder='Describe the item in 100char or less' onChange={handleDescInput}>
              </input>
            </label>

            <label>
              <a className='label'>Quantity</a>
              <input className='input-field' type='number' name='quantity'
              value={itemData.quantity} placeholder='Quanitity of items added' onChange={handleQuanInput}>
              </input>
            </label>

            <button type="submit" className='button'>Add to inventory</button>
          </form>
        </div>
      </div>
      <div>
        <h1>Current Inventory</h1>
        <button type="button" className='button'>Show /Refresh Full Inventory</button>
        <div>
          {currentInv ?
          <ul>
            {currentInv.map((item, index) => (
              <div key={index} className='invitem'>
                {item.itemname}
              </div>
            ))}
          </ul>
          : <></>}
        </div>
      </div>
    </div>
    : <></>}
    </>
  );
};