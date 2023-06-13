"use client"
import fetchHoldings from "@/lib/fetchHoldings";

export default function Home() {

  const getData = async (event) => {
    event.preventDefault();
    const wallet = event.target.wallet.value;
    const data = await fetchHoldings(wallet);
  }
  return (
    <>
      <form onSubmit={getData} className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" name="wallet" placeholder="Wallet"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
    </>
  )
}
