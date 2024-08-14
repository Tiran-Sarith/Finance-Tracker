import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import jsPDF from 'jspdf';
import NavigationBar from './NavigationBar';
import InvoiceNo from './InvoiceNo';
import { motion } from 'framer-motion';

//date and time picker
const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong> for {valueType} editing
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a
                        href="https://mui.com/x/introduction/licensing/#pro-plan"
                        aria-label="Included on Pro package"
                    >
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}

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

function Invoice() {
    const [customer, setCustomer] = useState("");
    const [billingAdress, setBillingAddress] = useState("");
    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");
    const [amount, setAmount] = useState("");
    const [invoiceDate, setInvoiceDate] = useState(dayjs());
    const [dueDate, setDueDate] = useState(dayjs());

    function sendData(e) {
        e.preventDefault();

        const newInvoice = {
            customer,
            billingAdress,
            service,
            description,
            quantity,
            rate,
            amount,
            invoiceDate,
            dueDate,
        };

        axios.post("http://localhost:7070/invoice/add", newInvoice).then(() => {
            alert("Invoice Added");
            window.location.reload();
        }).catch((err) => {
            alert(err);
        });
    }

    return (
        
            <div>
                <NavigationBar />
                <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
                <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '10px', paddingTop: '5px' }}>
                    <div style={{ marginTop: '60px' }}>
                        <img src="AiesecLogo.png" alt="Logo" style={{ width: '300px', height: 'auto', minWidth: '300px' }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className="InvoiceNo">
                            <h1 className="txtInvoice">Invoice No: </h1>
                        </div>
                        <div>
                            <InvoiceNo />
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <FormControl sx={{ m: 1, width: 250, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={customer}
                                label="Customer"
                                onChange={(e) => {
                                    setCustomer(e.target.value);
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Creative software'}>Creative software</MenuItem>
                                <MenuItem value={'WSo2'}>WSo2</MenuItem>
                                <MenuItem value={'Arimac'}>Arimac</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ display: 'flex', marginTop: '30px', flexWrap: 'wrap' }}>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Customer address"
                                        multiline
                                        rows={4}
                                        value={billingAdress}
                                        onChange={(e) => {
                                            setBillingAddress(e.target.value);
                                        }}
                                    />
                                </div>
                            </Box>
                        </div>
                        <div className="dateFeild">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Invoice Date"
                                        value={invoiceDate}
                                        onChange={(newValue) => setInvoiceDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="dateFeild">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Due Date"
                                        value={dueDate}
                                        onChange={(newValue) => setDueDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div >
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: 250 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Service" variant="outlined"
                                    value={service}
                                    onChange={(e) => {
                                        setService(e.target.value);
                                    }} />
                            </Box>
                        </div>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: 270 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Description" variant="outlined"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }} />
                            </Box>
                        </div>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: 250 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Rate" variant="outlined"
                                    value={rate}
                                    onChange={(e) => {
                                        setRate(e.target.value);
                                    }} />
                            </Box>
                        </div>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: 250 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Qantity" variant="outlined"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }} />
                            </Box>
                        </div>
                        <div>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: 250 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Amount" variant="outlined"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }} />
                            </Box>
                        </div>
                    </div>
                    <div style={{ marginLeft: '8px', marginTop: '30px', marginBottom: '40px' }}>
                        <Stack spacing={2} direction="row">
                            <button className="buttonInvoice" onClick={sendData}
                            >Generate Invoice</button>
                        </Stack>
                    </div>
                </div>
                </motion.div>
            </div>
        
    );
}

export default Invoice;
