import { Card } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import styles from "../Analytics.module.css"

const BudgetForecast = () => (
  <Card className={`${styles.budgetForecastCard} mt-4`}>
    <Card.Body>
      <Card.Title>3-Month Forecast</Card.Title>
      <div className={styles.forecastChart}>
        <Line
          data={{
            labels: ["Current", "Next Month", "Month 2", "Month 3"],
            datasets: [
              {
                label: "Current Plan",
                data: [1300, 1280, 1350, 1400],
                borderColor: "#4a90e2",
                backgroundColor: "transparent",
                borderDash: [],
                tension: 0.4,
              },
              {
                label: "Optimized Plan",
                data: [1300, 1200, 1150, 1100],
                borderColor: "#7ed321",
                backgroundColor: "transparent",
                borderDash: [],
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
            },
          }}
        />
      </div>
      <div className={`${styles.forecastSummary} mt-3`}>
        <p>
          Potential 3-month savings with optimized budget: <strong>$300</strong>
        </p>
      </div>
    </Card.Body>
  </Card>
)

export default BudgetForecast