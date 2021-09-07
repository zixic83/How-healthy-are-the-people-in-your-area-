import React,{useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "chart.js";
Chart.register(annotationPlugin);
// https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js
// https://stackoverflow.com/questions/64828498/sort-an-array-in-descending-order-for-a-chart-js-bar-chart-in-typescript
// https://stackoverflow.com/questions/65605029/how-to-highlight-bar-in-chartjs-with-onkeyup-input
// https://stackoverflow.com/questions/36066508/how-to-include-external-javascript-library-in-reactjs
function BarChart({ rate, topic, areaLabels, index, area }) {

  // sort data
  let allData = [];
  for (let i = 0; i < areaLabels.length; i++) {
    allData.push({
      label: areaLabels[i],
      data: rate[i],
    });
  } 

  allData.sort((a, b) => a.data - b.data);

let sortedLabels = allData.map((item) => {
    return item.label;
  });

let sortedRates = allData.map((item) => {
    return item.data;
  });
  
  

  // switch charts based on button selected
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

  // create an array to represent the color of each bar in the chart
  let barColors = sortedLabels.map((label) => {
      return color
  });
  // find the index of the bar corresponding to the area of choice in barColors
  let areaBar = null;
  for (let i = 0; i < sortedLabels.length; i++){
    if (area === sortedLabels[i]) {
      areaBar = i
    }
  }
  // change the bar color for the identified bar
  for (let i = 0; i < barColors.length; i++) {
    if (areaBar === i) {
      barColors[i] = "#FF7675"
    }
  }

  // find median of rates
/* let median = require('median')
let medianBar = median(rate); */

  // construct chart
  const data1 = {
    labels: sortedLabels,
    datasets: [
      {
        label: topic,
        data: sortedRates,
        backgroundColor: barColors,
        borderColor: ["rgba(228, 233, 237, 1)"],
        borderWidth: 1,
      },
    ],
  };

const options = () => {
  return {
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            scaleID: "y",
            borderWidth: 2,
            borderColor: "#e6e6e6",
            value: 10,
            label: {
              rotation: "auto",
              content: "Median",
              enabled: true,
              position: "start",
              backgroundColor: "#a6a6a6",
            },
          },
        },
      },
    },
  };
};

  return (
    <div>
      <Bar
        data={data1}
        options={options()}
        
      ></Bar>
    </div>
  );
}

export default BarChart;
