import { Card } from "react-bootstrap"
import { Doughnut } from "react-chartjs-2"
import ChartJS from "../ChartConfig/ChartConfig"
import styles from "../Analytics.module.css"

const categoryData = {
  labels: ["Food", "Housing", "Transportation", "Entertainment", "Utilities", "Others"],
  datasets: [
    {
      label: "Spending by Category",
      data: [450, 850, 320, 280, 210, 190],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      borderWidth: 1,
    },
  ],
}

const DoughnutChartCard = () => (
  <Card className={styles.chartCard}>
    <Card.Body>
      <Card.Title>Spending by Category</Card.Title>
      <div className={styles.chartContainer}>
        <Doughnut
          data={categoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || ""
                    const value = context.raw || 0
                    const total = context.dataset.data.reduce((a, b) => a + b, 0)
                    const percentage = Math.round((value / total) * 100)
                    return `${label}: $${value} (${percentage}%)`
                  },
                },
              },
            },
          }}
        />
      </div>
    </Card.Body>
  </Card>
)

export default DoughnutChartCard