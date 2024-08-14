import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import { Typography } from '@mui/material';

function ColomboMainBalance() {
    const [debitAccount, setDebitAccount] = useState("");
    const [bankAccounts, setBankAccounts] = useState([]);
    const [colomboMainAccountBalance, setColomboMainAccountBalance] = useState(0);
    
    const { number } = useSpring({
        from: { number: 0 },
        number: colomboMainAccountBalance,
        delay: 200,
        config: { mass: 1, tension: 210, friction: 100 },
    });

    useEffect(() => {
        function getBankAccounts() {
            axios.get("http://localhost:7070/account/get").then((res) => {
                setBankAccounts(res.data);
                const ColomboMainAccount = res.data.find(account => account.bankName === "Colombo main account");
                if (ColomboMainAccount) {
                    setColomboMainAccountBalance(ColomboMainAccount.bankbalance);
                } else {
                    alert("Colombo main account Account not found");
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
        getBankAccounts();
    }, []);

    return (
        <div>
            {colomboMainAccountBalance !== null ? (
                <Typography variant="subtitle1" className='bankBalancestxt' style={{fontSize:'30px', fontFamily:'Arbutus Slab', alignContent:'center', textAlign:'center', textWrap:'balance', marginTop:'10px'}}>
                   <h1>Colombo Blance</h1>
                   $ <animated.span>{number.to(n => n.toFixed(0))}</animated.span>
                </Typography>
            ) : (
                <Typography variant="subtitle1">
                    HNB Current Account balance is not available.
                </Typography>
            )}
        </div>
    );
}

export default ColomboMainBalance;
