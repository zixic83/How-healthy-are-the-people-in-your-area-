import InputForm from "./InputForm";
import Question from "./Question";
import BarChart from "./BarChart";
import { InputContext } from "./InputContext";
import React, { useState } from "react";
import rawData from "../src/data/alcohol_drug_phn.json";
// https://colorswall.com/palette/24606/

function App() {
  const [area, setArea] = useState("");
  const [alcohol, setAlcohol] = useState("");
  // passing data between sibling components
  // function for getting area input
  const getArea = (area) => setArea(area);
  // function for getting user response (alcohol)
  const getAlcohol = (alcohol) => setAlcohol(alcohol);

  // process raw datasets
  // process data - alcohol
  const processedData = rawData.features.map((item) => {
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

  const alcoholPropNames = [
    "abstainers_ex_drinkers",
    "lifetime_risk_lowrisk",
    "lifetime_risk_risky",
  ];

  const alcoholGraphData = {
    stats: alcoholData,
    areaLabels,
    propNames: alcoholPropNames,
  };

  // process data - smoking
  const smokeData = processedData.map((item) => {
    return {
      // change attribute name here
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      abstainers_ex_drinkers: item.alcohol_risk_abstainers_ex_drinkers,
      lifetime_risk_lowrisk: item.alcohol_risk_lifetime_risk_lorisk,
      lifetime_risk_risky: item.alcohol_risk_lifetime_risk_risky,
    };
  });

  // area labels (common)
  let areaLabels = rawData.map((item) => {
    return item.phn_name;
  });

  // options for the alcohol question
  const alcoholOptions = [
    "Have not consumed alcohol in the previous 12 months",
    "No more than 2 standard drinks per day on average",
    "More than 2 standard drinks per day on average",
  ];

  return (
    <div className="App">
      <InputContext.Provider value={{ getArea }}>
        <InputForm></InputForm>
        <Question
          statement={"How often do you comsume alcohol?"}
          area={area}
          options={alcoholOptions}
          data={alcoholGraphData}
        ></Question>
      </InputContext.Provider>
    </div>
  );
}

export default App;
