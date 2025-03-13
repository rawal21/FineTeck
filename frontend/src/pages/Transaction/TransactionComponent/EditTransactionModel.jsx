"use client"

import { useState, useEffect } from "react"
import styles from  "../styles/transaction.module.css"

const EditTransactionModal = ({ transaction, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...transaction })

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.amount || !formData.category || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    onSave({
      ...formData,
      amount: Number.parseFloat(formData.amount),
    })
  }

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <h2>Edit Transaction</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
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
              <label htmlFor="edit-amount">Amount ($)</label>
              <input
                type="number"
                id="edit-amount"
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
              <label htmlFor="edit-category">Category</label>
              <select
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={styles.formSelect}
              >
                <option value="">Select Category</option>
                {categories[formData.type].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="edit-date">Date</label>
              <input
                type="date"
                id="edit-date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-description">Description</label>
            <input
              type="text"
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTransactionModal

