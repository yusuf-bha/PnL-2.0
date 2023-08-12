import { Line } from "react-chartjs-2";

export default function mainChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            y: { // Left Y-Axis
              position: 'left',
              ticks: {
                beginAtZero: true,
                min: 0,
                max: Infinity,
                callback: (value) => {
                  return value + ' $';
                },
              },
            },
            y1: { // Right Y-Axis
              position: 'right',
              ticks: {
                beginAtZero: true,
                min: -100,
                max: 100,
                callback: (value) => {
                  return value + ' %';
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Token PnL and Price",
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}