import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Visualization() {
  let navigate = useNavigate();

  const viewVisualization = async (event) => {
    const visualizationAPIEndPoint = "https://2djbk4n2tj.execute-api.us-east-1.amazonaws.com/dev/visualization";
    await axios
      .get(visualizationAPIEndPoint, {
        headers: {
          headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true },
        },
      })
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));
        if (res.data.statusCode == 200) {
          console.log("res.data.statusCode", res.data.statusCode);
          console.log("res.data.body", res.data.body);
          navigate("/visualization");
        } else if (res.data.statusCode != 200) {
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
      <Typography component="p" variant="h4">
        Click below to see visualizations
      </Typography>
      <div>
        <Button color="primary" href="#" onClick={viewVisualization}>
          Visualizations
        </Button>
      </div>
    </React.Fragment>
  );
}
