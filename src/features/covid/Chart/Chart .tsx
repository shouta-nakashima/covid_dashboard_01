import React from 'react'
import Styles from './Chart.module.css'
import { Line, Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import { selectData, selectDailyData, selectCountry } from '../covidSlice';

const Chart : React.FC = () => {
  const data = useSelector(selectData)
  const dailyData = useSelector(selectDailyData)
  const country = useSelector(selectCountry)

  const barChart = data && (
    <Bar
      data={{
        labels: ["感染者数", "回復者数", "死者数"],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#008080",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Latest status in ${country}` },
      }}
    />
  );

  const lineChart = dailyData[0] && (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed.total),
            label: "感染者数",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths.total),
            label: "死者数",
            borderColor: "#ff3370",
            fill: true,
          },
        ],
      }}
    />
  );
  return (
    <div className={Styles.container}>
      {country.length ? barChart : lineChart}
    </div>
  )
}

export default Chart 
