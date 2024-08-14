import React from "react";

import './Home/home.css';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import RouteIcon from '@mui/icons-material/Route';


function Aboutus() {
  
    return (
        
<div 
  style={{
    position: 'relative',
    backgroundImage: `url('cover6.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '60px',
    height: '100vh',
    color: 'white' // optional, for better readability
  }}
>
  {/* Transparent black overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  }} />

  {/* Content goes here */}
  <div style={{ position: 'relative', zIndex: 2 }}>
    {/* Your content inside the div */}
  

                 
        <div style={{display:'flex', paddingTop:'0px', marginLeft:'12%', marginRight:'12%'}}>

        
         <div style={{marginBottom:'40px', border: '0px solid #E6F4F1', // Border with color matching the text
    borderRadius: '5px', // Curved corners
    padding: '20px', // Optional padding to space the content from the border
    }}>
         
         <div className="abouttextdiv">
             <h1 className="abouttext" style={{color:'#E6F4F1'}}>Who we are?</h1>
         </div>
         
         <div className="aboutintrotext">
             <h1 style={{textAlign:'center',color:'#E6F4F1', fontFamily:'inherit', fontSize:'20px', fontWeight:'500', marginTop:'20px'} }>There are many variations but the majority need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence</h1>
         </div>
         </div>
         </div>
         <div style={{display:'flex', marginTop:'30px'}}>
             <div style={{marginLeft:'50px', marginRight:'50px',
    border: '2px solid #E6F4F1', // Border with color matching the text
    borderRadius: '15px', // Curved corners
    padding: '20px', // Optional padding to space the content from the border
  }}>
                 <div className="visontextdiv" style={{display:'flex'}}>
                    <div style={{paddingRight:'10px', marginTop:'13px'}}>
                     <RouteIcon/>
                     </div>
                     <h1 className="abouttext" style={{color:'#E6F4F1'}}>Vision</h1>
                 </div>
                 <div className="aboutintrotext">
                     <h1 style={{textAlign:'center', marginLeft:'10%', marginRight:'10%', fontFamily:'inherit', fontSize:'20px',color:'#E6F4F1', fontWeight:'500', marginTop:'20px'} }>There to be sure Lorem  the first true generatorernet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence</h1>
                 </div>
             </div>
             <div style={{marginLeft:'50px', marginRight:'50px',
    border: '2px solid #E6F4F1', // Border with color matching the text
    borderRadius: '15px', // Curved corners
    padding: '20px', // Optional padding to space the content from the border
  }}>
                 <div className="visontextdiv" style={{display:'flex'}}>
                     <div style={{paddingRight:'10px', marginTop:'13px'}}>
                         <AdsClickIcon/>
                     </div>
                     <h1 className="abouttext" style={{color:'#E6F4F1'}}>Mission</h1>
                 </div>
                 <div className="aboutintrotext">
                     <h1 style={{textAlign:'center', marginLeft:'10%', marginRight:'10%', fontFamily:'inherit', fontSize:'20px',color:'#E6F4F1', fontWeight:'500', marginTop:'20px'} }>There to be sure Lorem  the first true generatorernet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence</h1>
                 </div>
             </div>
         </div>
         </div>
     </div>
    );
  }
  
  export default Aboutus;