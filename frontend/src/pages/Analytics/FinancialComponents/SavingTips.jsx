import { Row, Col, Card, Button } from "react-bootstrap"
import SavingsGoals from "./SavingGoals"
import styles from "../Analytics.module.css"
import { ArrowDown, Star, Lightning, Calendar3 } from "react-bootstrap-icons"

const savingsTips = [
  {
    id: 1,
    title: "Reduce Food Expenses",
    description:
      "You spent 20% more on food this month compared to your average. Consider meal planning to reduce costs.",
    impact: "Potential monthly savings: $90",
    icon: <ArrowDown className={styles.tipIconDown} />,
  },
  // ... other tips
]

const SavingsTips = () => (
  <div className={styles.savingsTips}>
    <Row>
      <Col lg={8}>
        <SavingsSummary />
        <div className={styles.tipsContainer}>
          {savingsTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </Col>
      <Col lg={4}>
        <SavingsGoals />
      </Col>
    </Row>
  </div>
)

const SavingsSummary = () => (
  <Card className={`${styles.savingsSummaryCard} mb-4`}>
    <Card.Body>
      <Card.Title>Savings Opportunity Summary</Card.Title>
      <div className={styles.savingsSummary}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>$195</div>
          <div className={styles.summaryLabel}>Potential Monthly Savings</div>
        </div>
        {/* ... other summary items */}
      </div>
    </Card.Body>
  </Card>
)

const TipCard = ({ tip }) => (
  <Card className={`${styles.tipCard} mb-3`}>
    <Card.Body>
      <div className={styles.tipHeader}>
        {tip.icon}
        <div>
          <Card.Title>{tip.title}</Card.Title>
          <div className={styles.tipImpact}>{tip.impact}</div>
        </div>
      </div>
      <Card.Text>{tip.description}</Card.Text>
      <Button variant="outline-primary" className={styles.tipActionBtn}>
        Take Action
      </Button>
    </Card.Body>
  </Card>
)

export default SavingsTips