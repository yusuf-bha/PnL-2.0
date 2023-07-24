"use client"
import fetchHoldings from "@/lib/fetchHoldings";
import { useState } from "react";
import WalletDisplay from "@/components/walletDisplay";


export default function Home() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [walletData, setWalletData] = useState({});

  const getData = async (event) => {
    event.preventDefault();
    const wallet = event.target.wallet.value;
    const data = await fetchHoldings(wallet);
    setIsDisplayed(true);
    setWalletData(data);
  }

  return (
    <>
      <form onSubmit={getData} className="w-full flex justify-center mt-[10%] gap-2.5">
        <input className="border-blue-300 border rounded" type="text" name="wallet" placeholder="Wallet"></input>
        <input className="bg-blue-300 border-2 rounded" type="submit" value="Search"></input>
      </form>
      {isDisplayed && <WalletDisplay walletData={walletData}/>}
    </>
  )
}
