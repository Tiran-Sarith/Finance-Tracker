import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import { Typography, Box } from '@mui/material';
import './TopPerforming.css'; // Make sure to import the CSS file

function AnimatedNumber({ number }) {
    

    const { animatedValue } = useSpring({
        from: { animatedValue: 0 },
        animatedValue: number,
        delay: 200,
        config: { mass: 1, tension: 210, friction: 100 },
    });

    return <animated.span>{animatedValue.to(n => n.toFixed(0))}</animated.span>;
}

function TopPerforming() {
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        async function getBankAccounts() {
            try {
                const res = await axios.get("http://localhost:7070/account/get");
                const filteredAccounts = res.data.filter(account =>
                    ["Galle main Account", "Colombo main account", "Kandy Account"].includes(account.bankName)
                );
                const sortedAccounts = filteredAccounts.sort((a, b) => b.bankbalance - a.bankbalance);
                setBankAccounts(sortedAccounts);
            } catch (err) {
                alert(err.message);
            }
        }
        getBankAccounts();
    }, []);

    const getMedalImage = (index) => {
        const medalImages = {
            0: { src: "Goldcopy.png", alt: "Gold Medal", className: "gold" },
            1: { src: "Silvercopy.png", alt: "Silver Medal", className: "silver" },
            2: { src: "Bronzcopy.png", alt: "Bronze Medal", className: "bronze" }
        };
        return medalImages[index] || null;
    };

    return (
        <div style={{marginLeft:'5%', marginTop:'20px'}}>
        <Box>
            {bankAccounts.map((account, index) => (
                <Box key={account._id} display="flex" alignItems="center" >
                    {getMedalImage(index) && 
                        <img 
                            className={`medals ${getMedalImage(index).className}`} 
                            src={getMedalImage(index).src} 
                            alt={getMedalImage(index).alt}
                        />
                    }
                    <Typography className='bankName' style={{fontSize:'30px', color:'#E6F4F1'}}>
                        {account.bankName}
                    </Typography>
                </Box>
            ))}
        </Box>
        </div>
    );
}

export default TopPerforming;
