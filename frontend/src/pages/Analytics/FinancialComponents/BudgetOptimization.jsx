import { Card, Button } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import styles from "../Analytics.module.css"

const BudgetOptimization = () => (
  <Card className={styles.budgetOptimizationCard}>
    <Card.Body>
      <Card.Title>Budget Optimization</Card.Title>
      <div className={styles.optimizationSummary}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>85%</div>
          <div className={styles.summaryLabel}>Budget Efficiency</div>
        </div>
      </div>

      <div className={`${styles.optimizationDetails} mt-4`}>
        <h6>AI Budget Analysis</h6>
        <p>
          Your budget is well-structured but has room for improvement. We've identified the following
          opportunities:
        </p>
        <ul>
          <li>Reallocate transportation budget to food</li>
          <li>Create a specific budget for online subscriptions</li>
          <li>Increase emergency fund contribution by 5%</li>
        </ul>
      </div>

      <div className={`${styles.optimizationActions} mt-4`}>
        <Button variant="primary" className="w-100 mb-2">
          Apply AI Recommendations
        </Button>
        <Button variant="outline-primary" className="w-100">
          Create Custom Budget
        </Button>
      </div>
    </Card.Body>
  </Card>
)

export default BudgetOptimization