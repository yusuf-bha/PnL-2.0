import fetchData from "@/lib/fetchdata";
import { useState } from "react";
import Chart from "@/components/chart";

export default function Home() {
  const [displayChart, setDisplayChart] = useState(false);
  const [chartData, setChartData] = useState({})

  const getData = async (event) => {
    const wallet = event.target.wallet.value;
    const token = event.target.token.value;
    data = await fetchData(wallet, token);
    setDisplayChart(true);
    setChartData({chart info here})
  }
  return (
    <>
      <form onSubmit={getData} className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" name="wallet" placeholder="Wallet"></input>
        <input className="border-blue-300 border rounded" type="text" name="token" placeholder="Token"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
    </>
  )
}
