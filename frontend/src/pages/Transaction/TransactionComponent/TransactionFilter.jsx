"use client"

import { useState } from "react"
import styles from  "../styles/transaction.module.css"

const TransactionFilters = ({ filters, onFilterChange, categories }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange({ [name]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      dateFrom: "",
      dateTo: "",
      category: "",
      type: "",
      amountMin: "",
      amountMax: "",
      search: "",
    })
  }

  const toggleFilters = () => {
    setIsExpanded(!isExpanded)
  }

  // Combine all categories for the filter dropdown
  const allCategories = [...new Set([...categories.income, ...categories.expense])]

  return (
    <div className={`${styles.filtersCard} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.filtersHeader} onClick={toggleFilters}>
        <h3>Filters</h3>
        <button className={styles.toggleButton}>{isExpanded ? "−" : "+"}</button>
      </div>

      <div className={styles.filtersContent}>
        <div className={styles.searchBar}>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search transactions..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroups}>
          <div className={styles.filterGroup}>
            <h4>Date Range</h4>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <label>From</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleChange}
                  className={styles.filterInput}
                />
              </div>
              <div className={styles.filterItem}>
                <label>To</label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleChange}
                  className={styles.filterInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4>Transaction Type</h4>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <select name="type" value={filters.type} onChange={handleChange} className={styles.filterSelect}>
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className={styles.filterItem}>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className={styles.filterSelect}
                >
                  <option value="">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4>Amount Range</h4>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <label>Min ($)</label>
                <input
                  type="number"
                  name="amountMin"
                  value={filters.amountMin}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={styles.filterInput}
                />
              </div>
              <div className={styles.filterItem}>
                <label>Max ($)</label>
                <input
                  type="number"
                  name="amountMax"
                  value={filters.amountMax}
                  onChange={handleChange}
                  placeholder="9999"
                  min="0"
                  step="0.01"
                  className={styles.filterInput}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionFilters

