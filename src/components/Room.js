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
import DatePicker from "react-datepicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { RoomBookingToast } from "../components/ToastNotifications";
import { BookingRequests } from "../api/BookingRequests";

const Room = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  let navigate = useNavigate();
  let timestamp = new Date();

  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));
  // console.log("Inside Room booking for user: ", currentUser.email);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());

  const handleCheckIn = async (event) => {
    //console.log(event.target.value);
    setCheckIn(event);
  };
  const handleCheckOut = async (event) => {
    //console.log(event.target.value);
    setCheckOut(event);
  };
  //   console.log('type');
  //   console.log(typeof String(checkIn));

  const bookRoom = async (event, param) => {
    if (currentUser) {
      const bookRoomAPIEndPoint =
        "https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/rooms/bookroom";
      //setloaded(true);
      param.user_id = currentUser.user_id;
      param.check_in = checkIn;
      param.check_out = checkOut;

      const param_JSON = JSON.stringify(param);
      console.log(param_JSON);

      await BookingRequests.sendRequest("ROOM_SERVICE", param)
        .then((res) => {
          console.log("Res: " + JSON.stringify(res));
          if (res.status == 200) {
            console.log("res.data", res.data);
            RoomBookingToast({
              check_in: String(checkIn).substring(4, 15),
              check_out: String(checkOut).substring(4, 15),
            });
            //Swal.fire("Your request for room booking is successful from dates " + String(checkIn).substring(4, 15) + " to " + String(checkOut).substring(4, 15));
          } else if (res.status != 200) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });

      let currentDate =
        timestamp.getDate() +
        "/" +
        (timestamp.getMonth() + 1) +
        "/" +
        timestamp.getFullYear();
      let currentTime =
        timestamp.getHours() +
        ":" +
        timestamp.getMinutes() +
        ":" +
        timestamp.getSeconds();
      let param_event = {
        event_type: "Room booking",
        user_email: currentUser.email,
        timestamp: currentTime,
        date: currentDate,
      };
      let paramJSON = JSON.stringify(param_event);
      console.log(paramJSON);
      await axios
        .post(
          "https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/generate",
          paramJSON,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            console.log("Logging room booking event");
          } else if (res.status != 200) {
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });
    } else {
      Swal.fire({
        // title: "Error!",
        text: "Please Login or signup to book tour",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(function () {
        window.location = "/login";
      });
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://h7ppg1ry82.execute-api.us-east-1.amazonaws.com/dev/getrooms"
      )
      .then((res) => {
        console.log("Rooms- ", res.data.rooms);
        setRooms(res.data.rooms);
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
            <div style={{ fontWeight: "bold" }}>Room number</div>
            <div style={{ fontWeight: "bold" }}>Price</div>
            <div style={{ fontWeight: "bold" }}>Type</div>
            <div style={{ fontWeight: "bold" }}>Check In</div>
            <div style={{ fontWeight: "bold" }}>Check Out</div>
            <div style={{ fontWeight: "bold" }}>Action</div>
          </div>
        </CardContent>
      </Card>
      {rooms.map((room) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div>{room.number}</div>
              <div>{room.price}</div>
              <div>{room.type}</div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Check In"
                    inputFormat="MM/dd/yyyy"
                    value={checkIn}
                    onChange={handleCheckIn}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Check Out"
                    inputFormat="MM/dd/yyyy"
                    value={checkOut}
                    onChange={handleCheckOut}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <Button
                onClick={(event) =>
                  bookRoom(event, {
                    room_no: room.number,
                    room_type: room.type,
                  })
                }
              >
                Book Now
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
      <ToastContainer />
    </Container>
  );
};
export default Room;
