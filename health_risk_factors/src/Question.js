import React, { useEffect, useState } from "react";
import {
  Button,
  RadioGroup,
  makeStyles,
  Divider,
  Grid,
  Box
} from "@material-ui/core";
import BarChart from "./BarChart";
import median from "ml-array-median";
import AOS from "aos";

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
    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);

  // process data
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

  // function for conditionally rendering charts
  const pickChart = () => {
    // return corresponding chart based on user choice
    for (let i = 0; i < rates.length; i++) {
      let selectedRate = 0;

      // matching key in dataset with selected key
      if (rates[i][0] === graph) {
        data.areaLabels.forEach((value, index) => {
          if (value === area) {
            selectedRate = rates[i][1][index];
          }
        });

        // median and difference
        const rateMedian = median(rates[i][1]);
        const difference =
          selectedRate > rateMedian
            ? `${(selectedRate - rateMedian).toFixed(1)}% higher`
            : `${(rateMedian - selectedRate).toFixed(1)}% lower`;
        
        return (
          <div data-aos="zoom-in">
            <BarChart
              rate={rates[i][1]}
              areaLabels={data.areaLabels}
              index={i}
              topic={data.legendNames[i]}
              area={area}
              title={data.title}
            ></BarChart>

            {/* caption for answer */}
            <Box fontStyle="italic">
              In <var style={{ color: "#FFA500" }}>{area}</var>,{" "}
              <b>{selectedRate}%</b> of the population {data.caption[i]} in 2016, which
              is <b>{difference}</b> than the nationwide median rate of{" "}
              {rateMedian}%.
            </Box>
          </div>
        );
      }
    }
  };

  // function for handling user's answer
  const handleAnswer = (e) => {
    // update state value
    setGraph(rates[e.currentTarget.value][0]);

    // update button based on user's selection
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
    <Box m={5} height={500} width={1450}>
      <Divider variant="middle" />
      <Grid container>
        <Grid item xs={4}>
          <Box my={14} mr={5}>
            <img src={data.img} alt="illustration" height={130}/>
            {/*  Question for the users */}
            <header style={{ fontFamily: "Book Antiqua", marginBottom: 7 }}>{statement}</header>
            
            <RadioGroup>
              {options.map((option, index) => {
                return (
                  <Button
                    key={index}
                    type="submit"
                    value={index}
                    onClick={handleAnswer}
                    className={classes.button}
                    style={{
                      backgroundColor: buttonStatus[index]
                        ? "#22223b"
                        : "#4a4e69",
                      margin: 3,
                      color: "white",
                    }}
                  >
                    {option}
                  </Button>
                );
              })}
            </RadioGroup>
            {/* additional footnote */}
            <var style={{marginTop:5,fontSize:12}}>{data.footNote ? data.footNote:null}</var>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {pickChart()}
        </Grid>
      </Grid>
    </Box>
  );
}
