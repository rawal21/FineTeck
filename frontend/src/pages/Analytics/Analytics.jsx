"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import FinancialInsightsTabs from "./FinancialComponents/FinancialInsightsTabs"
import styles from "./Analytics.module.css"

const FinancialInsights = () => {
  const [activeTab, setActiveTab] = useState("spending")

  return (
    <Container fluid className={styles.financialInsightsContainer}>
      <h1 className={styles.pageTitle}>AI-Based Financial Insights</h1>
      <p className={styles.pageSubtitle}>Personalized analysis and recommendations for your financial health</p>

      <FinancialInsightsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </Container>
  )
}

export default FinancialInsights