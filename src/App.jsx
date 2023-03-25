import React, { Component } from "react";
import Building from "./components/building";
import "./App.css"; // Import the CSS file

class App extends Component {
  render() {
    return (
      <div className="App">
        <Building numberOfFloors={10} numberOfElevators={5} />
      </div>
    );
  }
}

export default App;