import { Nav } from "react-bootstrap"
import SpendingPatterns from "./SpendingPattern"
import SavingsTips from "./SavingTips"
import BudgetRecommendations from "./BudgetRecommendation"
import styles from "../Analytics.module.css"

const FinancialInsightsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <Nav
        variant="tabs"
        className={`${styles.insightTabs} mb-4`}
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="spending">Spending Patterns</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="savings">Savings Tips</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="budget">Budget Recommendations</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "spending" && <SpendingPatterns />}
      {activeTab === "savings" && <SavingsTips />}
      {activeTab === "budget" && <BudgetRecommendations />}
    </>
  )
}

export default FinancialInsightsTabs