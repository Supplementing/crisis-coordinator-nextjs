import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Loading = () => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={150} variant="indeterminate" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
        >
          Loading Posts...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
