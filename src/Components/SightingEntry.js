import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function SightingEntry(props) {
  let params = useParams();
  let navigate = useNavigate();
  const [sighting, setSighting] = useState({});

  const getSighting = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`
    );
    setSighting(response.data);
    console.log(response);
  };

  useEffect(() => {
    console.log("params:", params);
    getSighting();
  }, []);

  const sightingEvent = (
    <>
      <h5>Date: {moment(sighting.date).utc().format("DD-MMM-YYYY")}</h5>
      <h6>Location: {sighting.location}</h6>
      <p>Notes: {sighting.notes}</p>
    </>
  );

  return (
    <div>
      <br />
      <button
        onClick={() => {
          navigate(`/${params.sightingId}/edit`);
        }}
      >
        Edit Sighting
      </button>

      {sightingEvent}
      <hr />
    </div>
  );
}
