import { output } from "../../next.config";

export default async function fetchHistoricalValue(wallet) {
  const body = JSON.stringify({
    sql: "SELECT timestamp FROM ethereum.native_token_transfers WHERE to_address = '{{wallet_address}}' ORDER BY timestamp ASC LIMIT 1;",
    parameters: {
        wallet_address: wallet
    }
  });

  let date = await fetch('https://api.transpose.io/sql', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'WbmQyvuapelJYhuZEThTusUGPyGJ8Mez'
    }
  })
  date = await date.json();
  date = date.results[0].timestamp.slice(0, 10);
  date = new Date(date);
  let currDate = new Date();
  let days = currDate - date;
  days = days / 86400000;
  days = Math.ceil(days) + 1;

  const body1 = JSON.stringify({
    sql: "WITH transfers AS (SELECT timestamp, contract_address, sum(quantity) quantity FROM ethereum.token_transfers WHERE to_address = '{{wallet}}' AND __confirmed = true GROUP BY timestamp, contract_address UNION ALL SELECT timestamp, contract_address, sum(-quantity) quantity FROM ethereum.token_transfers WHERE from_address = '{{wallet}}' AND __confirmed = true GROUP BY timestamp, contract_address UNION ALL SELECT timestamp, '0x0000000000000000000000000000000000000000' AS contract_address, sum(quantity) quantity FROM ethereum.native_token_transfers WHERE to_address = '{{wallet}}' AND __confirmed = true GROUP BY timestamp, contract_address UNION ALL SELECT timestamp, '0x0000000000000000000000000000000000000000' AS contract_address, sum(-quantity) quantity FROM ethereum.native_token_transfers WHERE from_address = '{{wallet}}' AND __confirmed = true GROUP BY timestamp, contract_address), balances AS (SELECT contract_address AS token_address, timestamp AS timestamp, SUM(quantity) OVER (PARTITION BY contract_address ORDER BY timestamp) AS balance FROM transfers), tokens AS (SELECT dt.token_address, et.decimals FROM (SELECT DISTINCT token_address FROM balances) dt JOIN ethereum.tokens et ON et.contract_address = dt.token_address UNION SELECT '0x0000000000000000000000000000000000000000' AS token_address, 18 AS decimals), series AS (SELECT GENERATE_SERIES(NOW(), NOW() - INTERVAL '{{interval}}', INTERVAL '-{{interval}}' / '{{samples}}') as timestamp)SELECT timestamp, SUM(COALESCE((SELECT price FROM ethereum.token_prices etp WHERE etp.token_address = tokens.token_address AND etp.timestamp <= series.timestamp ORDER BY etp.timestamp DESC LIMIT 1) * (SELECT balance FROM balances b WHERE b.token_address = tokens.token_address AND b.timestamp <= series.timestamp ORDER BY b.timestamp DESC LIMIT 1) / POWER(10, tokens.decimals), 0)) AS value FROM tokens CROSS JOIN series GROUP BY timestamp;",
    parameters: {
        wallet: wallet,
        interval: `${days} days`,
        samples: 30
    }
  });

  let data = await fetch('https://api.transpose.io/sql', {
    method: 'POST',
    body: body1,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'WbmQyvuapelJYhuZEThTusUGPyGJ8Mez'
    }
  })
  data = await data.json();
  const output = {
    dates: [],
    values: []
  }
  for (let i = 0; i < data.results.length; i++) {
    output.dates.push(data.results[i].timestamp);
    output.values.push(data.results[i].value);
  }
  console.log("data", output);
  return output;
}