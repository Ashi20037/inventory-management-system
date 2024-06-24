import inventoryImage from "../images/img7.jpg";
import '../Css/About.css'
const About = () =>{
  return (
    <div className="row align-items-center">
      <h2 style={{textAlign:"center" }}>Titans Inventory Management</h2>
      <div className="col-md-4 mx-auto">
        <img src={inventoryImage} alt="Inventory" className="img-fluid my-5 inventory-img" />
      </div>
      <div className="col-md-8 mx-auto">
        {/* <p className="lead">
          <br style={{ fontSize: "20px" }}><ers, and analyze your sales data to make informed business decisions. Use the links below to navigate to the different areas our system:</br>
        </p> */}
        
        <h3 style={{textAlign:"center"}} >Titans - Har Disha Mein</h3>
      
      </div>
      </div>
    
  );
}

export default About;

