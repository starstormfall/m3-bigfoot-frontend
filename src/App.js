import React from "react";
import "./App.css";

import { Link, Outlet } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1> 3.E.1: Bigfoot JSON </h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/sightings">Sightings</Link>
        </nav>
        <Outlet />
      </div>
    );
  }
}

export default App;
