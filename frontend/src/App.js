import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Menu from './Components/Menu';
import Home from './Components/Home';
import Insert from './Components/Insert';
import Display from './Components/Display';
import Update from './Components/Update';
import Delete from './Components/Delete';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div>
            <Menu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/Signup" element={<Signup />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/Insert" element={<Insert />} />
                            <Route path="/Display" element={<Display />} />
                            <Route path="/Update" element={<Update />} />
                            <Route path="/Delete" element={<Delete />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/Login" />} />
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;
