
export default async function fetchTxns(wallet) {
  const body = JSON.stringify({
    sql: "SELECT et.transaction_hash, et.timestamp, et.block_number, et.from_address, et.to_address, (et.value / 1000000000000000000) AS value, ett.contract_address, etkns.name, etkns.symbol, (ett.quantity / POWER(10, etkns.decimals)) AS quantity FROM ethereum.transactions et LEFT JOIN ethereum.token_transfers ett ON et.transaction_hash = ett.transaction_hash LEFT JOIN ethereum.tokens etkns ON ett.contract_address = etkns.contract_address WHERE et.from_address = '{{wallet_address}}' OR et.to_address = '{{wallet_address}}' ORDER BY block_number DESC;",
    parameters: {
        wallet_address: wallet
    }
  });

  let data = await fetch('https://api.transpose.io/sql', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'WbmQyvuapelJYhuZEThTusUGPyGJ8Mez'
    }
  })
  data = await data.json();
  console.log(data);
  return data.results;
}