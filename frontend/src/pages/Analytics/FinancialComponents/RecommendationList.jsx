import { Card, Button } from "react-bootstrap"
import { ArrowUp, ArrowDown, Trophy } from "react-bootstrap-icons"
import styles from "../Analytics.module.css"

const recommendations = [
  {
    id: 1,
    title: "Adjust Food Budget",
    description: "Based on your 6-month average, we recommend increasing your food budget from $400 to $450.",
    status: "Recommended Increase",
    icon: <ArrowUp className={styles.recommendationIconUp} />,
  },
  {
    id: 2,
    title: "Transportation Budget",
    description: "You consistently spend less on transportation than budgeted. Consider reducing this category.",
    status: "Recommended Decrease",
    icon: <ArrowDown className={styles.recommendationIconDown} />,
  },
  {
    id: 3,
    title: "Emergency Fund Goal",
    description:
      "You're 70% toward your emergency fund goal. Maintain your current savings rate to reach it by November.",
    status: "On Track",
    icon: <Trophy className={styles.recommendationIconTrophy} />,
  },
]

const RecommendationList = () => (
  <div className={styles.recommendationsContainer}>
    {recommendations.map((rec) => (
      <Card key={rec.id} className={`${styles.recommendationCard} mb-3`}>
        <Card.Body>
          <div className={styles.recommendationHeader}>
            {rec.icon}
            <div>
              <Card.Title>{rec.title}</Card.Title>
              <div className={styles.recommendationStatus}>{rec.status}</div>
            </div>
          </div>
          <Card.Text>{rec.description}</Card.Text>
          <div className={styles.recommendationActions}>
            <Button variant="primary">Apply Recommendation</Button>
            <Button variant="outline-secondary">Ignore</Button>
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
)

export default RecommendationList