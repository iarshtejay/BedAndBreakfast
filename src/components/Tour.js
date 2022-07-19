import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Upcoming from "../components/Upcoming";
import Bookings from "../components/Bookings";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Card, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Tour = () => {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  let navigate = useNavigate();

  const [tourDetails, setTourDetails] = useState([]);

  const bookTour = async (event, param) => {
    const { value: headcount } = await Swal.fire({
      title: "How many heads?",
      input: "text",
      inputLabel: "Your total headcount",
      inputPlaceholder: "Enter your total headcount",
    });

    param["head_count"] = headcount;
    param["user_id"] = "123";
    console.log(param);
    const bookTourAPIEndPoint = "https://4enm1lvle2.execute-api.us-east-1.amazonaws.com/dev/booktour";
    //setloaded(true);
    await axios
      .post(bookTourAPIEndPoint, { param }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));

        //setloaded(false);
        if (res.status == 200) {
          console.log("res.data", res.data);
        } else if (res.status != 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    axios
      .get("https://4enm1lvle2.execute-api.us-east-1.amazonaws.com/dev/alltours")
      .then((res) => {
        console.log(res.data.Items);
        setTours(res.data.Items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <div className="d-flex justify-content-between">
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Places</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Price</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Name</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Action</div>
          </div>
        </CardContent>
      </Card>
      {tours.map((tour) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div style={{ minWidth: "30%" }}>{tour.places}</div>
              <div style={{ minWidth: "30%" }}>{tour.price}</div>
              <div style={{ minWidth: "30%" }}>{tour.tour_name}</div>
              <Button onClick={(event) => bookTour(event, { tour_id: tour.id, tour_name: tour.tour_name })}>Book Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* <Grid container spacing={3}>
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
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
        </Grid>
      </Grid> */}
    </Container>
  );
};
export default Tour;
