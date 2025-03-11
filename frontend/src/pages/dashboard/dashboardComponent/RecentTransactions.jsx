import React from "react";
import { ArrowRight, CreditCard, DollarSign } from "lucide-react";
import TransactionItem from "./TransactionItem";
import styles from "../styles/dashboard.module.css";

const RecentTransactions = () => {
  const transactions = [
    {
      title: "Online Shopping",
      company: "Amazon.com",
      amount: -120.5,
      date: "Today, 2:45 PM",
      icon: <CreditCard size={20} color="#EF4444" />,
      iconBg: "rgba(239, 68, 68, 0.1)",
    },
    {
      title: "Salary Deposit",
      company: "Employer Inc.",
      amount: 3500.0,
      date: "Yesterday, 9:30 AM",
      icon: <DollarSign size={20} color="#34D399" />,
      iconBg: "rgba(52, 211, 153, 0.1)",
    },
    {
      title: "Restaurant",
      company: "Delicious Cafe",
      amount: -45.8,
      date: "Yesterday, 7:15 PM",
      icon: <CreditCard size={20} color="#EF4444" />,
      iconBg: "rgba(239, 68, 68, 0.1)",
    },
    {
      title: "Utility Bill",
      company: "Electric Company",
      amount: -85.0,
      date: "Jun 15, 10:00 AM",
      icon: <CreditCard size={20} color="#EF4444" />,
      iconBg: "rgba(239, 68, 68, 0.1)",
    },
    {
      title: "Freelance Payment",
      company: "Client XYZ",
      amount: 750.0,
      date: "Jun 14, 3:20 PM",
      icon: <DollarSign size={20} color="#34D399" />,
      iconBg: "rgba(52, 211, 153, 0.1)",
    },
  ];

  return (
    <section className={styles.recentTransactions}>
      <div className={styles.sectionHeader}>
        <h2>Recent Transactions</h2>
        <a href="#" className={styles.viewAll}>
          View All <ArrowRight size={16} />
        </a>
      </div>
      <div className={styles.transactionList}>
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;
