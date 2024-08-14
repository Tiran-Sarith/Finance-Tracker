import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box } from '@mui/material';

function Chart3Line() {
  const [dataset, setDataset] = useState({
    galleData: [],
    colomboData: [],
    kandyData: [],
    months: [],
  });

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

          // Convert the object to arrays
          const months = [];
          const galleData = [];
          const colomboData = [];
          const kandyData = [];

          Object.values(creditAmounts).sort((a, b) => a.monthIndex - b.monthIndex).forEach(item => {
            months.push(item.month);
            galleData.push(item.Galle);
            colomboData.push(item.Colombo);
            kandyData.push(item.Kandy);
          });

          setDataset({
            galleData,
            colomboData,
            kandyData,
            months,
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getBankAccounts();
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 0 }}>
      <LineChart
        width={850}
        height={400}
        series={[
          { data: dataset.galleData, label: 'Galle' },
          { data: dataset.colomboData, label: 'Colombo' },
          { data: dataset.kandyData, label: 'Kandy' },
        ]}
        xAxis={[{ scaleType: 'point', data: dataset.months }]}
      />
    </Box>
  );
}

export default Chart3Line;
