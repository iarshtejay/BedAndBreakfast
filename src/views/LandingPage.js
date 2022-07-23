import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Upcoming from "../components/Upcoming";
import Bookings from "../components/Bookings";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CssBaseline, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Food from "../components/Food";
import Tour from "../components/Tour";
import Room from "../components/Room";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useState } from "react";

const Dashboard = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Bed And Breakfast
            </Typography>
          </Toolbar>
        </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, background: '#f2f6fc' }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            {<br />*5}
          </Grid>
          {/* Upcoming Bookings */}
          <h1>Hotel Rooms</h1>
          <Grid item xs={12}>
            <Room />
          </Grid>
          <h1>Food Items</h1>
          <Grid item xs={12}>
            <Food />
          </Grid>
          <h1>Tour packages</h1>
          <Grid item xs={12}>
            <Tour />
          </Grid>
          {/* Recent Bookings */}
          {/* <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
        </Grid> */}
        </Grid>
      </Container>
    </>
  );
};
export default Dashboard;
