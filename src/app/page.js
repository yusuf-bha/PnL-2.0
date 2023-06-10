"use client";
import fetchData from "@/lib/fetchdata";
import { useState } from "react";
import MainChart from "@/components/mainChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function Home() {
  const [displayChart, setDisplayChart] = useState(false);
  const [chartData, setChartData] = useState({})

  const getData = async (event) => {
    event.preventDefault();
    const wallet = event.target.wallet.value;
    const token = event.target.token.value;
    data = await fetchData(wallet, token);
    setDisplayChart(true);
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
      {displayChart && (
        <MainChart chartData={chartData}/>
      )}
    </>
  )
}
