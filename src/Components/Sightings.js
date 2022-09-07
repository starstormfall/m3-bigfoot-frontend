import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function Sightings() {
  const [allSightings, setAllSightings] = useState([]);

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

  return (
    <div>
      {allSightings && allSightings.length ? (
        allSightings.map((sighting, index) => (
          <div key={sighting.id}>
            <Link to={`/${sighting.id}`}>
              <h5>
                Sighting #{sighting.id}:
                {moment(sighting.date).utc().format("DD-MMM-YYYY")}
              </h5>
            </Link>

            <h6>Location: {sighting.locationdescription}</h6>

            <hr />
          </div>
        ))
      ) : (
        <p>Loading Data</p>
      )}
    </div>
  );
}
