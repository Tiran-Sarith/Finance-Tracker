import './App.css';
import './index.css';
import Dashboard from './Dashboard';
import Date from './Date';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Home from './Home';
import Journal from './Journal';
import Invoice from './Invoice';
import React, { useState } from 'react';
import Footer from './Footer';
import ResponsiveDrawer from './ResponsiveDrawer';
import Login from './login/Login';
import SignUp from './SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Navi from './Navi';
import Aboutus from './aboutus';


function App() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='body'>
            <div>
                
                <div>
                    <BrowserRouter>
                        <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />

                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Home />} />

                                <Route path="/dashboard" element={<Dashboard />} />
                                
                            <Route element={<PrivateRoute />}>
                                <Route path="/add" element={<Date />} />
                               <Route path="/journal" element={<Journal />} />
                                <Route path="/invoice" element={<Invoice />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/dash" element={<ResponsiveDrawer />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
