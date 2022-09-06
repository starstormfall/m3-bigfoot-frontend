import "./App.css";

import { React, useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SightingEntry from "./Components/SightingEntry";

// import Sightings from "./Components/Sightings";

export default function App() {
  const [allSightings, setAllSightings] = useState([]);
  const [sightingId, setSightingId] = useState();
  const [toggleEntryView, setToggleEntryView] = useState(false);

  const getSightingsData = async () => {
    let allSightingsAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings`
    );
    console.log(allSightingsAPICall);
    setAllSightings(allSightingsAPICall.data);
  };

  useEffect(() => {
    getSightingsData();
  }, []);

  const handleSelectSighting = (sightingId) => {
    setSightingId(sightingId);
    setToggleEntryView(!toggleEntryView);
  };

  const sightingsList = allSightings.map((sighting, index) => (
    <div key={sighting.id} onClick={() => handleSelectSighting(sighting.id)}>
      <Link to={`/${sighting.id}`}>
        <h5>
          Sighting #{sighting.id}:
          {moment(sighting.date).utc().format("DD-MMM-YYYY")}
        </h5>
      </Link>

      <h6>Location: {sighting.location}</h6>
      <hr />
    </div>
  ));

  return (
    <div className="App">
      <h1>BIGFOOT SQL</h1>
      <nav style={{ display: "flex", flexDirection: "row" }}>
        <NavLink to={`/all`}>
          <button>All Sightings</button>
        </NavLink>
        <NavLink to={`/new`}>
          <button>Add Sighting</button>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
