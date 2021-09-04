import React from "react";
import { Bar } from "react-chartjs-2";
// https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js
// https://stackoverflow.com/questions/64828498/sort-an-array-in-descending-order-for-a-chart-js-bar-chart-in-typescript
function BarChart({ rate, topic, areaLabels,index }) {

  // sort data
  let allData = []
  for (let i = 0; i < areaLabels.length; i++) {
    allData.push({
      label: areaLabels[i],
      data: rate[i],
    });
  }
  
  allData.sort((a, b) => a.data - b.data);

  const sortedLabels = allData.map((item) => {
    return item.label
  })

  const sortedRates = allData.map((item) => {
    return item.data
  })


  let color = null;
  if (index == 0) {
    color = "rgba(0, 158, 115, 0.6)";
  }
  if (index == 1) {
    color = "rgba(240, 228, 66, 0.6)";
  }
  if (index == 2) {
    color = "rgba(213, 94, 0, 0.6)";
  }


  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "No. of daily smokers",
        data: sortedRates,
        backgroundColor: [color],
        borderColor: ["rgba(228, 233, 237, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: topic,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default BarChart;
