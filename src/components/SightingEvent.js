import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants";

export default function SightingEvent() {
  let params = useParams();
  const [sightingEvent, setSightingEvent] = useState({});
  // const [sightingIndex, setSightingIndex] = useState();
  const sightingInfoArray = [];

  // if (sightingIndex !== params.sightingIndex) {
  //   setSightingIndex(params.sightingIndex);
  // }

  useEffect(() => {
    // if (sightingIndex) {
    async function getSightingEvent() {
      try {
        const data = await axios.get(
          `${BACKEND_URL}/sightings/${params.sightingIndex}`
        );
        setSightingEvent(data.data);
        console.log(data.data);
      } catch (e) {
        console.error(e);
      }
    }

    getSightingEvent();
    // }
  }, [params.sightingIndex]);

  Object.entries(sightingEvent).forEach(([key, value]) =>
    sightingInfoArray.push({ key: [key], value: [value] })
  );

  return (
    <div>
      <h2>Sighting #{params.sightingIndex}</h2>
      {sightingInfoArray.map((info, index) => (
        <div key={index}>
          {info["key"]}: {info["value"]}
          <br />
        </div>
      ))}
    </div>
  );
}
