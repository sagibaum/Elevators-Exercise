import React, { useState } from 'react';

function FloorButton({ floorNumber, isWaiting, isArrived, onCall }) {
  const buttonText = isArrived ? 'Arrived' : isWaiting ? 'Waiting' : 'Call';
  const buttonStyle =  isArrived ? 'floor-button arrived' : isWaiting ? 'floor-button waiting-indicator' : 'floor-button available';
  return (
    <button
      className={buttonStyle}
      onClick={() => onCall(floorNumber)}
      disabled={isWaiting | isArrived}
    >
      <span>{buttonText}</span>
    </button>
  );
}

export default FloorButton;
