import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Css/Update.css";

function Update() {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({ _id: "", Item_Name: "", Price: "", Quantity: "", Date: "", Sold: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("http://localhost:3000/IMS")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const changeHandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setUpdateData({ ...updateData, [name]: val });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submitting update for:", updateData); // Debugging statement
    Axios.put(`http://localhost:3000/IMS/${updateData._id}`, updateData)
      .then((response) => {
        console.log("Update response:", response); // Debugging statement
        alert(response.data);
        setUpdateData({ _id: "", Item_Name: "", Price: "", Quantity: "", Date: "", Sold: "" });
        fetchData(); // Fetch updated data
      })
      .catch((error) => {
        console.error("There was an error updating the item!", error);
        setError("There was an error updating the item!");
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      });
  };

  const displayData = () => {
    return data.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.Item_Name}</td>
          <td>{item.Price}</td>
          <td>{item.Quantity}</td>
          <td>{item.Date}</td>
          <td>{item.Sold}</td>
          <td>
            <button onClick={() => setUpdateData(item)}>Update</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="update-container" style={{ backgroundColor: 'lightskyblue' }}>
      <h1 className="update-title">Update Inventory Management</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="update-table" style={{ backgroundColor: 'red' }}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>To do by</th>
            <th>Items Sold</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{displayData()}</tbody>
      </table>
      <br />
      {updateData._id && (
        <div className="update-form">
          <h3 className="update-form-title">Update Item</h3>
          <form onSubmit={submitHandler}>
            <label className="update-form-label">Item Name:</label>
            <input type="text" name="Item_Name" value={updateData.Item_Name} onChange={changeHandler} className="update-form-input" />
            <br />
            <label className="update-form-label">Price:</label>
            <input type="text" name="Price" value={updateData.Price} onChange={changeHandler} className="update-form-input" />
            <br />
            <label className="update-form-label">Quantity:</label>
            <input type="text" name="Quantity" value={updateData.Quantity} onChange={changeHandler} className="update-form-input" />
            <br />
            <label className="update-form-label">Needed before:</label>
            <input type="text" name="Date" value={updateData.Date} onChange={changeHandler} className="update-form-input" />
            <br />
            <label className="update-form-label">Quantity Sold:</label>
            <input type="text" name="Sold" value={updateData.Sold} onChange={changeHandler} className="update-form-input" />
            <br />
            <button type="submit" className="update-form-button">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Update;
