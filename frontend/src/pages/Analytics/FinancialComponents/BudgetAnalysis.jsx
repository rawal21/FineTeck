import { Card } from "react-bootstrap"
import ProgressItem from "./ProgressItem"
import styles from "../Analytics.module.css"

const BudgetAnalysis = () => (
  <Card className={`${styles.budgetAnalysisCard} mb-4`}>
    <Card.Body>
      <Card.Title>Budget Analysis</Card.Title>
      <div className={styles.budgetCategories}>
        <ProgressItem
          label="Food"
          value="$450 spent of $400 budget"
          percentage={112}
          variant="danger"
          status="+$50 over budget"
        />
        <ProgressItem
          label="Transportation"
          value="$220 spent of $300 budget"
          percentage={73}
          variant="success"
          status="$80 under budget"
        />
        <ProgressItem
          label="Entertainment"
          value="$190 spent of $200 budget"
          percentage={95}
          variant="info"
          status="On budget"
        />
        <ProgressItem
          label="Housing"
          value="$850 spent of $850 budget"
          percentage={100}
          variant="info"
          status="On budget"
        />
      </div>
    </Card.Body>
  </Card>
)

export default BudgetAnalysis