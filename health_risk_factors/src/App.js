import data from '../src/data/alcohol_drug_phn.json'
import InputForm from "./InputForm";
import Question from "./Question";
import BarChart from './BarChart';
import { Bar } from 'react-chartjs-2';

function App() {
  // process data
  const processedData = data.features.map((item) => {
    return item.properties
  })

  const alcoholData = processedData.map((item) => {
    return ({
      // change attribute name here
      "phn_code15": item.phn_code15,
      "phn_name":item.phn_name,
      "abstainers_ex_drinkers": item.alcohol_risk_abstainers_ex_drinkers,
      "lifetime_risk_lowrisk": item.alcohol_risk_lifetime_risk_lorisk,
      "lifetime_risk_risky": item.alcohol_risk_lifetime_risk_risky
    })
  })

  const areaLabels = alcoholData.map((item) => {
    return item.phn_name;
  });

const propNames = [
  "abstainers_ex_drinkers",
  "lifetime_risk_lowrisk",
  "lifetime_risk_risky",
];

  // split different keys to different datasets
  let rates = [];
  for (const elem of propNames) {
    const result = alcoholData.map((item) => {
      return item[elem];
    });
    rates.push([elem,result ]);
  }
  console.log(rates)

  return (
    <div className="App">
      Hello World
      {rates.map((rate) => {
        return (
          <BarChart rate={rate[1]} topic={rate[0]} areaLabels={areaLabels}>

          </BarChart>
      )})}
    </div>
  );
}

export default App;
