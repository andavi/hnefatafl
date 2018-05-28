import React from 'react';

const Status = ({ winner, attackerTurn }) => 
	<div className='pb2 pt2 bb bt dark-gray f5 f4-l center tc w-30'>
    { winner
      ? <div className='f2'>
        {winner + ' Wins!'}
      </div> 
      :<div className=''>
        {attackerTurn 
          ? "Black's Turn" 
          : "White's Turn"
        }
      </div>
    }
  </div>

export default Status;