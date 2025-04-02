import { Row, Col } from "react-bootstrap"
import BudgetAnalysis from "./BudgetAnalysis"
import BudgetOptimization from "./BudgetOptimization"
import BudgetForecast from "./BudgetForcast"
import RecommendationList from "./RecommendationList"
import styles from "../Analytics.module.css"

const BudgetRecommendations = () => (
  <div className={styles.budgetRecommendations}>
    <Row>
      <Col lg={8}>
        <BudgetAnalysis />
        <RecommendationList />
      </Col>
      <Col lg={4}>
        <BudgetOptimization />
        <BudgetForecast />
      </Col>
    </Row>
  </div>
)

export default BudgetRecommendations