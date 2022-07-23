import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Card } from "@mui/material";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";

function preventDefault(event) {
  event.preventDefault();
}

export default function ReportGeneration() {
  let navigate = useNavigate();
  const waitMessage = "Generating reports, please wait..."
  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));

  const [loaded, setloaded] = React.useState(false);

  const generateReports = async (event) => {
    if(currentUser.email === "owner.bnb.csci5410.group18@gmail.com"){
      setloaded(true);
    navigate('/reports');
    }
    else{
      Swal.fire({
        // title: "Error!",
        text: "You are not logged in as Admin",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(function () {
        window.location = "/login";
      });
    }
  };

  return (
    <React.Fragment>
      
      {/* <Typography component="p" variant="h4">
        Click below to generate reports
      </Typography> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Reports</div>
      <div>
        <Button color="primary" variant="contained" onClick={generateReports}>
          Click here
        </Button>
        <p style={{marginTop:"5px"}}>{loaded && <CircularProgress />}</p>
        <p>{loaded && waitMessage}</p>
      </div>
      </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
