
export default async function fetchHoldings(wallet) {
  const body = JSON.stringify({
    sql: "SELECT owner.contract_address AS token_address, (owner.balance / 10^tokens.decimals) AS balance, (SELECT price FROM ethereum.token_prices WHERE token_address = owner.contract_address ORDER BY timestamp DESC LIMIT 1) * (owner.balance / 10^tokens.decimals) AS total_usd_value,tokens.name AS name, (SELECT price FROM ethereum.token_prices WHERE token_address = owner.contract_address ORDER BY timestamp DESC LIMIT 1) AS price FROM ethereum.token_owners AS owner JOIN ethereum.tokens AS tokens ON owner.contract_address = tokens.contract_address WHERE owner.owner_address = '{{wallet_address}}' ORDER BY total_usd_value DESC;",
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
  const output = {
    total: 0,
    results: []
  };
  let index;
  let firstTime = true;
  for (let i = 0; i < data.results.length; i++) {
    data.results[i].total_usd_value = Math.trunc(data.results[i].total_usd_value);
    data.results[i].balance = data.results[i].balance.toFixed(2);
    if (data.results[i].price !== null) {
      data.results[i].price = data.results[i].price.toFixed(2);
      output.results.push(data.results[i]);
      if (firstTime) index = i;
      firstTime = false;
      output.total += data.results[i].total_usd_value;
    } else data.results[i].price = 0;
  }  
  const second = data.results.slice(0, index);
  const sortedResults = output.results.concat(second);
  output.results = sortedResults;
  output.total = Math.trunc(output.total);

  return output;
}
