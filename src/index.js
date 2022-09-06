import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sightings from "./Components/Sightings";
import SightingEntry from "./Components/SightingEntry";
import AddSighting from "./Components/AddSightingEntry";
import EditSightingEntry from "./Components/EditSightingEntry";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="all" element={<Sightings />} />
        <Route path=":sightingId" element={<SightingEntry />} />
        <Route path=":sightingId/edit" element={<EditSightingEntry />} />
        <Route path="new" element={<AddSighting />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
