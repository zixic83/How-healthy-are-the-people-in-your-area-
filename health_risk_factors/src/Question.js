import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";
import data from "../src/data/alcohol_drug_phn.json";

export default function Question({ statement }) {
  // process data
  const processedData = data.features.map((item) => {
    return item.properties;
  });

  const alcoholData = processedData.map((item) => {
    return {
      // change attribute name here
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      abstainers_ex_drinkers: item.alcohol_risk_abstainers_ex_drinkers,
      lifetime_risk_lowrisk: item.alcohol_risk_lifetime_risk_lorisk,
      lifetime_risk_risky: item.alcohol_risk_lifetime_risk_risky,
    };
  });

  let areaLabels = alcoholData.map((item) => {
    return item.phn_name;
  });

  const propNames = [
    "abstainers_ex_drinkers",
    "lifetime_risk_lowrisk",
    "lifetime_risk_risky",
  ];

  // split different keys to different datasets
  let rates = [];
  for (const key of propNames) {
    const result = alcoholData.map((item) => {
      return item[key];
    });
    rates.push([key, result]);
  }

  // create buttons for switching between graphs
  const [input, setInput] = useState("");

  // aggregate charts
  let charts = []
  for (let i = 0; i < rates.length; i++) {
    charts.push(<BarChart rate={rates[i][1]} areaLabels={areaLabels} index={i} topic={rates[i][0]}></BarChart>) 
  }
  
  // function for conditional rendering
  const pickChart = () => {
    for (let i = 0; i < rates.length; i++) {
      if (rates[i][0] === input) {
        return (
          <BarChart
            rate={rates[i][1]} areaLabels={areaLabels} index={i} topic={rates[i][0]}
          ></BarChart>
        );
      }
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          {statement}
          <ButtonGroup>
            <Button type="submit">Yes</Button>
            <Button type="submit">No</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup>
            {rates.map((rate) => {
              return (
                <Button
                  value={rate[0]}
                  onClick={(e) => {
                    setInput(e.currentTarget.value);
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
