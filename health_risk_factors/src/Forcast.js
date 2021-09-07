import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { Bar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";

export default function Forcast({areaLabels,drugData,area}) {
  const [guess, setGuess] = useState(0);

  const rate = drugData.map((item) => {
    return item.drug_data;
  });

  // sort data
  let allData = [];
  for (let i = 0; i < areaLabels.length; i++) {
    allData.push({
      label: areaLabels[i],
      data: rate[i],
    });
  }

  allData.sort((a, b) => a.data - b.data);

  const sortedLabels = allData.map((item) => {
    return item.label;
  });

  const sortedRates = allData.map((item) => {
    return item.data;
  });

  // create an array to represent the color of each bar in the chart
  let barColors = sortedLabels.map((label) => {
    return "#303F9F";
  });
  // find the index of the bar corresponding to the area of choice in barColors
  let areaBar = null;
  for (let i = 0; i < sortedLabels.length; i++) {
    if (area === sortedLabels[i]) {
      areaBar = i;
    }
  }
  // change the bar color for the identified bar
  for (let i = 0; i < barColors.length; i++) {
    if (areaBar === i) {
      barColors[i] = "#FF7675";
    }
  }

  // construct chart
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "use of illicit drugs",
        data: sortedRates,
        backgroundColor: barColors,
        borderColor: ["rgba(228, 233, 237, 1)"],
        borderWidth: 1,
      },
    ],
  };

const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        point1: {
          type: "point",
          xValue: areaBar,
          yValue: guess,
          backgroundColor: "white",
          radius: 5,
        },
      },
    },
  },
};

  return (
    <div>
      <Grid container>
        <h4>
          What proportion of people do you think have used illicit drugs in
          2016?
        </h4>
        <Grid item xs={4}>
          <Typography>Your Prediction:</Typography>
          <Slider
            value={guess}
            onChange={(e, newValue) => setGuess(newValue)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="on"
          >
            Your Prediction
          </Slider>
        </Grid>
              <Grid item xs={8}>
            {guess === 0? null: <Bar data={data} options={options}></Bar>}
         
        </Grid>
      </Grid>
    </div>
  );
}
