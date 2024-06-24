import React, { useState } from "react";
import Axios from "axios";
function Insert() {
  const changeHandler=(e)=>{
    let name1=e.target.name;
    let val=e.target.value;
    setData({...data,[name1]: val});
  }
  const [data,setData]=useState({Item_Name:"",Price:"",Quantity:""})
  //Submit Handler
  const submitHandler=()=>{
    Axios.post("http://localhost:3100/insert",{data});
    alert("Data inserted")
  }
  return (
    <div >
    <div >
    < div style={{backgroundImage:'url("https://thumbs.dreamstime.com/b/spring-summer-season-abstract-nature-background-grass-blue-sky-back-49716369.jpg")',paddingBottom:'50px',borderBlockColor:'white'}}>
    <center>
    <h1 ><em>Inserting new Item Detail:</em></h1>
    <hr/>
    <br/>
    <br/>
    <div >
    <form onSubmit={submitHandler}>
    <div class="row mb-3">
      <label for="formGroupExampleInput" class="col-sm-3 col-form-label "><em>Name of the Item Name :&nbsp;</em></label>
      <div class="col-sm-7">
      <input type="text" 
      class="form-control" 
      id="formGroupExampleInput" 
      placeholder="Enter Item Name"
      name="Item_Name" 
      value={data.Item_Name} 
      onChange={changeHandler}/>
      </div>
    </div>
    <div class="row mb-3">
      <label for="formGroupExampleInput" class="col-sm-3 col-form-label"><em>Price of the Item :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></label>
      <div class="col-sm-7">
      <input type="text" 
      class="form-control" 
      id="formGroupExampleInput" 
      placeholder="Enter Price"
      name="Price" 
      value={data.Price} 
      onChange={changeHandler}/>
      </div>
    </div>
    <div class="row mb-3">
      <label for="formGroupExampleInput" class="col-sm-3 col-form-label"><em>Quantity  of the Item :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></label>
      <div class="col-sm-7">
      <input type="text" 
      class="form-control" 
      id="formGroupExampleInput" 
      placeholder="Enter Quantity"
      name="Quantity" 
      value={data.Quantity} 
      onChange={changeHandler}/>
      </div>
    </div>
      <button type="submit" class="btn btn-outline-dark">Insert</button>
    </form>
    </div>
    </center>
    </div>
    </div>
    </div>
  );
}

export default Insert;
