"use client";
import styles from "../styles/budget.module.css";

const BudgetCategoryCard = (props) => {
  const { category, onEdit, onDelete, categoryIcons } = props;
  const { name, allocated, spent } = category;

  // Calculate progress percentage
  const progress = (spent / allocated) * 100;

  // Determine status color based on progress
  const getStatusColor = () => {
    if (progress >= 100) return styles.danger;
    if (progress >= 85) return styles.warning;
    return styles.success;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Define category icons
  const categoryIconsMap = {
    Rent: "🏠",
    Food: "🍽️",
    Transport: "🚗",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Utilities: "⚡",
    Healthcare: "❤️",
    Education: "📚",
    Savings: "🐷",
    Other: "📦",
  };

  // Get icon based on category name
  const icon = categoryIconsMap[name] || "📊"; // Default icon if not found

  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryIcon}>{icon}</div>
        <div className={styles.categoryTitle}>
          <h3>{name}</h3>
          <div className={styles.categoryActions}>
            <button className={styles.editButton} onClick={onEdit} aria-label={`Edit ${name} budget`}>
              Edit
            </button>
            <button className={styles.deleteButton} onClick={onDelete} aria-label={`Delete ${name} budget`}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className={styles.categoryContent}>
        <div className={styles.budgetInfo}>
          <div className={styles.budgetAmount}>
            <span className={styles.amountLabel}>Budget</span>
            <span className={styles.amountValue}>{formatCurrency(allocated)}</span>
          </div>
          <div className={styles.spentAmount}>
            <span className={styles.amountLabel}>Spent</span>
            <span className={styles.amountValue}>{formatCurrency(spent)}</span>
          </div>
        </div>

        <div className={styles.categoryProgress}>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${getStatusColor()}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.remaining}>
              {spent > allocated ? (
                <span className={styles.negative}>Exceeded by {formatCurrency(spent - allocated)}</span>
              ) : (
                <span>{formatCurrency(allocated - spent)} left</span>
              )}
            </span>
            <span className={`${styles.percentage} ${getStatusColor()}`}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCategoryCard;
