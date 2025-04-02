import { Row, Col, Card } from "react-bootstrap"
import LineChartCard from "./LinerChartCard"
import DoughnutChartCard from "./DoughnutChartCard"
import BarChartCard from "./BarChartCard"
import styles from "../Analytics.module.css"

const SpendingPatterns = () => {
  return (
    <div className={styles.spendingPatterns}>
      <Row className="mb-4">
        <Col lg={8}>
          <LineChartCard />
        </Col>
        <Col lg={4}>
          <DoughnutChartCard />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarChartCard />
        </Col>
      </Row>
    </div>
  )
}

export default SpendingPatterns