import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "../components/Title";
//import Iframe from "Iframe";

function preventDefault(event) {
  event.preventDefault();
}

export default function VisualizationCharts() {
  return (
    <React.Fragment>
      {/* <Title>Visualization</Title>
      <Typography component="p" variant="h4">
        Click below to see visualizations
      </Typography>
      <div>
        <Button color="primary" href="#" onClick={viewVisualization}>
          Visualizations
        </Button>
      </div> */}
      <div>
        <iframe width={1200} height={900} src="https://datastudio.google.com/embed/reporting/7b863fcd-da0e-4fc5-a8f0-0e3efacbecb8/page/tT1xC" frameBorder="0" style = {{border:"0px", marginLeft:"13%"}} allowFullScreen></iframe>
      </div>
    </React.Fragment>
  );
}
