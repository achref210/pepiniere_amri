import React from 'react'
import {Bar, PolarArea,Doughnut,Pie} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = ({chartData}) => {
  return (
    <Doughnut height={310} data={chartData} />
  )
}

export default BarChart