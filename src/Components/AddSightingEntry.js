import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSighting() {
  const [form, setForm] = useState({
    date: "",
    location: "",
    notes: "",
  });

  let navigate = useNavigate();

  const handleAddSighting = async (e) => {
    e.preventDefault();
    let newSighting = form;
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/sightings`,
      newSighting
    );
    console.log("form:", newSighting);
    console.log("response:", response);
    alert(JSON.stringify(form));
    setForm({ date: "", location: "", notes: "" });
    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={handleAddSighting}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="datetime-local"
          placeholder="Date"
          value={form.date}
          onChange={(e) =>
            setForm((prevState) => ({ ...prevState, date: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="location"
          value={form.location}
          onChange={(e) =>
            setForm((prevState) => ({ ...prevState, location: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="what happened?"
          value={form.notes}
          onChange={(e) =>
            setForm((prevState) => ({ ...prevState, notes: e.target.value }))
          }
        />
        <input type="submit" />
      </form>
    </div>
  );
}
