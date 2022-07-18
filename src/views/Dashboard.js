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
import Visualization from "../components/Visualization";

export const Dashboard = () => {
  const location = useLocation();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CardActionArea>
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
            EMAIL REGISTERED : {location.state.email_id}
          </Typo
          graphy> */}
        </CardContent>
      </CardActionArea>
      <Grid container spacing={3}>
        {/* Upcoming Bookings */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Upcoming />
          </Paper>
        </Grid>
        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Visualization />
          </Paper>
        </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
