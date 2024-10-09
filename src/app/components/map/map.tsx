"use client";

import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import React from "react";
import { useEffect } from "react";
import { v4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Map = ({ allowAddNew }: { allowAddNew: boolean }) => {
  const [newPostModal, setNewPostModal] = React.useState(false);
  const [map, setMap] = React.useState<any>(null);
  const [newPostInfo, setNewPostInfo] = React.useState<any>({
    description: "",
    severity: "",
    coordinates: [],
    contactInfo: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = (e: any) => {
    // in here is where we would submit the form to the backend, aka Supabase to save the data
    e.preventDefault();
    console.log(newPostInfo);
  };

  const handleClose = () => {
    setNewPostModal(false);
    // also remove the click handler from the map
    map.off("click");
  };

  const addMarkerToLocation = (e: any) => {
    const id = v4();
    map.addLayer({
      id: id,
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [e.lngLat.lng, e.lngLat.lat],
              },
              properties: {
                lastUpdated: new Date().toISOString(),
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#FF0000", // Red color
        "circle-opacity": 0.6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#ffffff",
      },
    });
    setNewPostInfo({
      ...newPostInfo,
      coordinates: [e.lngLat.lng, e.lngLat.lat],
    });
    // then show the dialog
    showDialog();
  };

  const showDialog = () => {
    // show the dialog
    setNewPostModal(true);
  };

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
      map.on("click", (e: any) => {
        // add a point to the map and open a dialog with the information needed to add the details
        addMarkerToLocation(e);
      });
    } else {
      // remove the click listener on the map
      console.log("removing the click handler");
    }
  }, [allowAddNew]);

  return (
    <>
      <div
        id="map-container"
        style={{ width: "100%", height: "100vh", position: "absolute" }}
      >
        <div
          id="map"
          style={{ width: "100%", height: "100vh", position: "absolute" }}
        />
      </div>
      <Dialog
        open={newPostModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ padding: "20px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Crisis Point
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Coordinates: {newPostInfo.coordinates.join(", ")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              variant="outlined"
              value={newPostInfo.title}
              onChange={(e) =>
                setNewPostInfo({ ...newPostInfo, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={newPostInfo.description}
              onChange={(e) =>
                setNewPostInfo({ ...newPostInfo, description: e.target.value })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Severity</InputLabel>
              <Select
                value={newPostInfo.severity}
                onChange={(e) =>
                  setNewPostInfo({ ...newPostInfo, severity: e.target.value })
                }
              >
                <MenuItem value="Low">Low 🟢</MenuItem>
                <MenuItem value="Medium">Medium 🟡</MenuItem>
                <MenuItem value="High">High 🔴</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default Map;
