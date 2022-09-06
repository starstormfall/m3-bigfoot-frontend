import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function EditSightingEntry(props) {
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
      <button
        onClick={() => {
          navigate(`/${params.sightingId}/`);
        }}
      >
        Back to Sighting
      </button>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Back to Home
      </button>
      <br />
      EDIT MODE
      {sightingEvent}
      <hr />
    </div>
  );
}
