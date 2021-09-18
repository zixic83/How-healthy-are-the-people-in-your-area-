import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { Bar } from "react-chartjs-2";
import { Box, Divider } from "@material-ui/core";
import median from "ml-array-median";
import drugImg from "../src/data/pills.png";
// https://www.youtube.com/watch?v=b-lWuCAgyO8
// https://stackoverflow.com/questions/60607586/set-typography-text-color-in-material-ui
// https://icon-icons.com/icon/medical-band-aids/73910
// https://github.com/chartjs/chartjs-plugin-annotation/issues/434
// https://stackoverflow.com/questions/36676263/chart-js-v2-hiding-grid-lines

export default function Forcast({ areaLabels, drugData, area }) {
  const [guess, setGuess] = useState(null);

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
  let selectedRate = null;
  for (let i = 0; i < sortedLabels.length; i++) {
    if (area === sortedLabels[i]) {
      selectedRate = sortedRates[i];
      areaBar = i;
    }
  }

  // change the bar color for the identified bar
  for (let i = 0; i < barColors.length; i++) {
    if (areaBar === i) {
      barColors[i] = "#FFA500";
    }
  }

  // marks for the slider
  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 50,
      label: "50%",
    },
  ];

  // median rate and difference
  const rateMedian = median(sortedRates);
  const difference =
    selectedRate > rateMedian
      ? `${(selectedRate - rateMedian).toFixed(1)}% higher`
      : `${(rateMedian - selectedRate).toFixed(1)}% lower`;

  // compare prediction with actual stats
  const comment =
    Math.abs(selectedRate - guess) < 5 ? "Very close! I" : "In fact, i";

  // footnote
  const footnote = `*A clear list of illicit drugs cannot be found, but is likely to be the list in page 148 of the `;

  // construct chart
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Use of illicit drugs",
        data: sortedRates,
        backgroundColor: barColors,
        borderColor: ["rgba(228, 233, 237, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
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
      title: {
        display: true,
        text: "The proportion of illicit use of drugs in population in Australia in 2016",
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          label: function (tooltipItems, data) {
            return tooltipItems.parsed.y + "%";
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Population proportion (%)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    },
  };

  return (
    <Box m={5} height={500} width={1450} mb={10}>
      <Divider variant="middle" />
      <Grid container>
        <Grid item xs={4}>
          <Box my={14} mr={5}>
            {/*  Question for the users */}
            <img
              src={drugImg}
              alt="illustration"
              height={130}
              style={{ marginLeft: 7 }}
            />
            <header style={{ fontFamily: "Book Antiqua" }}>
              What proportion of people have used illicit drugs in your area in 2016?
              <p>Your Prediction (will be shown by a white dot on the graph) : </p>
            </header>
            <Slider
              value={guess}
              onChange={(e, newValue) => setGuess(newValue)}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="on"
              marks={marks}
              max={50}
              style={{
                marginTop: 35,
                color: "#4a4e69",
                fontFamily: "Book Antiqua",
                marginLeft: 7,
              }}
            ></Slider>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {guess === 0 ? null : (
            <>
              <Bar data={data} options={options} data-aos="zoom-in"></Bar>
              <Box fontStyle="italic">
                {comment}n <var style={{ color: "#FFA500" }}>{area}</var>,{" "}
                <b>{selectedRate}%</b> of the population used at least 1 of the
                16 illicit drugs* in 2016, which is <b>{difference}</b> than the nationwide
                median rate of {rateMedian}%.
                <br />
                <var style={{ marginTop: 5, fontSize: 12 }}>
                  {footnote}{" "}
                  <a
                    style={{ color: "#9a8c98" }}
                    href="https://www.aihw.gov.au/getmedia/15db8c15-7062-4cde-bfa4-3c2079f30af3/aihw-phe-214.pdf"
                  >
                    survey report
                  </a>
                  .
                </var>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
