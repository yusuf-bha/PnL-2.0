
export default async function fetchHistoricalValue(wallet) {
  const body = JSON.stringify({
    sql: "SELECT timestamp FROM ethereum.native_token_transfers WHERE to_address = '{{wallet_address}}' ORDER BY timestamp ASC LIMIT 1;",
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
  console.log('test', data);
}