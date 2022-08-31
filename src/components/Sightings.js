import { useEffect, useState } from "react";
import axios from "axios";
import {
  // Link,
  useParams,
  Outlet,
  NavLink,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { BACKEND_URL } from "../constants";

// import for styling
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Sightings() {
  let params = useParams();
  const [sightings, setSightings] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getSightingsData() {
      try {
        const data = await axios.get(`${BACKEND_URL}/sightings`);
        setSightings(data.data);
        // console.log(data.data);
      } catch (e) {
        console.error(e);
      }
    }

    getSightingsData();
  }, []);

  // const renderSightings = sightings.map((data, index) => (
  //   <Card
  //     style={{ width: "18rem" }}
  //     key={`${data["REPORT_NUMBER"]}-${index}`}
  //     className="cardText"
  //   >
  //     <Card.Body>
  //       <Card.Title className="text-dark">
  //         {index} : {data["REPORT_NUMBER"]}
  //       </Card.Title>
  //       <Card.Subtitle className="mb-2 text-muted">
  //         {data["YEAR"]}
  //       </Card.Subtitle>
  //       <Card.Text className="text-dark">{data.OBSERVED}</Card.Text>
  //       <Card.Link href="#">Card Link</Card.Link>
  //       <Card.Link href="#">Another Link</Card.Link>
  //     </Card.Body>
  //   </Card>
  // ));

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {sightings && sightings.length
          ? sightings
              .filter((sighting) => {
                let filter = searchParams.get("filter");
                if (!filter) return true;
                let year = String(sighting["YEAR"]);
                return year.includes(filter);
              })
              .map((sighting, index) => (
                <QueryNavLink
                  key={index + 1}
                  style={{ display: "block", margin: "1rem 0" }}
                  to={`/sightings/${index + 1}`}
                >
                  Sighting {index + 1}: {sighting["YEAR"]}
                </QueryNavLink>
              ))
          : "Loading Data"}
      </nav>
      <Outlet />
    </div>
  );
}
