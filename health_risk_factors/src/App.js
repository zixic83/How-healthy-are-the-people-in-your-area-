import BarChart from "./BarChart";
import daily_smoker_data from "../src/data/daily_smoker.json";
import over_two_drinks_data from "../src/data/consume_over_two_drinks.json";
import physcial_activity_data from "../src/data/insufficent_physical_activity.json";

function App() {
  return (
    <div className="App">
      <BarChart rawData={daily_smoker_data} topic='Daily smoker'></BarChart>
      <BarChart rawData={over_two_drinks_data} topic='Alcohol comsumption'></BarChart>
      <BarChart rawData={physcial_activity_data } topic='Physical activity'></BarChart>
    </div>
  );
}

export default App;
