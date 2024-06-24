import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Menu.css';
const Menu = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-secondary">
            <div className="container-fluid">
          <a className="navbar-brand text-primary fw-bold" href="/">
            Inventory-Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
            {/* <Link className="navbar-brand" to="/">Inventory Management</Link> */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto fs-5 fw-bold">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">About</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Insert">Insert</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Display">Display</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Update">Update</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Delete">Delete</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Signup">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            </div>
        </nav>
    );
};

export default Menu;
