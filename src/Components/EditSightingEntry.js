import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function EditSightingEntry(props) {
  let params = useParams();
  let navigate = useNavigate();
  const [sighting, setSighting] = useState({});
  const [sightingDate, setSightingDate] = useState("");
  const [sightingLocation, setSightingLocation] = useState("");
  const [sightingNotes, setSightingNotes] = useState("");

  const getSighting = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`
    );
    setSighting(response.data);
    setSightingDate(
      moment(response.data.date).utc().format("yyyy-MM-DDThh:mm")
    );
    setSightingLocation(response.data.locationdescription);
    setSightingNotes(response.data.notes);
    console.log(response);
  };

  useEffect(() => {
    console.log("params:", params);
    getSighting();
  }, []);

  // const sightingEvent = (
  //   <>
  //     <h5>Date: {moment(sighting.date).utc().format("DD-MMM-YYYY")}</h5>
  //     <h6>Location: {sighting.location}</h6>
  //     <p>Notes: {sighting.notes}</p>
  //   </>
  // );

  const handleEditSighting = async (e) => {
    e.preventDefault();
    let updatedSighting = {
      date: sightingDate,
      location: sightingLocation,
      notes: sightingNotes,
    };
    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingId}`,
      updatedSighting
    );
    // console.log("form:", newSighting);
    console.log("response:", response);
    // alert(JSON.stringify(form));
    // setForm({ date: "", location: "", notes: "" });
    setSightingDate("");
    setSightingLocation("");
    setSightingNotes("");
    navigate("/all");
  };

  const editSighting = (
    <form
      onSubmit={handleEditSighting}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="datetime-local"
        placeholder="Date"
        value={sightingDate}
        onChange={(e) => setSightingDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="location"
        value={sightingLocation}
        onChange={(e) => setSightingLocation(e.target.value)}
      />
      <textarea
        placeholder="what happened?"
        value={sightingNotes}
        onChange={(e) => setSightingNotes(e.target.value)}
      />
      <input type="submit" />
    </form>
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
      <br />
      EDIT MODE
      {editSighting}
      <hr />
    </div>
  );
}
