import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Services() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
  return (
    

    <div style={{ marginTop:'70px', marginLeft:'10%', marginRight:'10%'}}>
             <h1 className="services" >What we do?</h1>
             <div style={{display:'flex', justifyContent:'space-between' }}>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="Exchanges.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Exchanges
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
    
        </div>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="TeamWork.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Leadership Development
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
        </div>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="TeamBond.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Team Bonding
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
        </div>
        
        </div>
        <div style={{marginTop:'70px'}}>
        <h1 className="services" >What we have?</h1>

        <div style={{display:'flex', justifyContent:'space-between' }}>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="Internship.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Internship opportunities
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
        </div>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="Volunteer.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Volunteering opportunities
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
        </div>
        <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="Employeement.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Employement opportunities
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica It is a long 
          established fact that a reader will be distracted by the readable content 
          of a page when looking at its layout. The point of using 
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpen}>Contact us</Button>
      </CardActions>
    </Card>
        </div>
        </div>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contact details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Mobile no:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Company Email:
          </Typography>
        </Box>
      </Modal>
    </div>


    
  );
}
