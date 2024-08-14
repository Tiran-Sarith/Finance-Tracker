import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Typography } from '@mui/material';


const chartSetting = {
  yAxis: [
    {
      label: 'Credit Amount',
      
    },
  ],
  width: 930,
  height: 370,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-5px, 0)',
    },
  },
};

const valueFormatter = (value) => `$${value.toFixed(2)}`;

function Chart1Pie() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    function getBankAccounts() {
      axios.get("http://localhost:7070/journal/get")
        .then((res) => {
          const data = res.data;

          // Initialize an empty object to store credit amounts by month and location
          const creditAmounts = {};

          data.forEach((entry) => {
            const { credit, month, creditAccount } = entry;

            // Normalize month to full month names
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthIndex = Number(month) - 1;
            const monthName = monthNames[monthIndex];

            if (monthName !== undefined) {  // Filter out undefined months
              if (!creditAmounts[monthName]) {
                creditAmounts[monthName] = { month: monthName, monthIndex, Galle: 0, Colombo: 0, Kandy: 0 };
              }

              if (creditAccount.includes('Galle')) {
                creditAmounts[monthName].Galle += credit;
              } else if (creditAccount.includes('Colombo')) {
                creditAmounts[monthName].Colombo += credit;
              } else if (creditAccount.includes('Kandy')) {
                creditAmounts[monthName].Kandy += credit;
              }
            }
          });

          // Convert the object to an array and sort by month index
          const formattedData = Object.values(creditAmounts).sort((a, b) => a.monthIndex - b.monthIndex);
          setDataset(formattedData);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getBankAccounts();
  }, []);

  return (
    
    <div>
      <Typography variant="h5" align="center" style={{ color: '#E6F4F1', marginTop:'10px' }} gutterBottom>
        Monthly Income Analysis
      </Typography>
      <div style={{marginTop:'-10px'}}>
    <BarChart
    
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Galle', label: 'Galle', valueFormatter },
        { dataKey: 'Colombo', label: 'Colombo', valueFormatter },
        { dataKey: 'Kandy', label: 'Kandy', valueFormatter },
      ]}
      {...chartSetting}
    />
    </div>
    </div>
  );
}

export default Chart1Pie;
