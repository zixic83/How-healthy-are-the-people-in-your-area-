import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, RadioGroup, makeStyles } from "@material-ui/core";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";
import data from "../src/data/alcohol_drug_phn.json";
import { InputContext } from "./InputContext";

// https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
// https://www.youtube.com/watch?v=sP7ANcTpJr8
// https://stackoverflow.com/questions/25158435/paper-button-always-as-upper-case

  const useStyles = makeStyles({
    button: {
      textTransform:'none'
    }
  })

export default function Question({ statement,area,options,data }) {
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
  const [buttonStatus, setButtonStatus] = useState([false,false,false]);

  // aggregate charts
  let charts = []
  for (let i = 0; i < rates.length; i++) {
    charts.push(<BarChart rate={rates[i][1]} areaLabels={data.areaLabels} index={i} topic={rates[i][0]}></BarChart>) 
  }
  
  // function for conditional rendering
  const pickChart = () => {
    for (let i = 0; i < rates.length; i++) {
      if (rates[i][0] === graph) {
        return (
          <BarChart
            rate={rates[i][1]} areaLabels={data.areaLabels} index={i} topic={rates[i][0]} area={area}
          ></BarChart>
        );
      }
    }
  }

  // function for handling user's answer
  const handleAnswer = (e) => {
    // get options[i] 0,1,2
    //setAnswer(e.currentTarget.value)
    setGraph(rates[e.currentTarget.value][0]);
    let updatedButtons = []
    for (let i = 0; i < buttonStatus.length; i++) {
      if (i === e.currentTarget.value) {
        updatedButtons[i] = true;
      } else {
        updatedButtons[i] = false;
      }
    }

    console.log(updatedButtons)

    setButtonStatus(updatedButtons);
  }


  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          {/*  Question for the users */}
          {statement}
          <RadioGroup>
            {options.map((option, index) => {
              return (
                <Button type="submit" value={index} onClick={handleAnswer} className={classes.button} color={buttonStatus[index]?'primary':'secondary'}>
                  {option}
                </Button>
              );
            })}
          </RadioGroup>
        </Grid>
        <Grid item xs={8}>
          {/* create buttons for switching between graphs */}
          <ButtonGroup>
            {rates.map((rate) => {
              return (
                <Button
                  value={rate[0]}
                  onClick={(e) => {
                    setGraph(e.currentTarget.value);
                  }}
                >
                  {rate[0]}
                </Button>
              );
            })}
          </ButtonGroup>
          {pickChart()}
        </Grid>
      </Grid>
    </div>
  );
}
