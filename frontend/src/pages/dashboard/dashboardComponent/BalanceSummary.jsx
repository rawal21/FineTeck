import React, { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import styles from "../styles/Dashboard.module.css";

const BalanceSummary = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // Get token from localStorage
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        if (!token || !userId) {
          setError("Authentication error: Missing token or userId");
          setLoading(false);
          return;
        }

        const profileResponse = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transactionResponse = await axios.get(`http://localhost:5000/api/transaction/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Profile Data:", profileResponse.data);
        console.log("Transaction Data:", transactionResponse.data);

        // Extract relevant data
        const { income, savings = 0 } = profileResponse.data;
        const transactions = transactionResponse.data.transactions || [];
        
        // Calculate total expenses
        // const totalExpense = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
        const totalExpense = transactionResponse.data.totalExpense;

        // Calculate percentage changes dynamically
        const balanceChangePercent = totalExpense !== 0 ? ((income - totalExpense) / totalExpense) * 100 : 100;
        const incomeChangePercent = income !== 0 ? ((income - totalExpense) / income) * 100 : 100;
        const expenseChangePercent = totalExpense !== 0 ? (totalExpense / income) * 100 : 0;
        const savingsChangePercent = savings !== 0 ? (savings / income) * 100 : 0;

        setBalanceData({
          income,
          totalExpense,
          savings,
          balanceChangePercent: balanceChangePercent.toFixed(2),
          incomeChangePercent: incomeChangePercent.toFixed(2),
          expenseChangePercent: expenseChangePercent.toFixed(2),
          savingsChangePercent: savingsChangePercent.toFixed(2),
        });
      } catch (err) {
        console.error("Error fetching balance data:", err.response ? err.response.data : err.message);
        setError("Failed to load balance data");
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) fetchBalanceData();
  }, [token, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <section className={styles.balanceSummary}>
      <div className={styles.balanceCard}>
        <div className={styles.balanceHeader}>
          <h2>Total Balance</h2>
          <select className={styles.periodSelect}>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <div className={styles.balanceAmount}>
          <div className={styles.balanceIconContainer}>
            <DollarSign size={24} className={styles.balanceIcon} />
          </div>
          <h1>${balanceData?.income?.toLocaleString()}</h1>
        </div>
        <div className={styles.balanceChange}>
          <span className={styles.positive}>
            <TrendingUp size={16} />
            +{balanceData?.balanceChangePercent}% from last month
          </span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Income"
          amount={`$${balanceData?.income?.toLocaleString()}`}
          change={`${balanceData?.incomeChangePercent}%`}
          icon={<TrendingUp size={20} color="#34D399" />}
          iconBg="rgba(52, 211, 153, 0.1)"
        />
        <StatCard
          title="Expenses"
          amount={`$${balanceData?.totalExpense?.toLocaleString()}`}
          change={`${balanceData?.expenseChangePercent}%`}
          icon={<TrendingUp size={20} color="#EF4444" />}
          iconBg="rgba(239, 68, 68, 0.1)"
          isNegative
        />
        <StatCard
          title="Savings"
          amount={`$${balanceData?.savings?.toLocaleString()}`}
          change={`${balanceData?.savingsChangePercent}%`}
          icon={<DollarSign size={20} color="#3B82F6" />}
          iconBg="rgba(59, 130, 246, 0.1)"
        />
      </div>
    </section>
  );
};

export default BalanceSummary;
