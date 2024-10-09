"use client";

import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import React, { use } from "react";
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
import Snackbar from "@mui/material/Snackbar";

const Map = ({
  allowAddNew,
  setAllowAddNew,
}: {
  allowAddNew: boolean;
  setAllowAddNew: (allowAddNew: boolean) => void;
}) => {
  const allowClick = React.useRef(false);
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
    if (map) {
      setAllowAddNew(false);
    }
  };

  const addMarkerToLocation = (e: any) => {
    if (!allowClick.current) {
      return;
    }
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
      allowClick.current = true;
    } else {
      allowClick.current = false;
    }
  }, [allowAddNew]);

  useEffect(() => {
    if (allowClick && map) {
      map.on("click", addMarkerToLocation);
    } else {
      if (map) {
        map.off("click", addMarkerToLocation);
      }
    }
  }, [allowClick, map]);

  return (
    <>
      <Snackbar
        style={{ position: "absolute", zIndex: 1000 }}
        open={allowAddNew}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Click Anywhere On Map To Add New Crisis Point"
      >
        <div
          style={{
            backgroundColor: "rgba(141, 240, 134)",
            padding: "20px",
            borderRadius: "10px",
            color: "black",
          }}
        >
          <div>Click Anywhere On Map To Add New Crisis Point</div>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0px",
              fontWeight: "bold",
            }}
          >
            or
          </div>
          <TextField
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            size="small"
            id="outlined-basic"
            label="Enter Address..."
            variant="outlined"
            color="primary"
          />
        </div>
      </Snackbar>
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
