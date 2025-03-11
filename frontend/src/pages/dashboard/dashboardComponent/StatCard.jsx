import React from "react";
import styles from "../styles/dashboard.module.css";

const StatCard = ({ title, amount, change, icon, iconBg, isNegative = false }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className={styles.statInfo}>
        <h3>{title}</h3>
        <p>{amount}</p>
        <span className={isNegative ? styles.negative : styles.positive}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
