"use client"

import { useState } from "react"
import Layout from "./dashboardComponent/Layout"
import BalanceSummary from "./dashboardComponent/BalanceSummary"
import MonthlySummary from "./dashboardComponent/MonthlySummary"
import RecentTransactions from "./dashboardComponent/RecentTransactions"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <BalanceSummary />
      <MonthlySummary />
      <RecentTransactions />
    </Layout>
  )
}

