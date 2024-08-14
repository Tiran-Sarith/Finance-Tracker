import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Box } from "@mui/material";


function AddBank({onClose}) { 

        const modalRef = useRef();
        const closeModal=(e)=>{
                if(modalRef.current=== e.target){
                        onClose();
                }
        }

    const [bankName, setBankName] = useState("");
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [bankbalance, setBankBalance] = useState("");
    
    function sendData(e) {
        e.preventDefault();

        const newAccount = {
            bankName,
            income,
            expenses,
            bankbalance,
        }

        axios.post("http://localhost:7070/account/add", newAccount).then(() => {
                alert("Bank added successfully");
                onClose();
            })
            .catch((err) => {
                alert("Error adding bank: ");
            });
            console.log(newAccount);

    };

    

    return (
        <div className='overlay' ref={modalRef} onClick={closeModal}>
            <div className="modalContainer">
                <div className="txtaddbank">
                    <h1>Add Bank Account</h1>
                </div>
                <div className="bankdetailAdd">
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={bankName}
                            onChange={(e) => {setBankName(e.target.value)}}
                        />
                    </div>
                    <div>
                    <Box
                        component="form"
                        sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        

                        <TextField id="outlined-basic" 
                                label="Current Balance" 
                                variant="outlined" 
                                onChange={(e) => {setBankBalance(e.target.value)}}
                        
                        />
                        </Box>
                    </div>
                </div>
                <div className="bankdetailAdd">
                    <div>
                    <Box
                        component="form"
                        sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        

                        <TextField id="outlined-basic" 
                                 label="Income"
                                 variant="outlined" 
                                 onChange={(e) => {setIncome(e.target.value)}}
                        
                        />
                        </Box>
                        
                    </div>
                    <div>
                    <Box
                        component="form"
                        sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        

                        <TextField id="outlined-basic" 
                                 label="Expenses"
                                 variant="outlined" 
                                 onChange={(e) => {setExpenses(e.target.value)}}
                        
                        />
                        </Box>
                        
                    </div>
                </div>
                <div className="saveClose">
                    <Button onClick={onClose} variant="outlined" style={{marginBottom: '30px'}}>Close</Button>
                    <Button onClick={sendData} variant="contained" style={{marginBottom: '30px'}}>Save And Close</Button>
                </div>
            </div>
        </div>
    );
}

export default AddBank;
