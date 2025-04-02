"use client"
import BudgetCategoryCard from "./BudgetCategoryCard";
import styles from "../styles/budget.module.css";

const BudgetCategoryList = (props) => {
  const { categories, onEdit, onDelete , categoryIcons } = props;

 
  console.log("in BudgetCategoryList" , categories);


  // If no categories, show empty state
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
          categoryIcons={categoryIcons}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category._id)}
        />
      ))}
    </div>
  );
};

export default BudgetCategoryList;
