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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealBookingToast } from "./ToastNotifications";

const Dashboard = () => {
  const location = useLocation();
  const [meals, setMeals] = useState([]);
  let timestamp = new Date();

  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));
  console.log("Inside Food ordering for user: ", currentUser.email);

  const orderFood = async (event, param) => {
    // const { value: quantity } = await Swal.fire({
    //   title: "Please enter the quantity?",
    //   input: "text",
    //   inputLabel: "Your total desired quantity",
    //   inputPlaceholder: "Enter your total quantity",
    // });

    // param.head_count = quantity;
    // param.user_id = 123;
    // console.log(param);
    // //param = JSON.stringify({ tour_id: 1, tour_name: "alberta", head_count: 5, user_id: 42 });
    // const param_JSON = JSON.stringify(param);
    // console.log(param_JSON);
    // const bookTourAPIEndPoint = "https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/tour";
    // //setloaded(true);
    // await axios
    //   .post(bookTourAPIEndPoint, param_JSON, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     console.log("Res: " + JSON.stringify(res));

    //     //setloaded(false);
    //     if (res.status == 200) {
    //       console.log("res.data", res.data);
    //     } else if (res.status != 200) {
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Err", err);
    //   });

    let currentDate = timestamp.getDate() + "/" + (timestamp.getMonth() + 1) + "/" + timestamp.getFullYear();
    let currentTime = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
    let param_event = { event_type: "Food Order", user_email: currentUser.email, timestamp: currentTime, date: currentDate };
    let paramJSON = JSON.stringify(param_event);
    console.log(paramJSON);
    await axios
      .post("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/generate", paramJSON, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Logging Food order event toast");
          //MealBookingToast()
        } else if (res.status != 200) {
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    axios
      .get("https://c3yio5z7d4.execute-api.us-east-1.amazonaws.com/dev/getmeals")
      .then((res) => {
        console.log(res.data.Items);
        setMeals(res.data.Items);
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
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Food</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Price</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Action</div>
          </div>
        </CardContent>
      </Card>
      {meals.map((meal) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div style={{ minWidth: "30%" }}>{meal.name}</div>
              <div style={{ minWidth: "30%" }}>{meal.price}</div>
              <Button style={{ minWidth: "30%" }} onClick={orderFood}>
                Order Now
              </Button>
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
      <ToastContainer/>
    </Container>
  );
};
export default Dashboard;
