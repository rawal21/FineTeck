import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, CreditCard, DollarSign } from "lucide-react";
import TransactionItem from "./TransactionItem";
import styles from "../styles/dashboard.module.css";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!token || !userId) {
          setError("Authentication error: Missing token or userId");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/transaction/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transactionsData = response.data.transactions || [];

        // Map backend data to frontend structure
        const formattedTransactions = transactionsData.map((txn) => ({
          title: txn.category || "Transaction",
          amount: txn.amount,
          date: new Date(txn.date).toLocaleString(),
          icon: txn.type === "expense" ? (
            <CreditCard size={20} color="#EF4444" />
          ) : (
            <DollarSign size={20} color="#34D399" />
          ),
          iconBg: txn.type === "expense" ? "rgba(239, 68, 68, 0.1)" : "rgba(52, 211, 153, 0.1)",
        }));

        setTransactions(formattedTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err.response ? err.response.data : err.message);
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, userId]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <section className={styles.recentTransactions}>
      <div className={styles.sectionHeader}>
        <h2>Recent Transactions</h2>
        <a href="#" className={styles.viewAll}>
          View All <ArrowRight size={16} />
        </a>
      </div>
      <div className={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <TransactionItem key={index} {...transaction} />
          ))
        ) : (
          <p>No recent transactions found.</p>
        )}
      </div>
    </section>
  );
};

export default RecentTransactions;
