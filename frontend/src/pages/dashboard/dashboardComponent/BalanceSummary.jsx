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

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
        setBalanceData(response.data);
      } catch (err) {
        setError("Failed to load balance data");
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, [token]);

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
          <h1>${balanceData?.income?.toFixed(2)}</h1>
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
          amount={`$${balanceData?.income?.toFixed(2)}`}
          change={`+${balanceData?.incomeChangePercent}%`}
          icon={<TrendingUp size={20} color="#34D399" />}
          iconBg="rgba(52, 211, 153, 0.1)"
        />
        <StatCard
          title="Expenses"
          amount={`$${balanceData?.totalExpense?.toFixed(2)}`}
          change={`+${balanceData?.expenseChangePercent}%`}
          icon={<TrendingUp size={20} color="#EF4444" />}
          iconBg="rgba(239, 68, 68, 0.1)"
          isNegative
        />
        <StatCard
          title="Savings"
          amount={`$${balanceData?.savings?.toFixed(2)}`}
          change={`+${balanceData?.savingsChangePercent}%`}
          icon={<DollarSign size={20} color="#3B82F6" />}
          iconBg="rgba(59, 130, 246, 0.1)"
        />
      </div>
    </section>
  );
};

export default BalanceSummary;
