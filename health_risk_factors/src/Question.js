import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, RadioGroup, makeStyles } from "@material-ui/core";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
// https://www.youtube.com/watch?v=sP7ANcTpJr8
// https://stackoverflow.com/questions/25158435/paper-button-always-as-upper-case
// https://stackoverflow.com/questions/63144968/how-to-change-button-color-onclick-material-ui-react

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

export default function Question({ statement, area, options, data }) {
  const classes = useStyles();

  // split different keys to different datasets
  let rates = [];
  for (const key of data.propNames) {
    const result = data.stats.map((item) => {
      return item[key];
    });
    rates.push([key, result]);
  }

  // state values for storing user responses
  const [graph, setGraph] = useState("");
  const [buttonStatus, setButtonStatus] = useState([false, false, false]);

  // aggregate charts
  let charts = [];
  for (let i = 0; i < rates.length; i++) {
    charts.push(
      <BarChart
        rate={rates[i][1]}
        areaLabels={data.areaLabels}
        index={i}
        topic={rates[i][0]}
      ></BarChart>
    );
  }

  // function for conditional rendering
  const pickChart = () => {
    for (let i = 0; i < rates.length; i++) {
      if (rates[i][0] === graph) {
        return (
          <div>
            <BarChart
              rate={rates[i][1]}
              areaLabels={data.areaLabels}
              index={i}
              topic={rates[i][0]}
              area={area}
              title={data.title}
            ></BarChart>
          </div>
        );
      }
    }
  };

  // function for handling user's answer
  const handleAnswer = (e) => {
    // get options[i] 0,1,2
    setGraph(rates[e.currentTarget.value][0]);
    let updatedButtons = [];
    for (let i = 0; i < buttonStatus.length; i++) {
      if (i === parseInt(e.currentTarget.value)) {
        updatedButtons[i] = true;
      } else {
        updatedButtons[i] = false;
      }
    }

    setButtonStatus(updatedButtons);
  };

  return (
    <Box m={5}>
      <Grid container>
        <Grid item xs={4}>
          {/*  Question for the users */}
          {statement}
          <RadioGroup>
            {options.map((option, index) => {
              return (
                <Button
                  type="submit"
                  value={index}
                  onClick={handleAnswer}
                  className={classes.button}
                  color={buttonStatus[index] ? "secondary" : "default"}
                >
                  {option}
                </Button>
              );
            })}
          </RadioGroup>
        </Grid>
        <Grid item xs={8}>
          {pickChart()}
        </Grid>
      </Grid>
    </Box>
  );
}
