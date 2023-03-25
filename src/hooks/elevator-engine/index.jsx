import React, { useEffect, useState } from 'react';

const getInitialElevatorState = (numberOfElevators) => {
    return new Array(numberOfElevators).fill({}).map((_, i) => {
        return {
            id: i,
            floor: 0,
            distance: 0,
        }
    });
};

const getInitialFloorsState = (numberOfFloors) => {
    return new Array(numberOfFloors).fill({}).map((_, i) => {
        return {
            id: i,
            floorNumber: i,
            isWaiting: false,
            isArrived: false
        }
    }).reverse();
};

//main function for controlling the elevators system
const useElevatorEngine = ({ numberOfElevators, numberOfFloors }) => {
    const [callsQueue, setCallsQueue] = useState([]);//calls queue
    const [elevatorsData, setElevatorsData] = useState(getInitialElevatorState(numberOfElevators)); // array of elevators data
    const [floorsData, setFloorsData] = useState(getInitialFloorsState(numberOfFloors)); // array of floors data

    const [availableElevators, setAvailableElevatorsData] = useState(elevatorsData); //array of elevators available

    useEffect(() => {
        if (!callsQueue.length) {
            return;
        }

        if (!availableElevators.length) {
            // no available elevator
            return;
        }

        const requestedFloor = callsQueue[0].requestedFloor;
        const closestElevator = availableElevators.reduce((prev, current) => {
            return Math.abs(prev.floor - requestedFloor) < Math.abs(current.floor - requestedFloor) ? prev : current;
        });

        let updatedCallsQueue = callsQueue;
        updatedCallsQueue.shift();
        setCallsQueue([...updatedCallsQueue]); // remove first call from queue

        let updatedElevatorsData = elevatorsData;
        let currentElevator = updatedElevatorsData.find((elevator) => elevator.id === closestElevator.id);
        currentElevator.distance = Math.abs(currentElevator.floor - requestedFloor);
        currentElevator.floor = requestedFloor;
        setElevatorsData([...updatedElevatorsData]);

        // remove the chosen elevators from queue
        let updatedAvailableElevators = availableElevators;
        const index = updatedAvailableElevators.findIndex((elevator) => elevator.id === closestElevator.id);
        if (index >= 0) {
            updatedAvailableElevators.splice(index, 1);
        }
    }, [callsQueue, elevatorsData]);

    const pushToAvailableElevators = (elevator) => {
        setAvailableElevatorsData([...availableElevators, elevator]);
    };

    const onElevatorArrive = (elevatorId) => {
        let updatedElevatorsData = elevatorsData;
        let elevator = updatedElevatorsData.find((elevator) => elevator.id === elevatorId);
        elevator.distance = 0;
        setElevatorsData([...updatedElevatorsData]);

        pushToAvailableElevators(elevator);
        changeFloorStatus(elevator.floor, false);
        changeFloorArrived(elevator.floor, false);
    };

    const onElevatorReachedFloor = (floorNumber) => {
        changeFloorArrived(floorNumber, true);
    };

    const checkValidElevator = (floorNumber) => {
        let updatedElevatorsData = elevatorsData;
        return !updatedElevatorsData.find((elevator) => elevator.floor === floorNumber);
    };

    const callElevator = (requestedFloor) => {
        if (checkValidElevator(requestedFloor)) {
            let updatedCallsQueue = callsQueue;
            updatedCallsQueue.push({ requestedFloor });
            setCallsQueue([...updatedCallsQueue]);
            changeFloorStatus(requestedFloor, true);
        }
    };

    const changeFloorArrived = (floorNumber, isArrived) => {
        let updatedFloorsData = floorsData;
        let currentFloor = updatedFloorsData.find((floor) => floor.floorNumber === floorNumber);
        currentFloor.isArrived = isArrived;
        setFloorsData([...updatedFloorsData]);
    };

    const changeFloorStatus = (floorNumber, isWaiting) => {
        let updatedFloorsData = floorsData;
        updatedFloorsData.find((floor) => floor.floorNumber === floorNumber).isWaiting = isWaiting;
        setFloorsData([...updatedFloorsData]);
    };

    return { elevatorsData, floorsData, callElevator, pushToAvailableElevators, onElevatorArrive, onElevatorReachedFloor }
};

export default useElevatorEngine;
