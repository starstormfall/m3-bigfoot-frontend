import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import SightingEntry from "./SightingEntry";

export default function Sightings() {
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

  return (
    <div>
      {!toggleEntryView ? (
        allSightings && allSightings.length ? (
          allSightings.map((sighting, index) => (
            <div
              key={sighting.id}
              onClick={() => handleSelectSighting(sighting.id)}
            >
              <Link to={`/${sighting.id}`}>
                <h5>
                  Sighting #{sighting.id}:
                  {moment(sighting.date).utc().format("DD-MMM-YYYY")}
                </h5>
              </Link>

              <h6>Location: {sighting.location}</h6>
              <hr />
            </div>
          ))
        ) : (
          <p>Loading Data</p>
        )
      ) : null}
    </div>
  );
}
