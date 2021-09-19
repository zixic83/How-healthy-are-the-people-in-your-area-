import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Question from "./Question";
import Forcast from "./Forcast";
import { InputContext } from "./InputContext";
import rawData from "../src/data/alcohol_drug_phn.json";
import AOS from "aos";
import { Typography, Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import smokeImg from "../src/data/smoke2.png";
import drinkImg from "../src/data/drinks.png";

// palettes
// https://colorswall.com/palette/24606/
// https://colorswall.com/palette/24/
// https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4

function App() {
  // animate effect
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [area, setArea] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // passing data between sibling components
  // functions for getting area input/selected status
  const getArea = (area) => setArea(area);
  const getIsSelected = (isSelected) => {
    setIsSelected(isSelected);
  };

  // process raw datasets

  // process data - alcohol
  const processedData = rawData.features.map((item) => {
    return item.properties;
  });

  // area labels (common for all sections)
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
    title:
      "The proportion of alcohol use in population by consumption levels in Australia in 2016",
    stats: alcoholData,
    areaLabels: areaLabels,
    propNames: alcoholPropNames,
    legendNames: [
      "Abstainers / Ex-drinkers",
      "<2 standard drinks",
      ">2 standard drinks",
    ],
    caption: [
      "are abstainers or ex-drinkers",
      "have low lifetime health risk due to alcohol consumption (i.e. alcohol-related disease/injury)",
      "have high lifetime health risk due to alcohol consumption (i.e. alcohol-related disease/injury)",
    ],
    img: drinkImg,
    footNote:
      "*A standard drink contains 10 grams of pure alcohol, which is equivalent to a 100ml 13.5% red wine.",
  };

  // process data - smoking
  const smokeData = processedData.map((item) => {
    return {
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      never_smoked: item.smk_status_never_smoked,
      ex_smoker: item.smk_status_ex_smoker,
      smoke_daily: item.smk_status_daily,
    };
  });

  const smokePropNames = ["never_smoked", "ex_smoker", "smoke_daily"];

  const smokeGraphData = {
    title:
      "The proportion of tobacco smoking population by consumption levels in Australia in 2016",
    stats: smokeData,
    areaLabels: areaLabels,
    propNames: smokePropNames,
    legendNames: ["Never smoked", "Ex-smoker", "Smoke weekly or less"],
    caption: ["have never smoked", "are ex-smokers", "smoke weekly or less"],
    img: smokeImg,
  };

  // drug data
  const drugData = processedData.map((item) => {
    return {
      phn_code15: item.phn_code15,
      phn_name: item.phn_name,
      drug_data: item.recent_illicit,
    };
  });

  // options for the alcohol question
  const alcoholOptions = [
    "Have not consumed alcohol in the previous 12 months",
    "No more than 2 standard drinks* per day on average",
    "More than 2 standard drinks* per day on average",
  ];

  const smokeOptions = [
    "Never smoked at least 100 cigaratees or equivalent amount of tabacco",
    "Smoked at least 100 cigaratees or equivalent amount of tabacco in the past but no longer do",
    "Smoke weekly or less than weekly",
  ];

  const phnDesc =
    "The areas are defined by the 31 Primary Health Networks (PHNs) in Australia.To know more, visit https://www.health.gov.au/initiatives-and-programs/phn";

  return (
    <div>
      {/*webpage heading */}
      <Typography
        align="center"
        variant="h2"
        style={{ fontFamily: "Book Antiqua" }}
      >
        How healthy are the people in your area?
        {/* PHN explanation */}
        <Tooltip
          title={phnDesc}
          style={{ marginBottom: 20, color: "#e6e6e6" }}
          placement="bottom-start"
        >
          <InfoOutlinedIcon />
        </Tooltip>
      </Typography>

      <InputContext.Provider value={{ getArea, getIsSelected }}>
        <InputForm></InputForm>
        {/* Display components only after area selection */}
        {isSelected === true ? (
          <>
            <div data-aos="fade-right">
              <Question
                statement={"How often do you consume alcohol?"}
                area={area}
                options={alcoholOptions}
                data={alcoholGraphData}
              ></Question>
            </div>
            <div data-aos="fade-right">
              <Question
                statement={"Do you smoke?"}
                area={area}
                options={smokeOptions}
                data={smokeGraphData}
              ></Question>
            </div>
            <div data-aos="fade-right">
              <Forcast
                areaLabels={areaLabels}
                drugData={drugData}
                area={area}
              ></Forcast>
            </div>
          </>
        ) : null}
      </InputContext.Provider>
    </div>
  );
}

export default App;
