import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "./NavigationBar";
import UserNavBar from "./UserNavBar";
import { motion } from 'framer-motion';
import './Home/home.css';

import Aboutus from "./aboutus";
import Services from "./Services";

const pageHeader = {
    initial: { opacity: 0, x: -200 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 200 }
};

const pageHeaderTransition = {
    type: 'spring',
    stiffness: 30,
    duration: 0.9
};

const pageVariants = {
    initial: { opacity: 0, x: 200 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -200 }
};

const pageTransition = {
    type: 'spring',
    stiffness: 30,
    duration: 0.9
};

function Home() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const aboutRef = useRef(null);

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const scrollToSection = (section) => {
        if (section === 'about' && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {token ? <NavigationBar scrollToSection={scrollToSection} /> : <UserNavBar scrollToSection={scrollToSection} />}
            <div className="home">
                <div className="header">
                    <div className="intro">
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageHeader}
                            transition={pageHeaderTransition}
                        >
                            <h1 className="masonName">MAZON</h1>
                            <h1 className="companyName">SRI LANKA</h1>
                            <h2 className="tagLine">Empower Leadership with future of Sri Lanka</h2>
                            <button className='dashboardButton'>Check Dashboard</button>
                        </motion.div>
                    </div>
                    <div className="employeeSec">
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <img className="employeepic" src="employee.png" alt="Employee" />
                        </motion.div>
                    </div>
                </div>
                <div className="aboutus" ref={aboutRef}>
                    <Aboutus />
                </div>
            </div>


            <div>
                <Services/>
            </div>
        </div>
    );
}

export default Home;
