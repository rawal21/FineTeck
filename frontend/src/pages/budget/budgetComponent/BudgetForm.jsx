"use client";
import { useState, useEffect } from "react";
import BudgetCategoryCard from "./BudgetCategoryCard";
import styles from "../styles/budget.module.css";

const BudgetCategoryList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📊</div>
        <h3>No budget categories found</h3>
        <p>Add a new budget category to start tracking your spending</p>
      </div>
    );
  }

  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <BudgetCategoryCard
          key={category._id}
          category={category}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category._id)}
        />
      ))}
    </div>
  );
};

const BudgetForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    allocated : 0, // Initialize as a number
    spent : 0 , // Initialize as a number
  });

  // Populate form data when editing a category
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        allocated: category.allocated, // Keep as a number
        spent: category.spent || 0, // Ensure spent is a number
      });
    }
  }, [category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" ? value : Number(value), // Convert to number for allocated and spent
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || isNaN(formData.allocated) || isNaN(formData.spent)) {
      alert("Please fill in all required fields with valid numbers");
      return;
    }

    // Pass the formatted data to the onSave function
    onSave({
      ...formData,
      allocated: Number(formData.allocated),
      spent: Number(formData.spent),
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{category ? "Edit Budget Category" : "Add Budget Category"}</h2>
          <button className={styles.closeButton} onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.budgetForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Housing, Food, Transportation"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="allocated">Monthly Budget Amount ($)</label>
            <input
              type="number"
              id="allocated"
              name="allocated"
              value={formData.allocated}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="1"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="spent">Amount Spent ($)</label>
            <input
              type="number"
              id="spent"
              name="spent"
              value={formData.spent}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="1"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              {category ? "Update Budget" : "Add Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { BudgetCategoryList, BudgetForm };