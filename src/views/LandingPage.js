import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Upcoming from "../components/Upcoming";
import Bookings from "../components/Bookings";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Food from "../components/Food";
import TourPackages from "../components/TourPackages";

const Dashboard = () => {
  const location = useLocation();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Upcoming Bookings */}
        <Grid item xs={12}>
          <Typography variant={"h4"} m={3}>
            Meals
          </Typography>
          <Food />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"h4"} m={3}>
            Travel Packages
          </Typography>

          <TourPackages />
        </Grid>
        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Dashboard;
