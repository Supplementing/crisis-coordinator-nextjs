"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Map from "../components/map/map";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Homepage = () => {
  const [severity, setSeverity] = React.useState("");
  const [allowAddNew, setAllowAddNew] = React.useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSeverity(event.target.value);
  };
  const severityOptions = ["Low", "Medium", "High"];

  const allowAdd = () => {
    setAllowAddNew(!allowAddNew);
  };
  // in here, we are going to load the map div with searchbars and such above
  return (
    <>
      {/* // container for the buttons at the top */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          style={{
            width: "100%",
            padding: "15px 10px 0px 10px",
            position: "absolute",
            height: "10vh",
            zIndex: 1000,
          }}
          container
          spacing={2}
        >
          <Grid size={4}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Fitler By Severity
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={severity}
                label="Severity"
                onChange={handleChange}
              >
                {severityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ textAlign: "right" }} size={4}>
            <Button
              color={allowAddNew ? "error" : "primary"}
              onClick={allowAdd}
              variant="contained"
            >
              {allowAddNew ? "Cancel" : "Add New"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div id="map">
        <Map allowAddNew={allowAddNew} setAllowAddNew={setAllowAddNew} />
      </div>
    </>
  );
};

export default Homepage;
