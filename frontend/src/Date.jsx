import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



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
      <strong>{componentName}</strong>{valueType}
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

function Date() {

  const [customer, setCustomer] = useState("");
  const [billingAdress, setBillingAdress] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  function sendData(e){
    e.preventDefault();
    const newJournal = {
        customer,
        billingAdress,
        service,
        description,
        quantity,
        rate,
        amount
    }
    console.log(newJournal);
  }

  return (
    
    <div className="date">
      <div>
        <h1 className='textSize'>Journal Entry</h1>
      </div>
      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
          ]}
        >

          <DemoItem label={<Label componentName="Journal Date"/>}>
            <DatePicker />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      </div>
      <div>
      <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="on"
    >
      <div className='box'>
        <TextField
          id="customer"
          type="text"
          label="customer"
          multiline
          maxRows={4}
          onChange={(e)=>{
            setCustomer(e.target.value)
          }}
        />
        <TextField
          id="billingAdress"
          type="text"
          label="billingAdress"
          multiline
          maxRows={4}
          onChange={(e)=>{
            setBillingAdress(e.target.value)
          }}
        />
        <TextField
          id="service"
          type="text"
          label="Service"
          multiline
          maxRows={4}
          onChange={(e)=>{
            setService(e.target.value)
          }}
        />
        <TextField
          id="description"
          type="text"
          label="Description"
          maxRows={4}
        />
        <TextField
          id="quantity"
          type="number"
          label="Quantity"
          multiline
          maxRows={4}
          onChange={(e)=>{
            setQuantity(e.target.value)
          }}
        />
        <TextField
          id="rate"
          type="number"
          label="Rate"
          placeholder="Placeholder"
          multiline
          onChange={(e)=>{
            setRate(e.target.value)
          }}
        />
        <TextField
          id="amount"
          type="number"
          label="Amount"
          placeholder="Placeholder"
          multiline
          onChange={(e)=>{
            setAmount(e.target.value)
          }}
        />
        
      </div>
    </Box>
      </div>
      <div>
      <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={sendData}>Contained</Button>
      
      
    </Stack>
      </div>
    </div>
  );
}

export default Date;
