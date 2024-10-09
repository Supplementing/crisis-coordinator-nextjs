"use client";

import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import React from "react";
import { useEffect } from "react";
const Map = ({ allowAddNew }: { allowAddNew: boolean }) => {
  const [map, setMap] = React.useState<any>(null);
  useEffect(() => {
    Radar.initialize("prj_test_pk_045d81269c1631e23d96cd7c8c37283fc74d80bf");

    // create a map
    setMap(
      Radar.ui.map({
        container: "map-container",
        style: "radar-default-v1",
        center: [-73.9911, 40.7342], // NYC
        zoom: 14,
      })
    );
  }, []);

  //   another useEffect to allow clicking when allow add has changed
  useEffect(() => {
    if (allowAddNew) {
      console.log("adding the click handler");
      map.on("click", () => {
        console.log("clicked");
      });
    } else {
      // remove the click listener on the map
      console.log("removing the click handler");
    }
  }, [allowAddNew]);

  return (
    <div
      id="map-container"
      style={{ width: "100%", height: "100vh", position: "absolute" }}
    >
      <div
        id="map"
        style={{ width: "100%", height: "100vh", position: "absolute" }}
      />
    </div>
  );
};

export default Map;
