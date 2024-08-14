import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AllBankAccount() {
    const  [debitAccount, setDebitAccount] = useState("");
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(()=>{
        function getBankAccounts(){
            axios.get("http://localhost:7070/account/get").then((res)=>{
               setBankAccounts(res.data)
                
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBankAccounts();
    }, [])

    return(
        <div>
            <FormControl
                className="custom-form-control"
                sx={{ m: 1, width: 260, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Debit Account</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={debitAccount}
                    label="Debit account"
                    onChange={(e) => {
                        setDebitAccount(e.target.value);
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem>
                        <button className="buttonBank" style={{ border: 'none', background: 'none', padding: 0, textAlign: 'left' }}>+ Add new bank Account</button>
                    </MenuItem>
                    {bankAccounts.length > 0 ? (
                        bankAccounts.map((bankAccount, index) => (
                            <MenuItem key={index} value={bankAccount.bankName}>
                                {bankAccount.bankName}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            <em>No journal entriesss found</em>
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )

}

export default AllBankAccount;