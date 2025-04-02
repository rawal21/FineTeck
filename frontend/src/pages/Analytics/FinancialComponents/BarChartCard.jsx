import { Card } from "react-bootstrap"
import { Bar } from "react-chartjs-2"
import ChartJS from "../ChartConfig/ChartConfig"
import styles from "../Analytics.module.css"

const trendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Food",
      data: [120, 110, 130, 90],
      backgroundColor: "#FF6384",
    },
    {
      label: "Entertainment",
      data: [60, 80, 70, 70],
      backgroundColor: "#36A2EB",
    },
    {
      label: "Shopping",
      data: [80, 40, 90, 80],
      backgroundColor: "#FFCE56",
    },
  ],
}

const BarChartCard = () => (
  <Card className={styles.chartCard}>
    <Card.Body>
      <Card.Title>Weekly Spending Trends by Category</Card.Title>
      <div className={styles.chartContainer}>
        <Bar
          data={trendData}
          options={{
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
              x: {
                stacked: false,
              },
              y: {
                stacked: false,
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
            },
          }}
        />
      </div>
      <div className={styles.patternInsights}>
        <h5>AI-Detected Patterns:</h5>
        <ul>
          <li>Your food spending tends to increase at the beginning of the month</li>
          <li>Entertainment expenses are consistent throughout the month</li>
          <li>Shopping expenses vary significantly week to week</li>
        </ul>
      </div>
    </Card.Body>
  </Card>
)

export default BarChartCard