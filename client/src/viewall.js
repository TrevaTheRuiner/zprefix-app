import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { invContext } from "./App";
import './index.css';

export const Viewall = () => {
  const [currentInv, setCurrentInv] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [allUserIds, setAllUserIds] = useState([]);

  const fetchAllUserIds = () => {
    fetch('http://localhost:8080/userids')
      .then((res) => res.json())
      .then((data) => {
        const uniqueUserIds = Array.from(new Set(data));
        setAllUserIds(uniqueUserIds);})
      .catch((error) => {
        console.error('Error fetching user IDs:', error);
      });
  };

  const handleRefreshInventory = () => {
    const url = selectedUserId
      ? `http://localhost:8080/viewall?userid=${encodeURIComponent(selectedUserId)}`
      : 'http://localhost:8080/viewall';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCurrentInv(data))
      .catch((error) => {
        console.error('Error refreshing inventory:', error);
      });
  };

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
  };


  useEffect(() => {
    fetchAllUserIds();
    handleRefreshInventory();
  }, [selectedUserId]);

  return (
  <>
<h1>Current Inventory</h1>
  <label className="">Filter by Manager ID No. :</label>
  <select className="userIdDropdown" value={selectedUserId || ''} onChange={handleUserChange}>
      <option value="">All Users</option>
      {Array.isArray(allUserIds) && allUserIds.length > 0 ? (
        allUserIds.map((userId) => (
          <option key={userId} value={userId}>{userId}</option>
        ))
      ) : (<></>)}
    </select>
  <button type="button" className="button" onClick={handleRefreshInventory}>
            Show / Refresh Full Inventory
          </button>
  <div>
    {Array.isArray(currentInv) && currentInv.length > 0  ? (
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
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>You ran out!! Go buy supplies dude</p>
    )}
  </div>
  </>
  );
};

