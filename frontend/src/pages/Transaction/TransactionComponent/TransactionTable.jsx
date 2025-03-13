"use client"
import styles from "../styles/transaction.module.css";
import { useState } from "react";

const TransactionTable = ({ transactions, onEdit, onDelete, sortConfig, requestSort }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`container-fluid ${styles.tableContainer}`}>
      {transactions.length > 0 ? (
        <div className="table-responsive">
          <table className={`table ${styles.transactionsTable}`}>
            <thead>
              <tr>
                <th onClick={() => requestSort("date")} className={styles.sortable}>
                  Date {getSortIndicator("date")}
                </th>
                <th onClick={() => requestSort("type")} className={styles.sortable}>
                  Type {getSortIndicator("type")}
                </th>
                <th onClick={() => requestSort("category")} className={styles.sortable}>
                  Category {getSortIndicator("category")}
                </th>
                <th onClick={() => requestSort("description")} className={styles.sortable}>
                  Description {getSortIndicator("description")}
                </th>
                <th onClick={() => requestSort("amount")} className={styles.sortable}>
                  Amount {getSortIndicator("amount")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className={
                    transaction.type === "income" ? styles.incomeRow : styles.expenseRow
                  }
                >
                  <td>{formatDate(transaction.date)}</td>
                  <td>
                    <span
                      className={
                        transaction.type === "income" ? styles.incomeTag : styles.expenseTag
                      }
                    >
                      {transaction.type === "income" ? "Income" : "Expense"}
                    </span>
                  </td>
                  <td>{transaction.category}</td>
                  <td className={styles.descriptionCell}>{transaction.description}</td>
                  <td
                    className={
                      transaction.type === "income" ? styles.incomeAmount : styles.expenseAmount
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                  <td className={styles.actionCell}>
                    <button
                      className={`btn btn-primary ${styles.editButton}`}
                      onClick={() => onEdit(transaction)}
                      aria-label="Edit transaction"
                    >
                      Edit
                    </button>
                    <button
                      className={`btn btn-danger ${styles.deleteButton}`}
                      onClick={() => onDelete(transaction.id)}
                      aria-label="Delete transaction"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.noTransactions}>
          <p>No transactions to display.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
