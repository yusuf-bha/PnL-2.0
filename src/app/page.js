"use client";
import fetchData from "@/lib/fetchPnL";
import { useState } from "react";
import MainChart from "@/components/mainChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import fetchHistoricalValue from "@/lib/fetchHistoricalValue";
import HistoricalValueDisplay from "@/components/historicalValueDisplay";


Chart.register(CategoryScale);

export default function Home() {
  const [displayChart, setDisplayChart] = useState(false);
  const [chartData, setChartData] = useState({});
  const [historicalChart, setHistoricalChart] = useState({});

  const getData = async (event) => {
    event.preventDefault();
    const wallet = event.target.wallet.value;
    const token = event.target.token.value;
    const data = await fetchData(wallet, token);
    const data1 = await fetchHistoricalValue(wallet);
    setDisplayChart(true);
    setHistoricalChart({
      labels: data1.dates,
        datasets: [
          {
            data: data1.values,
            label: "Value",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false
          }
        ]
    })
    setChartData({
      labels: data.labels,
        datasets: [
          {
            data: data.prices,
            label: "Price",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false
          },
          {
            data: data.pnl,
            label: "PnL",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            fill: false
          }
        ]
    })
  }
  return (
    <>
      <form onSubmit={getData} className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" name="wallet" placeholder="Wallet"></input>
        <input className="border-blue-300 border rounded" type="text" name="token" placeholder="Token"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
      {displayChart && <MainChart chartData={chartData}/>}
      {displayChart && <HistoricalValueDisplay chartData={historicalChart}/>}
    </>
  )
}
