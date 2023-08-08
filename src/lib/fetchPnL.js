import coinGecko from 'coingecko-api';
const coinGeckoClient = new coinGecko();

export default async function fetchData(wallet, token) {
  token = token.toUpperCase();
  let results;
  const body = JSON.stringify({
      sql: "SELECT one.block_number, one.quantity, one.to_address, one.from_address, one.timestamp, two.symbol, (SELECT price FROM ethereum.token_prices etp WHERE etp.token_symbol = two.symbol AND etp.timestamp <= one.timestamp ORDER BY etp.timestamp DESC LIMIT 1) FROM ethereum.token_transfers AS one LEFT JOIN ethereum.tokens AS two ON one.contract_address = two.contract_address WHERE two.symbol = '{{token}}' AND (one.from_address = '{{wallet_address}}' OR one.to_address = '{{wallet_address}}') ORDER BY one.block_number ASC;",
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
//   let start;
//   let end;
  for (let i = 0; i < results.length; i++) {
      const ele = results[i];
    //   const date = ele.timestamp.slice(0, 10);
    //   ele.timestamp = Math.floor(new Date(date).getTime());
      ele.type = ele.from_address === wallet ? "sell" : "buy";
      ele.quantity = Number(ele.quantity.toString().slice(0, -18));
  }
 console.log(results)
//   start = results[0].timestamp / 1000;
//   end = (Math.floor(new Date().getTime() / 1000));
//   token = token.toLowerCase();
//   const info = await coinGeckoClient.coins.fetchMarketChartRange(token, {
//       from: start,
//       to: end
//   });

//   let a = 0;
//   let b = 0;
//   const prices = info.data.prices;
//   while (a < results.length && b < prices.length) {
//       if (prices[b][0] > results[a].timestamp) {
//           results[a].price = Math.floor(prices[b][1]);
//           a++;
//       }
//       b++;
//   }
//   results.push({type: "current", price: Math.floor(prices[prices.length - 1][1])});

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
