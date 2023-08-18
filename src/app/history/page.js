"use client";
import Transaction from "@/components/transaction";
import { useState, useEffect } from "react";
import fetchTxns from "@/lib/fetchTxns";

export default function History() {

  const [txns, setTxns] = useState([]);
  useEffect(() => {
    setTxns(fetchTxns());
  }, [])

  return (
    <>
      <div>history page</div>
      {txns.map((txn) => {
        <Transaction key={txn.block} data={txn}></Transaction>
      })}
    </>
  )
}