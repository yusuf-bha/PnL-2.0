
export default async function fetchTxns(wallet) {
  const body = JSON.stringify({
    sql: "",
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
  return data;
}