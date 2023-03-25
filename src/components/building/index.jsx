import { useState,Component } from "react";
import Floor from "../Floor";
import Elevator from "../elevator";
import useElevatorEngine from "../../hooks/elevator-engine/";
import './styles.css';

const Building = ({ numberOfFloors, numberOfElevators }) => {
    const { elevatorsData, floorsData, callElevator, pushToAvailableElevators, onElevatorArrive, onElevatorReachedFloor } = useElevatorEngine({ numberOfFloors, numberOfElevators });

    return (
     <div className="building">
        <h2>Evelator Execrise</h2>
        <div className="floors">
          {floorsData.map((floor, i) => (
            <Floor key={`floor-${i}`} {...floor} callElevator={callElevator} />
          ))}
        </div>

      <div className="elevators">
          {elevatorsData.map((elevator, i) => (
            <Elevator
              key={`elevator-${elevator.id}`}
              {...elevator}
              pushToAvailableElevators={pushToAvailableElevators}
              onElevatorReachedFloor={onElevatorReachedFloor}
              onElevatorArrive={onElevatorArrive}
              numberOfFloors={numberOfFloors}
            />
          ))}
        </div>
    
      </div>
    );
  };
  
  export default Building;
  
