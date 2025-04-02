// components/financial-insights/ChartCards/LineChartCard.jsx
"use client"
import { Card } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import ChartJS from "../ChartConfig/ChartConfig"
import styles from "../Analytics.module.css"

const LineChartCard = () => {
  const spendingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Spending",
        data: [1200, 1350, 980, 1450, 1250, 1650],
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value,
        },
      },
    },
  };

  return (
    <Card className={styles.chartCard}>
      <Card.Body>
        <Card.Title>Monthly Spending Trends</Card.Title>
        <div className={styles.chartContainer}>
          <Line 
            data={spendingData} 
            options={options}
            redraw={true} // Add this to prevent canvas reuse issues
          />
        </div>
        {/* ... rest of the component */}
      </Card.Body>
    </Card>
  )
}

export default LineChartCard