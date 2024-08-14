import * as React from 'react';
import Chart1Pie from './Charts/Chart1Pie';
import Chart2bar from './Charts/Chart2Bar';
import Chart3Line from './Charts/Chart3Line';
import NavigationBar from './NavigationBar';
import KandyAccount from './BankBalnce/KandyAccount'
import PeoplesBalance from './BankBalnce/ColomboMainBalance';

function Dash() {
  return (
    <div style={{marginTop:'50px'}}>
      <NavigationBar/>
      <div className='balncesSection'>
        
          <div className='bankBalance'>
          <KandyAccount/>
          </div>
          <div className='bankBalance'>
          <PeoplesBalance/>
          </div>
          <div className='bankBalance'>
          <KandyAccount/>
          </div>
          <div className='bankBalance'>
          <KandyAccount/>
          </div>
          <div className='bankBalance'>
          <KandyAccount/>
          </div>

      </div>
      <div className='chartSection'>
        <div className='leftChart2'>
          <Chart1Pie/>
        </div>
        <div className='rightChart2'>
          <Chart2bar/>
        </div>
      </div>
      <div className='chartSection'>
          <div className='leftChart2'>

          </div>
          <div className='rightChart2'>
            <Chart3Line/>
          </div>
      </div>
      <div className='onechart2'>

      </div>
    </div>
  );
}

export default Dash;