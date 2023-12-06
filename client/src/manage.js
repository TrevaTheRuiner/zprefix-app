import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Manage = () => {
  const { loggedIn, userData } = useContext(invContext);
  const [currentInv, setCurrentInv] = useState([])
  const [itemData, setItemData] = useState({
    id: '',
    userid: userData.id,
    itemname: '',
    description: '',
    quantity: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      setEditMode(false);
      setEditedItem(null);
    } else {
      setItemData({
        id: '',
        userid: userData.id,
        itemname: '',
        description: '',
        quantity: ''
      });
    postItemData();
    console.log(itemData)
    }
  }

  const handleItemInput = (input) => {
    setItemData({ ...itemData, itemname: input.target.value})
  }

  const handleDescInput = (input) => {
    setItemData({ ...itemData, description: input.target.value})
  }

  const handleQuanInput = (input) => {
    setItemData({ ...itemData, quantity: input.target.value})
  }


const postItemData = () => {
  const requestBody = {
    userid: userData.id,
    itemname: itemData.itemname,
    description: itemData.description,
    quantity: itemData.quantity,
  };
  fetch('http://localhost:8080/manage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((message) => {
      alert('item added');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const handleDeleteItem = (itemId) => {
  fetch(`http://localhost:8080/manage/${itemId}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((message) => {
      alert('Item deleted');
      handleRefreshInventory();
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
    });
};

const handleRefreshInventory = () => {
  const queryParams = `?userid=${encodeURIComponent(userData.id)}`;
  fetch(`http://localhost:8080/manage${queryParams}`)
    .then((res) => res.json())
    .then((data) => setCurrentInv(data))
    .catch((error) => {
      console.error('Error refreshing inventory:', error);
    });
};

const handleEditItem = (item) => {
  setItemData({
    id: item.id,
    userid: item.userid,
    itemname: item.itemname,
    description: item.description,
    quantity: item.quantity,
  });
  setEditMode(true);
  setEditedItem(item.id);
};

useEffect(() => {
  handleRefreshInventory();
}, [userData.id]);


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
              value={itemData.itemname} placeholder='Item Name' onChange={handleItemInput} disabled={editMode}>
              </input>
            </label>
            <label>
              <a className='label'>Description</a>
              <input className='input-field' type='text' name='description'
              value={itemData.description} placeholder='Describe the item in 100char or less' onChange={handleDescInput} disabled={editMode} >
              </input>
            </label>
            <label>
              <a className='label'>Quantity</a>
              <input className='input-field' type='number' name='quantity'
              value={itemData.quantity} placeholder='Quanitity of items added' onChange={handleQuanInput} disabled={editMode}>
              </input>
            </label>
            <button type="submit" className='button'>{editMode ? 'Update item' : 'Add to Inventory'}</button>
          </form>
        </div>
      </div>
      <div>
  <h1>Current Inventory</h1>
  <button type="button" className="button" onClick={handleRefreshInventory}>
            Show / Refresh Full Inventory
          </button>
  <div>
    {currentInv ? (
      <table>
        <thead>
          <tr>
            <th className='tablebox'>Item Name</th>
            <th className='tablebox'>Description</th>
            <th className='tablebox'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentInv.map((item, index) => (
            <tr key={index}>
              <td className='tablebox'>{item.itemname}</td>
              <td className='tablebox'>{item.description}</td>
              <td className='tablebox'>{item.quantity}</td>
              <td className='tablebox'>
                <button type="button" className="button"
                  onClick={() => handleDeleteItem(item.id)}>
                  Remove from Inventory</button>
                <button type='button' className='button'
                  onClick={() => handleEditItem(item)}>
                  Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>You ran out!! Go buy supplies dude</p>
    )}
    </div>
  </div>
    </div>
    : <></>}
    </>
  );
};
