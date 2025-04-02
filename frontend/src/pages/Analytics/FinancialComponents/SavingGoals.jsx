import { Card, Button } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import ProgressItem from "./ProgressItem"
import styles from "../Analytics.module.css"

const SavingsGoals = () => (
  <Card className={styles.savingsGoalCard}>
    <Card.Body>
      <Card.Title>Savings Goals Progress</Card.Title>
      <ProgressItem 
        label="Emergency Fund"
        value="$7,000 of $10,000 goal"
        percentage={70}
        variant="success"
      />
      <ProgressItem 
        label="Vacation Fund"
        value="$1,350 of $3,000 goal"
        percentage={45}
        variant="info"
      />
      <ProgressItem 
        label="New Car"
        value="$5,000 of $25,000 goal"
        percentage={20}
        variant="warning"
      />

      <div className={`${styles.savingsProjection} mt-4`}>
        <h6>Savings Projection</h6>
        <p>
          At your current rate, you'll reach all your goals in approximately 18 months.
        </p>
        <p>By implementing our tips, you could reach them in just 12 months!</p>
        <Button variant="success" className="w-100 mt-2">
          Optimize Savings Plan
        </Button>
      </div>
    </Card.Body>
  </Card>
)

export default SavingsGoals