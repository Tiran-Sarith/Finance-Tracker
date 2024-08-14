import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Box } from '@mui/material';

function Chart1Pie() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [KandyMainAccountBalance, setKandyMainAccountBalance] = useState(null);
    const [ColomboMainAccountBalance, setColomboMainAccountBalance] = useState(null);
    const [PettyCashAccountBalance, setPettyCashAccountBalance] = useState(null);
    const [GalleAccountBalance, setGalleAccountBalance] = useState(null);

    useEffect(() => {
        function getBankAccounts() {
            axios.get("http://localhost:7070/account/get").then((res) => {
                setBankAccounts(res.data);
                const hnbAccount = res.data.find(account => account.bankName === "Kandy Account");
                if (hnbAccount) {
                    setKandyMainAccountBalance(hnbAccount.bankbalance);
                } else {
                    alert("HNB Current Account not found");
                }
                const peoplesAccount = res.data.find(account => account.bankName === "Colombo main account");
                if (peoplesAccount) {
                    setColomboMainAccountBalance(peoplesAccount.bankbalance);
                } else {
                    alert("Peoples Account not found");
                }
                const galleAccount = res.data.find(account => account.bankName === "Galle main Account");
                if (galleAccount) {
                    setGalleAccountBalance(galleAccount.bankbalance);
                } else {
                    alert("Galle Account not found");
                }
                const pettyCashAccount = res.data.find(account => account.bankName === "Petty cash");
                if (pettyCashAccount) {
                    setPettyCashAccountBalance(pettyCashAccount.bankbalance);
                } else {
                    alert("Petty Cash not found");
                }
            }).catch((err) => {
                alert(err.message);
            });
        }

        getBankAccounts();
    }, []);

    const data = [
        { id: 0, value: PettyCashAccountBalance || 0, label: 'PettyCash' },
        { id: 1, value: ColomboMainAccountBalance || 0, label: 'Colombo' },
        { id: 2, value: KandyMainAccountBalance || 0, label: 'Kandy' },
        { id: 3, value: GalleAccountBalance || 0, label: 'Galle' },
    ];

    return (
        <Box sx={{ textAlign: 'center', mt: 1, color: '#E6F4F1' }}>
            <Typography variant="h5" gutterBottom>
                Total Assets
            </Typography>
            <div className='piechardiv'>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            animation: {
                                duration: 2000,  // Set the animation duration to 2 seconds
                                easing: 'easeInOutQuad',  // Set the easing function
                            },
                          },
                    ]}
                    height={330}
                />
            </div>
        </Box>
    );
}

export default Chart1Pie;
