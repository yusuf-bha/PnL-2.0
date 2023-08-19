"use client";
import Transaction from "@/components/transaction";
import { useState, useEffect } from "react";
import fetchTxns from "@/lib/fetchTxns";

export default function History() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const output = await fetchTxns('0xbCF7989942C95507c77ef8ade33a185960BEb9bB');
      setTxns(output);
    };

    fetchTransactions();
  }, []);


  return (
    <>
      <div>history page</div>
      {txns.map((txn, index) => {
        return <Transaction key={index} data={txn}></Transaction>;
      })}
    </>
  );
}