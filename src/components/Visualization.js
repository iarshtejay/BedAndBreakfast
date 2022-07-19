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

export default function Visualization() {
  let navigate = useNavigate();
  const waitMessage = "Generating visualizations, please wait..."

  const [loaded, setloaded] = React.useState(false);

  const viewVisualization = async (event) => {
    const visualizationAPIEndPoint = "https://2djbk4n2tj.execute-api.us-east-1.amazonaws.com/dev/visualization";
    setloaded(true);
    await axios
      .get(visualizationAPIEndPoint, {})
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));

        setloaded(false);
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

  return (
    <React.Fragment>
      <Title>Visualization</Title>
      {/* <Typography component="p" variant="h4">
        Click below to see visualizations
      </Typography> */}
      <div>
        <Button color="primary" variant="contained" onClick={viewVisualization}>
          Click here
        </Button>
        <p style={{marginTop:"5px"}}>{loaded && <CircularProgress />}</p>
        <p>{loaded && waitMessage}</p>
      </div>
    </React.Fragment>
  );
}
