import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";

export default function Question({ statement, rawData, topic }) {
  return (
    <div>
      <Grid container >
        <Grid item xs={4}>
          {statement}
          <ButtonGroup>
            <Button type="submit">Yes</Button>
            <Button type="submit">No</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          <BarChart rawData={rawData} topic={topic}></BarChart>
        </Grid>

        
      </Grid>
    </div>
  );
}
