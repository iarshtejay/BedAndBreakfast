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

const Room = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  let navigate = useNavigate();

  const bookRoom = async (event) => {
    const bookRoomAPIEndPoint = "https://4enm1lvle2.execute-api.us-east-1.amazonaws.com/dev/booktour";
    //setloaded(true);
    await axios
      .post(bookRoomAPIEndPoint, {})
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));

        //setloaded(false);
        if (res.status == 200) {
          console.log("res.data", res.data);
          navigate("/visualization");
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
      .get("https://h7ppg1ry82.execute-api.us-east-1.amazonaws.com/dev/getrooms")
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
            <div style={{ minWidth: "30%", fontWeight:"bold" }}>Room number</div>
            <div style={{ minWidth: "30%", fontWeight:"bold" }}>Price</div>
            <div style={{ minWidth: "30%", fontWeight:"bold" }}>Type</div>
            <div style={{ minWidth: "30%", fontWeight:"bold" }}>Action</div>
          </div>
        </CardContent>
      </Card>
      {rooms.map((room) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div style={{ minWidth: "30%" }}>{room.number}</div>
              <div style={{ minWidth: "30%" }}>{room.price}</div>
              <div style={{ minWidth: "30%" }}>{room.type}</div>
              <Button onClick={bookRoom}>Book Now</Button>
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
export default Room;
