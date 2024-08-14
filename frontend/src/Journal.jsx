import { colors } from "@mui/material";
import React,{ useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import axios from "axios";
import JournalNo from "./JornalNo";
import AddBank from "./AddBank";
import NavigationBar from './NavigationBar';

import { motion } from 'framer-motion';


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
    stiffness: 50,
    duration: 0.9
};

//debit and credit both here
function Journal(){


//Get all bank acounts for debit form
const [bankAccounts, setBankAccounts] = useState([]);
const [openModal, setOpenModal] = useState(false)


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





const  [journalNo, setJournalNo] = useState("");
const  [creditAccount, setCreditAccount] = useState("");
const  [debitAccount, setDebitAccount] = useState("");
const  [debit, setDebit] = useState("");
const  [credit, setCredit] = useState("");
const  [description, setDescription] = useState("");
const  [location, setLocation] = useState("");
const  [date, setDate] = useState(dayjs());
const  [ month, setMonth] = useState("");


 function sendData(e){
    e.preventDefault();
 

    const newJournal={
        journalNo,
        creditAccount,
        debitAccount,
        debit,
        credit,
        description, 
        location,
        date,
        month
    }

    axios.post("http://localhost:7070/journal/add", newJournal).then(()=>{
        alert("Journal Added to backend");
        window.location.reload();
    }).catch((err)=>{
        alert(err)
    })
    console.log(newJournal);
 }


    return(
        <div>
            <NavigationBar/>
        
            <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
        <div style={{marginTop:'10px', paddingTop:'5px', marginLeft:'3%', marginRight:'3%'}}>
            <div className="aieseclogo">
                <img src="AiesecLogo.png" alt="Logo" style={{ width: '300px', height: 'auto', minWidth: '300px' }} />
            </div>
         <div style={{display:'flex'}}>   
                <div className="JournalNo">
                    <h1 className="txtJournal">Journal Entry No: </h1>
                </div>
                <div>
                <JournalNo/>
                </div>
            </div>
            <div className="dateFeild">
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                    <Box
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Outline color
                                borderWidth: '2px',  // Outline weight
                            },
                            '&:hover fieldset': {
                                borderColor: 'gray', // Outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'gray',  // Outline color when focused
                            },
                        },
                    }}
                >
                    <DatePicker
              label="Basic date picker"
              type="text"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
                    </Box>
                    </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div>
                <FormControl
                    className="custom-form-control"
                    sx={{ m: 1, width: 260, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={month}
                    label="month"
                    onChange={(e) => {
                        setMonth(e.target.value);
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    
                    <MenuItem value={1}>
                    January                        
                    </MenuItem>
                    <MenuItem value={2}>
                        February
                    </MenuItem>
                    
                        <MenuItem value={3}>
                            March
                        </MenuItem>
                        <MenuItem value={4}>
                            April
                        </MenuItem>
                        <MenuItem value={5}>
                            May
                        </MenuItem>
                        <MenuItem value={6}>
                            June
                        </MenuItem>
                        <MenuItem value={7}>
                            July
                        </MenuItem>
                        <MenuItem value={8}>
                            August
                        </MenuItem>
                        <MenuItem value={9}>
                            September
                        </MenuItem>
                        <MenuItem value={10}>
                            October
                        </MenuItem>
                        <MenuItem value={11}>
                            November
                        </MenuItem>
                        <MenuItem value={12}>
                            December
                        </MenuItem>
                       

                   
                </Select>
            </FormControl>
            
                </div>
            </div>
            <div>
            {openModal && <AddBank onClose={()=> setOpenModal(false)}/>}
        </div>
            <div  style={{display: 'flex', marginTop:'40px',flexWrap:'wrap'}}>
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
                        <button onClick={()=>setOpenModal(true)}  className="buttonBank" >+ Add new bank Account</button>
                        
                    </MenuItem>
                    
                    {bankAccounts.length > 0 ? (
                        bankAccounts.map((bankAccount, index) => (
                            <MenuItem key={index} value={bankAccount.bankName}>
                                {bankAccount.bankName}
                            </MenuItem>
                            
                        ))
                    ) : (
                        <MenuItem disabled>
                            
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            
                </div>
            
                <div >
                <FormControl
                className="custom-form-control"
                sx={{ m: 1, width: 260, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Credit Account</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={creditAccount}
                    label="Debit account"
                    onChange={(e) => {
                        setCreditAccount(e.target.value);
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={()=>setOpenModal(true)} className="buttonBank" >+ Add new bank Account</button>
                    </MenuItem>
                    {bankAccounts.length > 0 ? (
                        bankAccounts.map((bankAccount, index) => (
                            <MenuItem key={index} value={bankAccount.bankName}>
                                {bankAccount.bankName}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
                </div>
            </div>
            <div style={{display: 'flex', marginTop:'10px', justifyContent: 'space-between', flexWrap:'wrap'}}>
                <div>
                <Box
                
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '30ch' },
                        '& > :not(style)': { m: 1, width: '30ch' },
                        '& .MuiInput-underline:before': {
                        borderBottomColor: 'black', // Bottom border color before focus
                        borderBottomWidth: '2px', // Bottom border weight before focus
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'gray', // Bottom border color on hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'gray', // Bottom border color after focus
                    },
                    }}
                    noValidate
                    autoComplete="off"
                    >
      
                    <TextField id="standard-basic" label="Debit(Rs)" variant="standard" type="text"
                     onChange={(e)=>{
                        setDebit(e.target.value);
                    }}
                    />
                    </Box>
                </div>
                <div >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '30ch' },
                        '& .MuiInput-underline:before': {
                        borderBottomColor: 'black', // Bottom border color before focus
                        borderBottomWidth: '2px', // Bottom border weight before focus
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'gray', // Bottom border color on hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'gray', // Bottom border color after focus
                    },
                    }}
                    noValidate
                    autoComplete="off"
                    >
      
                    <TextField id="standard-basic" label="Credit(Rs)" variant="standard" type="text"
                     onChange={(e)=>{
                        setCredit(e.target.value);
                    }}
                    />
                    </Box>
                </div>
                <div >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '45ch' },
                        '& > :not(style)': { m: 1, width: '30ch' },
                        '& .MuiInput-underline:before': {
                        borderBottomColor: 'black', // Bottom border color before focus
                        borderBottomWidth: '2px', // Bottom border weight before focus
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'gray', // Bottom border color on hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'gray', // Bottom border color after focus
                    },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="Description" variant="standard" type="text"
                     onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                    />
                    </Box>
                </div>
                <div >
                    <FormControl variant="standard" sx={{ m: 1,width:260, minWidth: 120, 

                        '& .MuiInput-underline:before': {
                        borderBottomColor: 'black', // Bottom border color before focus
                        borderBottomWidth: '2px', // Bottom border weight before focus
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'gray', // Bottom border color on hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'gray', // Bottom border color after focus
                    },
                    }}>
                        <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={location}
                        onChange={(e)=>{
                            setLocation(e.target.value);
                        }}
                        label="Location"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Colombo">Colombo</MenuItem>
                        <MenuItem value="Kandy">kandy</MenuItem>
                        <MenuItem value="Negombo">Negombo</MenuItem>
                        <MenuItem value="Matara">Matara</MenuItem>
                        <MenuItem value="Galle">Galle</MenuItem>

                        </Select>
                </FormControl>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black', // Outline color
                            borderWidth: '2px',  // Outline weight
                        },
                        '&:hover fieldset': {
                            borderColor: 'gray', // Outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray',  // Outline color when focused
                        },
                    },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            
        
                <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue=""
                onChange={(e)=>{
                    setJournalNo(e.target.value);
                }}
                />
                
            </Box>
            </div>
            </div>
            <div className="buttonAnd">
            
            <div style={{marginTop:'-30px', marginBottom:'40px'}}>
                    <Stack spacing={2} direction="row">
                        <button className="buttonJournal" onClick={sendData}>Save Journal Entry</button>     
                    </Stack>
            
            </div>
            
            </div>
            
            
            
            
            

            
        </div>
        </motion.div>
        </div>
        
    )
    

}

export default Journal;