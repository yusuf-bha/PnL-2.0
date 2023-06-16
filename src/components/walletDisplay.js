

export default function walletDisplay({ walletData }) {
  return (
    <>
      <div>
        <p>Portfolio</p>
        <p>Total: ${walletData.total}</p>
      </div>
      <table>
        <tr>
          <th>Asset</th>
          <th>Price</th>
          <th>Balance</th>
          <th>Value</th>
        </tr>
        {walletData.results.map((token, key) => {
          return (
            <tr key={key}>
              <td>{token.name}</td>
              <td>${token.price}</td>
              <td>{token.balance}</td>
              <td>${token.total_usd_value}</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}
