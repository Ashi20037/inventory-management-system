import React, { useState } from "react";
import Axios from "axios";
import "../Css/insert.css";

function Insert() {
  const [data, setData] = useState({ Item_Name: "", Price: "", Quantity: "", Date: "", Sold: "" });

  const changeHandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setData({ ...data, [name]: val });
  };

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission
    Axios.post("http://localhost:3000/insert", data) // Directly send the `data` object
      .then((response) => {
        alert("Data inserted");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error inserting the data!", error);
      });
  };

  return (
    <div>
      <div style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/centre-top-lighting-smooth-baby-blue-display-background_148157-149.jpg?w=1060', paddingBottom: '50px', borderBlockColor: 'white' }}>
        <center>
          <h1><em>Inserting new Item Detail:</em></h1>
          <hr />
          <br />
          <br />
          <div>
            <form onSubmit={submitHandler}>
              <div className="row mb-3">
                <label htmlFor="formGroupExampleInput" className="col-sm-3 col-form-label text-dark"><em>Name of the Item Name:&nbsp;</em></label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter Item Name"
                    name="Item_Name"
                    value={data.Item_Name}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="formGroupExampleInput" className="col-sm-3 col-form-label text-dark"><em>Price of the Item:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter Price"
                    name="Price"
                    value={data.Price}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="formGroupExampleInput" className="col-sm-3 col-form-label text-dark"><em>Quantity of the Item:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter Quantity"
                    name="Quantity"
                    value={data.Quantity}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="formGroupExampleInput" className="col-sm-3 col-form-label text-dark"><em>Required before:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="DD-MM-YYYY"
                    name="Date"
                    value={data.Date}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="formGroupExampleInput" className="col-sm-3 col-form-label text-dark"><em>Item sold in previous month:</em></label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter the quantity"
                    name="Sold"
                    value={data.Sold}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-outline-dark btn-danger">Insert</button>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Insert;
