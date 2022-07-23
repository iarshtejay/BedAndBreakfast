import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function preventDefault(event) {
  event.preventDefault();
}

export default function ReportGeneration() {
  let navigate = useNavigate();
  const waitMessage = "Generating reports, please wait..."

  const [loaded, setloaded] = React.useState(false);

  const generateReports = async (event) => {
    setloaded(true);
    navigate('/reports');
  };

  return (
    <React.Fragment>
      <Title>Reports</Title>
      {/* <Typography component="p" variant="h4">
        Click below to generate reports
      </Typography> */}
      <div>
        <Button color="primary" variant="contained" onClick={generateReports}>
          Click here
        </Button>
        <p style={{marginTop:"5px"}}>{loaded && <CircularProgress />}</p>
        <p>{loaded && waitMessage}</p>
      </div>
    </React.Fragment>
  );
}
