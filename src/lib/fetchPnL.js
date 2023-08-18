
export default async function fetchData(wallet, token) {
  token = token.toUpperCase();
  let results;
  const body = JSON.stringify({
      sql: "WITH main AS (SELECT one.block_number, one.quantity, one.to_address, one.from_address, one.timestamp, two.symbol, (SELECT price FROM ethereum.token_prices etp WHERE etp.token_symbol = two.symbol AND etp.timestamp <= one.timestamp ORDER BY etp.timestamp DESC LIMIT 1) FROM ethereum.token_transfers AS one LEFT JOIN ethereum.tokens AS two ON one.contract_address = two.contract_address WHERE two.symbol = '{{token}}' AND (one.from_address = '{{wallet_address}}' OR one.to_address = '{{wallet_address}}') UNION ALL (SELECT one.block_number, 0 AS quantity, '000000000000000000000000000000000000000000' AS to_address, '000000000000000000000000000000000000000000' AS from_address, one.timestamp, two.symbol,(SELECT price FROM ethereum.token_prices etp WHERE etp.token_symbol = two.symbol AND etp.timestamp <= one.timestamp ORDER BY etp.timestamp DESC LIMIT 1) FROM ethereum.token_transfers AS one LEFT JOIN ethereum.tokens AS two ON one.contract_address = two.contract_address WHERE two.symbol = '{{token}}' ORDER BY one.timestamp DESC LIMIT 1)) SELECT * FROM main ORDER BY block_number;",
      parameters: {
          token: token,
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

  results = data.results;


  for (let i = 0; i < results.length - 1; i++) {
      const ele = results[i];
      ele.type = ele.from_address === wallet ? "sell" : "buy";
      ele.quantity = Number(ele.quantity.toString().slice(0, -18));
  }

  let currenTokens = 0;
  let currentValue = 0;
  let soldValue = 0;
  let boughtValue = 0;

  for (const ele of results) {
      if (ele.type === "buy") {
          currenTokens += ele.quantity;
          currentValue = currenTokens * ele.price;
          boughtValue += ele.quantity * ele.price;
      } else if (ele.type === "sell") {
          currenTokens -= ele.quantity;
          currentValue = currenTokens * ele.price;
          soldValue += ele.quantity * ele.price;
      } else currentValue = currenTokens * ele.price;
      ele.pnl = Math.floor((((currentValue + soldValue) / boughtValue) * 100) - 100);
  }
  

  const output = {
      prices: [],
      pnl: [],
      labels: []
  }
  let count = 1;
  for (const ele of results) {
      if (count === results.length) output.labels.push("Currently");
      else output.labels.push(`Trade ${count}`);
      output.prices.push(ele.price);
      output.pnl.push(ele.pnl);
      count++;
  }

  console.log(output);
  return output;
}
