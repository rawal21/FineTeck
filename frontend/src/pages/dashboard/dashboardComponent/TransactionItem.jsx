import React from "react";
import styles from "../styles/dashboard.module.css";

const TransactionItem = ({ title, company, amount, date, icon, iconBg }) => {
  return (
    <div className={styles.transaction}>
      <div className={styles.transactionIcon} style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className={styles.transactionInfo}>
        <h3>{title}</h3>
        <p>{company}</p>
      </div>
      <div className={styles.transactionDetails}>
        <p className={amount < 0 ? styles.negative : styles.positive}>
          {amount < 0 ? "-" : "+"}${Math.abs(amount).toFixed(2)}
        </p>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
