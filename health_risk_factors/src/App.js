import InputForm from "./InputForm";
import Question from "./Question";
import Forcast from "./Forcast";
import { InputContext } from "./InputContext";
import React, { useEffect, useState } from "react";
import rawData from "../src/data/alcohol_drug_phn.json";
import AOS from "aos";
// https://colorswall.com/palette/24606/

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [area, setArea] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // passing data between sibling components
  // function for getting area input
  const getArea = (area) => setArea(area);
  const getIsSelected = (isSelected) => {
    setIsSelected(isSelected);
  }

  // process raw datasets

  // process data - alcohol
  const processedData = rawData.features.map((item) => {
    return item.properties;
  });

  // area labels (common)
  let areaLabels = processedData.map((item) => {
    return item.phn_name;
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
    title:"The proportion of alcohol consuming population  by consumption levels in 2016",
    stats: alcoholData,
    areaLabels: areaLabels,
    propNames: alcoholPropNames,
  };

  // process data - smoking
  const smokeData = processedData.map((item) => {
    return {
      // change attribute name here
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      never_smoked: item.smk_status_never_smoked,
      ex_smoker: item.smk_status_ex_smoker,
      smoke_daily: item.smk_status_daily,
    };
  });

  const smokePropNames = ["never_smoked", "ex_smoker", "smoke_daily"];

  const smokeGraphData = {
    title:"The proportion of smoking population in 2016 by consumption levels",
    stats: smokeData,
    areaLabels: areaLabels,
    propNames: smokePropNames,
  };

  // drug data
  const drugData = processedData.map((item) => {
    return {
      // change attribute name here
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      drug_data: item.recent_illicit,
    };
  });

  // options for the alcohol question
  const alcoholOptions = [
    "Have not consumed alcohol in the previous 12 months",
    "No more than 2 standard drinks per day on average",
    "More than 2 standard drinks per day on average",
  ];

  const smokeOptions = [
    "Never smoked 100 cigaratees or equivalent amount of tabacco",
    "Smoked at least 100 cigaratees or equivalent amount of tabacco in the past but no longer does",
    "Smoke weekly or less than weekly",
  ];

  return (
    <div className="App">
      <InputContext.Provider value={{ getArea, getIsSelected }}>
        <InputForm></InputForm>
    {    isSelected === true ? (
          <>
            <div data-aos="fade-up">
              <Question
                statement={"How often do you comsume alcohol?"}
                area={area}
                options={alcoholOptions}
                data={alcoholGraphData}
              ></Question>
            </div>
            <div data-aos="fade-up">
              <Question
                statement={"Do you smoke?"}
                area={area}
                options={smokeOptions}
                data={smokeGraphData}
              ></Question>
            </div>
            <div >
              <Forcast
                areaLabels={areaLabels}
                drugData={drugData}
                area={area}
              ></Forcast>
            </div>
          </>
        ) : null}

        )
      </InputContext.Provider>
    </div>
  );
}

export default App;
