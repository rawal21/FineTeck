import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../dashboard/dashboardComponent/Layout";
import TransactionForm from "./TransactionComponent/TransactionForm";
import TransactionFilters from "./TransactionComponent/TransactionFilter";
import TransactionTable from "./TransactionComponent/TransactionTable";
import EditTransactionModal from "./TransactionComponent/EditTransactionModel";
import Pagination from "./TransactionComponent/Pagination";

import styles from "./styles/transaction.module.css";

const categories = {
  income: ["Salary", "Freelance", "Gift", "Dividend", "Bonus", "Other"],
  expense: ["Food", "Shopping", "Transport", "Entertainment", "Utilities", "Health", "savinga","Other"],
};

export default function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    type: "",
    amountMin: "",
    amountMax: "",
    search: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/transaction/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("data is coming on transaction page" , response.data)
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...transactions];

    if (filters.dateFrom) {
      result = result.filter((item) => item.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((item) => item.date <= filters.dateTo);
    }
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }
    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }
    if (filters.amountMin) {
      result = result.filter((item) => item.amount >= Number.parseFloat(filters.amountMin));
    }
    if (filters.amountMax) {
      result = result.filter((item) => item.amount <= Number.parseFloat(filters.amountMax));
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.description.toLowerCase().includes(searchLower) || item.category.toLowerCase().includes(searchLower)
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredTransactions(result);
    setCurrentPage(1);
  }, [transactions, filters, sortConfig]);

  // Handle adding a new transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/transaction/add", newTransaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions([response.data, ...transactions]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Handle editing a transaction
  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Save edited transaction
  const handleSaveEdit = async (editedTransaction) => {
    try {

      console.log("transaction id" , editedTransaction._id)
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/transaction/edit/${editedTransaction._id}`, editedTransaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(transactions.map((t) => (t._id === editedTransaction._id ? editedTransaction : t)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = async (id) => {
    
     console.log("this is the log for the delete the item id " , id);
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/transaction/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(transactions.filter((t) => t._id !== id));
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className={styles.transactionsContainer}>
        <div className={styles.pageHeader}>
          <h1>Transactions Management</h1>
          <p>Manage your income and expenses</p>
        </div>

        <TransactionForm onAddTransaction={handleAddTransaction} categories={categories} />

        <div className={styles.transactionsContent}>
          <TransactionFilters filters={filters} onFilterChange={handleFilterChange} categories={categories} />

          <div className={styles.transactionsTableWrapper}>
            <div className={styles.tableHeader}>
              <h2>Transaction History</h2>
              <div className={styles.tableStats}>
                <span>Total: {filteredTransactions.length} transactions</span>
                <span className={styles.divider}></span>
                <span>
                  Balance: $
                  {filteredTransactions
                    .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>

            <TransactionTable
              transactions={currentTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />

            {filteredTransactions.length > 0 ? (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
            ) : (
              <div className={styles.noTransactions}>No transactions found</div>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditTransactionModal
          transaction={currentTransaction}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
          categories={categories}
        />
      )}
    </Layout>
  );
}

