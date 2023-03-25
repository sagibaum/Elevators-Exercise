import React from 'react';
import FloorButton from './floor-button';
import './styles.css';

function Floor({ floorNumber, isWaiting, isArrived, callElevator }) {
  const floorName = floorNumber === 0 ? 'Ground Floor' : floorNumber;
  return (
    <div className="floor"> 
    <div className='floor-label'>{floorName}</div>
      <FloorButton className="floor-button" floorNumber={floorNumber} isWaiting ={isWaiting} isArrived={isArrived} onCall={callElevator} />
    </div>
  );
}

export default Floor;
