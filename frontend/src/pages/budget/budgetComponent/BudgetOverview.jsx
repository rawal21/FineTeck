"use client"

import styles from "../styles/budget.module.css";

function BudgetOverview(props) {
  const { totalBudget, totalSpent, remainingBudget, budgetProgress } = props;

  // Determine status color based on budget progress
  function getStatusColor() {
    if (budgetProgress >= 100) return styles.danger;
    if (budgetProgress >= 85) return styles.warning;
    return styles.success;
  }

  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <div className={styles.overviewCard}>
      <div className={styles.overviewHeader}>
        <h2>Monthly Budget Overview</h2>
      </div>

      <div className={styles.overviewContent}>
        <div className={styles.budgetSummary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total Budget</span>
            <span className={styles.summaryValue}>{formatCurrency(totalBudget)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total Spent</span>
            <span className={styles.summaryValue}>{formatCurrency(totalSpent)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Remaining</span>
            <span className={`${styles.summaryValue} ${remainingBudget < 0 ? styles.negative : ""}`}>
              {formatCurrency(remainingBudget)}
            </span>
          </div>
        </div>

        <div className={styles.budgetProgressContainer}>
          <div className={styles.progressLabel}>
            <span>Budget Used</span>
            <span>{Math.min(Math.round(budgetProgress), 100)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${getStatusColor()}`}
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            ></div>
          </div>
          <div className={styles.progressStatus}>
            {budgetProgress >= 100 ? (
              <span className={styles.danger}>You've exceeded your monthly budget</span>
            ) : budgetProgress >= 85 ? (
              <span className={styles.warning}>You're approaching your monthly budget limit</span>
            ) : (
              <span className={styles.success}>Your spending is on track</span>
            )}
          </div>
        </div>

        <div className={styles.budgetChart}>
          <div className={styles.doughnutChart}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
              <path
                className={styles.circleBackground}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${styles.circle} ${getStatusColor()}`}
                strokeDasharray={`${Math.min(budgetProgress, 100)}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className={styles.percentage}>
                {Math.round(budgetProgress)}%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;
