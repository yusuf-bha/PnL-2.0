import fetchHistoricalValue from "@/lib/fetchHistoricalValue";
import { Line } from "react-chartjs-2"

export default function historicalValueDisplay({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total wallet value"
            },
            legend: {
              display: true
            }
          }
        }}
      />
  </div>
  )
}