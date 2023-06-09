import fetchData from "@/lib/fetchdata"
import { useState } from "react"

export default function Home() {
  const [displayChart, setDisplayChart] = useState[false];
  const getData = async (event) => {
    const wallet = event.target.wallet.value;
    const token = event.target.token.value;
    data = await fetchData(wallet, token);
    setDisplayChart(true);
  }
  return (
    <>
      <form onSubmit={getData()} className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" name="wallet" placeholder="Wallet"></input>
        <input className="border-blue-300 border rounded" type="text" name="token" placeholder="Token"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
    </>
  )
}
// render the appropriate info based on display chart
