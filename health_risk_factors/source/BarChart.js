import React from "react";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart } from "chart.js";



Chart.register(annotationPlugin);
function BarChart({ rate, topic, areaLabels, index, area, title }) {
  // sort data
  // algorithm：https://stackoverflow.com/questions/64828498/sort-an-array-in-descending-order-for-a-chart-js-bar-chart-in-typescript
  let allData = [];

  areaLabels.forEach((value, index) => {
    allData.push({
      label: value,
      data: rate[index],
    });
  });

  allData.sort((a, b) => a.data - b.data);

  let sortedLabels = allData.map((item) => {
    return item.label;
  });

  let sortedRates = allData.map((item) => {
    return item.data;
  });

  // switch chart color based on button selected
  let color = null;

  switch (index) {
    case 0:
      color = "rgba(0, 158, 115, 1)";
      break;
    case 1:
      color = "rgba(240, 228, 66, 1)";
      break;
    case 2:
      color = "#c13434";
      break;
  }

  // https://stackoverflow.com/questions/65605029/how-to-highlight-bar-in-chartjs-with-onkeyup-input
  // create an array to represent the color of each bar in the chart
  let barColors = sortedLabels.map((label) => {
    return color;
  });

  // find the index of the bar corresponding to the area of choice in barColors
  let areaBar = null;
  for (let i = 0; i < sortedLabels.length; i++) {
    if (area === sortedLabels[i]) {
      areaBar = i;
    }
  }

  // change the bar color for the identified bar
  barColors.forEach((value, index) => {
    console.log("step 2", areaBar, index);
    if (areaBar === index) {
      console.log("reach");
      barColors[index] = "#FFA500";
    }
  });

  // construct chart
  // https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js
  const data = {
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

  // https://stackoverflow.com/questions/27910719/in-chart-js-set-chart-title-name-of-x-axis-and-y-axis
  // https://stackoverflow.com/questions/46317867/how-to-append-text-or-symbol-to-tooltip-of-chart-js/46317913
  const options = () => {
    return {
      plugins: {
        title: {
          display: true,
          text: title,
        },
        tooltip: {
          yAlign: "bottom",
          displayColors: false,
          callbacks: {
            label: function (tooltipItems, data) {
              return tooltipItems.parsed.y + "%";
            },
          },
          // https://stackoverflow.com/questions/63109879/how-can-i-remove-the-grid-lines-in-chartjs
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      scales: {
        yAxes: {
          title: {
            display: true,
            text: "Population proportion (%)",
          },
        },
        xAxes: {
          grid: {
            display: false,
          },
        },
      },
    };
  };

  return (
    <div>
      <Bar data={data} options={options()}></Bar>
    </div>
  );
}

export default BarChart;
