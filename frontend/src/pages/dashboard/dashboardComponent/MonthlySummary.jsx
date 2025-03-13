import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";

const MonthlySummary = ({ totalBalance }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (totalBalance && totalBalance.length > 0) {
      // Calculate percentage values for income and expenses
      const formattedData = totalBalance.map((balance, index) => {
        const incomePercentage = balance.income ? (balance.income / balance.total) * 100 : 0;
        const expensePercentage = balance.expense ? (balance.expense / balance.total) * 100 : 0;
        return {
          month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index],
          incomePercentage,
          expensePercentage,
        };
      });

      setData(formattedData);
    }
  }, [totalBalance]);

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
          {data.map(({ month, incomePercentage, expensePercentage }) => (
            <div key={month} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div
                  className={styles.barIncome}
                  style={{ height: `${incomePercentage}%` }}
                ></div>
                <div
                  className={styles.barExpense}
                  style={{ height: `${expensePercentage}%` }}
                ></div>
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
