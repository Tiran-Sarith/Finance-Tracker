import React, { useEffect, useState } from 'react';
import Chart1Pie from './Charts/Chart1Pie';
import Chart2bar from './Charts/Chart2Bar';
import Chart3Line from './Charts/Chart3Line';
import NavigationBar from './NavigationBar';
import KandyAccount from './BankBalnce/KandyAccount'
import ColomboMainBalance from './BankBalnce/ColomboMainBalance';
import GalleAccount from './BankBalnce/GalleAccount';
import TopPerforming from './Charts/TopPerforming';
import { motion } from 'framer-motion';
import UserNavBar from './UserNavBar';

const pageVariants = {
  initial: {
      opacity: 0,
      y: 100
  },
  in: {
      opacity: 1,
      y: 0
  },
  out: {
      opacity: 0,
      y: -100
  }
};

const pageTransition = {
  type: 'spring',
  stiffness: 20,
  duration: 0.9
};

function Dashboard() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
      const handleStorageChange = () => {
          setToken(localStorage.getItem("token"));
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
          window.removeEventListener("storage", handleStorageChange);
      };
  }, []);



  return (
    <div>
    {token ? <NavigationBar /> : <UserNavBar />}

    <div style={{marginTop:'50px'}}>
            <div className='balancesSection'>
        
          <div className='bankBalance'>
          <KandyAccount/>
          </div>
          <div className='bankBalance'>
          <ColomboMainBalance/>
          </div>
          <div className='bankBalance'>
          <GalleAccount/>
          </div>    
      </div>
      <div className='chartSection'>
        <div className='MedalChart'>
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
        <TopPerforming/>
        </motion.div>
        </div>
        <div className='rightChart'>
          
          <Chart2bar/>
        </div>
      </div>
      <div className='chartSection'>
          <div className='leftChart'>
          <Chart1Pie/>
          </div>
          <div className='rightChart'>
            <Chart3Line/>
          </div>
      </div>
     
    </div>
    </div>
  );
}

export default Dashboard;