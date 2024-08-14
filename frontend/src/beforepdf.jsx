import React, {useState} from 'react';
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

function Invoice(){

  const [customer, setCustomer]=useState("");
  const [billingAdress, setBillingAddress]=useState("");
  const [service, setService]=useState("");
  const [description, setDescription]=useState("");
  const [quantity, setQuantity]=useState("");
  const [rate, setRate]=useState("");
  const [amount, setAmount]=useState("");
  const [invoiceDate, setInvoiceDate]=useState(dayjs());
  const [dueDate, setDueDate]=useState(dayjs());




  
    function sendData(e){
      e.preventDefault();

      const newInvoice={
        customer,
        billingAdress,
        service,
        description,
        quantity,
        rate,
        amount,
        invoiceDate, 
        dueDate,

        
      }

      axios.post("http://localhost:7070/invoice/add ", newInvoice).then(()=>{
        alert("Invoice Added")
        window.location.reload();

        

      }).catch((err)=>{
        alert(err)
      })
    }
    
    

    return(

        

        <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'10px', paddingTop:'5px'}}>
            <div style={{marginTop:'60px'}}>
                <img src="AiesecLogo.png" alt="Logo" style={{ width: '300px', height: 'auto', minWidth: '300px' }} />
            </div>
            <div className="InvoiceNo">
                    <h1 className="txtInvoice">Invoice No: </h1>
            </div>
            <div style={{marginTop:'30px'}}>
            <FormControl sx={{ m: 1,width: 250, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={customer}
          label="Customer"
          onChange={(e)=>{
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
            <div style={{display:'flex', marginTop:'30px', flexWrap:'wrap'}}>
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
          onChange={(e)=>{
            setBillingAddress(e.target.value);
          }}
        />

      </div>
      </Box>
                </div>
                <div  className="dateFeild">
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
                <div  className="dateFeild">
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
            <div style={{display: 'flex', marginTop:'20px', justifyContent: 'space-between', flexWrap:'wrap'}}>
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
      onChange={(e)=>{
        setService(e.target.value);
      }}  />
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
      onChange={(e)=>{
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
      onChange={(e)=>{
        setRate(e.target.value);
      }}  />
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
      onChange={(e)=>{
        setQuantity(e.target.value);
      }}  />
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
      onChange={(e)=>{
        setAmount(e.target.value);
      }} />
    </Box>
            </div>
            </div>
            
            <div style={{marginLeft:'8px', marginTop:'30px', marginBottom:'40px'}}>
                    <Stack spacing={2} direction="row">
                        <button className="buttonInvoice" onClick={sendData}

                         >Generate Invoice</button>     
                    </Stack>
            
            </div>
            
        </div>
    )
}

export default Invoice;

/*
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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

function Invoice() {
    const [customer, setCustomer] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");
    const [amount, setAmount] = useState("");
    const [invoiceDate, setInvoiceDate] = useState(dayjs());
    const [dueDate, setDueDate] = useState(dayjs());
    const [showPreview, setShowPreview] = useState(false);

    const togglePreview = () => {
        setShowPreview(!showPreview);
        
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add title and styles
        
        doc.setFontSize(18);
        doc.text('Invoice', 14, 22);
        
        doc.setFontSize(68);
        doc.setTextColor(100);

        // Define table content
        const tableColumn = ["Description", "Details"];

        // Format rate and amount as currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
  }).format(value);
};

        const tableRows = [
            ["Invoice Date", invoiceDate.format('YYYY-MM-DD')],
            ["Due Date", dueDate.format('YYYY-MM-DD')],
            ["Customer", customer],
            ["Billing Address", billingAddress],
            ["Service", service],
            ["Description", description],
            ["Rate", formatCurrency(rate)],
            ["Quantity", quantity],
            ["Amount", formatCurrency(amount)],
           
        ];

        // Add table
        doc.autoTable({
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
            alternateRowStyles: { fillColor: [238, 238, 238] }
        });

        doc.save('invoice.pdf');
    };

    function sendData(e){
      e.preventDefault();

      const newInvoice={
        customer,
        billingAddress,
        service,
        description,
        quantity,
        rate,
        amount,
        invoiceDate, 
        dueDate,

        
      }

      axios.post("http://localhost:7070/invoice/add ", newInvoice).then(()=>{
        alert("Invoice Added")
        window.location.reload();
      }).catch((err)=>{
        alert(err)
      })
    }

    

    return (
      <div style={{marginLeft:'3%', marginRight:'3%', marginTop:'10px', paddingTop:'5px'}}>
      <div style={{marginTop:'60px'}}>
          <img src="AiesecLogo.png" alt="Logo" style={{ width: '300px', height: 'auto', minWidth: '300px' }} />
      </div>
      <div className="InvoiceNo">
              <h1 className="txtInvoice">Invoice No: </h1>
      </div>
      <div style={{marginTop:'30px'}}>
      <FormControl sx={{ m: 1,width: 250, minWidth: 100 }}>
  <InputLabel id="demo-simple-select-helper-label">Customer</InputLabel>
  <Select
    labelId="demo-simple-select-helper-label"
    id="demo-simple-select-helper"
    value={customer}
    label="Customer"
    onChange={(e)=>{
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
      <div style={{display:'flex', marginTop:'30px', flexWrap:'wrap'}}>
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
    value={billingAddress}
    onChange={(e)=>{
      setBillingAddress(e.target.value);
    }}
  />

</div>
</Box>
          </div>
          <div  className="dateFeild">
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
          <div  className="dateFeild">
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
      <div style={{display: 'flex', marginTop:'20px', justifyContent: 'space-between', flexWrap:'wrap'}}>
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
onChange={(e)=>{
  setService(e.target.value);
}}  />
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
onChange={(e)=>{
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
onChange={(e)=>{
  setRate(e.target.value);
}}  />
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
onChange={(e)=>{
  setQuantity(e.target.value);
}}  />
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
onChange={(e)=>{
  setAmount(e.target.value);
}} />
</Box>
                </div>
            </div>

            <div style={{ marginLeft: '8px', marginTop: '30px', marginBottom: '40px' }}>
                <Stack spacing={2} direction="row">
                    <button className="buttonInvoice" onClick={sendData}>Generate Invoice</button>
                </Stack>
            </div>

            <Modal
                open={showPreview}
                onClose={togglePreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Invoice Preview
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Invoice Date: {invoiceDate.format('YYYY-MM-DD')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Due Date: {dueDate.format('YYYY-MM-DD')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Customer: {customer}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Billing Address: {billingAddress}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Service: {service}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Description: {description}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Quantity: {quantity}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Rate: {rate}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Amount: {amount}
                    </Typography>
                    
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button className="buttonInvoice" onClick={generatePDF}>Download PDF</button>
                        <button className="buttonCancel" onClick={togglePreview}>Close</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Invoice;
*/