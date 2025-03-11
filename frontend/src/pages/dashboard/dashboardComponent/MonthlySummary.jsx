import React from "react";
import styles from "../styles/dashboard.module.css";

const MonthlySummary = () => {
  return (
    <section className={styles.monthlySummary}>
      <div className={styles.sectionHeader}>
        <h2>Monthly Summary</h2>
        <select className={styles.periodSelect}>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className={styles.chartPlaceholder}>
        <div className={styles.barChart}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
            <div key={month} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div className={styles.barIncome} style={{ height: `${70 + index * 5}%` }}></div>
                <div className={styles.barExpense} style={{ height: `${40 + index * 5}%` }}></div>
              </div>
              <span>{month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chartLegend}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: "#3B82F6" }}></div>
          <span>Income</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: "#EF4444" }}></div>
          <span>Expenses</span>
        </div>
      </div>
    </section>
  );
};

export default MonthlySummary;
