import { useState } from "react";
import styles from "../styles/transaction.module.css";

const TransactionForm = ({ onAddTransaction, categories }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.amount || !formData.category || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    onAddTransaction({
      ...formData,
      amount: Number.parseFloat(formData.amount),
    });

    // Reset form
    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    // Collapse form on mobile after submission
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.formCard} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.formHeader} onClick={toggleForm}>
        <h2>Add New Transaction</h2>
        <button className={styles.toggleButton}>{isExpanded ? "−" : "+"}</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.transactionForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Type</label>
            <div className={styles.typeSelector}>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.type === "expense" ? styles.active : ""} ${styles.expenseButton}`}
                onClick={() => setFormData({ ...formData, type: "expense", category: "" })}
              >
                Expense
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.type === "income" ? styles.active : ""} ${styles.incomeButton}`}
                onClick={() => setFormData({ ...formData, type: "income", category: "" })}
              >
                Income
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={styles.formSelect}
            >
              <option value="">Select Category</option>
              {categories[formData.type]?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
