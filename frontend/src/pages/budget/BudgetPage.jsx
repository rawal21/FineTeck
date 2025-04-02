import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../dashboard/dashboardComponent/Layout";
import BudgetAlerts from "./budgetComponent/BudgetAlerts";
import { BudgetForm } from "./budgetComponent/BudgetForm";
import BudgetOverview from "./budgetComponent/BudgetOverview";
import BudgetCategoryList from "./budgetComponent/BudgetCategoryList";

import styles from "./styles/budget.module.css";

export default function BudgetPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [budget, setBudget] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [currentMonth] = useState(new Date().toLocaleString("default", { month: "long", year: "numeric" }));
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [view, setView] = useState("all");

  useEffect(() => {
    fetchBudget();
    fetchAlerts();
  }, []);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchBudget = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/budgets/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Budget data fetched:", response.data);
      setBudget(response.data);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/budgets/${userId}/expanse`, {
        headers: { Authorization: `Bearer ${token}` },
      });

       console.log("alerts" , response.data.alerts);
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const handleSaveCategory = async (categoryData) => {

    let response ;
    try {

      if(editingCategory){
      const updatedCategories = editingCategory
        ? budget.categories.map((cat) => (cat._id === editingCategory._id ? categoryData : cat))
        : [...budget.categories, categoryData];
  
      await axios.put(`http://localhost:5000/api/budgets/edit/${editingCategory._id}`, 
        // { categories: updatedCategories , monthlyBudget : totalBudget }, 
        { name: categoryData.name ,allocated: categoryData.allocated, spent: categoryData.spent ,monthlyBudget : totalBudget }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      } else {
        // Create new category (Fixed incorrect POST request)
        response = await axios.post(
          `http://localhost:5000/api/budgets/${userId}`, 
          {
            name: categoryData.name,
            allocated: categoryData.allocated,
            spent: categoryData.spent, // Fixed typo
            monthlyBudget: totalBudget,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
       
      if(response.status == 200 || response.status == 201){
      await fetchBudget();
      setIsFormVisible(false);
      setEditingCategory(null);

      }
    } catch (error) {
      console.error("Error saving budget category:", error);
    }
  
  };
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this budget category?")) {
      try {
        const updatedCategories = budget.categories.filter((category) => category._id !== categoryId);
  
        await axios.delete(`http://localhost:5000/api/budgets/${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { categories: updatedCategories } // Move data inside config
        });
  
        alert("Delete successful");
        await fetchBudget(); // Refresh UI
      } catch (error) {
        console.error("Error deleting budget category:", error);
      }
    }
  };
  ;
  const handleMarkAlertRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/budget/alerts/${id}/read`);
      fetchAlerts();
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
  };

  const handleDismissAlert = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budget/alerts/${id}`);
      fetchAlerts();
    } catch (error) {
      console.error("Error dismissing alert:", error);
    }
  };

  const filteredCategories = () => {
    if (!budget?.categories) return [];
  
    switch (view) {
      case "exceeded":
        return budget.categories.filter((category) => (category.spent || 0) >= (category.allocated || 0));
      case "normal":
        return budget.categories.filter((category) => (category.spent || 0) <= (category.allocated || 0));
      default:
        return budget.categories;
    }
  };
   
  const monthlyBudget = budget?.categories?.reduce((sum , category)=> sum+(category.allocated || 0), 0) || 0;
  const unreadAlertsCount = alerts.filter((alert) => !alert.read).length;
  const totalBudget = monthlyBudget;
  const totalSpent = budget?.categories?.reduce((sum, category) => sum + (category.spent || 0), 0) || 0;
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}>
      <div className={styles.budgetContainer}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Budget Planning</h1>
            <p>Manage your monthly budgets and track spending</p>
          </div>
          <div className={styles.monthSelector}>
            <span>{currentMonth}</span>
          </div>
        </div>

        <div className={styles.budgetContent}>
          <div className={styles.budgetOverviewSection}>
            <BudgetOverview
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              remainingBudget={remainingBudget}
              budgetProgress={budgetProgress}
            />

            <BudgetAlerts
              alerts={alerts}
              unreadCount={unreadAlertsCount}
              onMarkRead={handleMarkAlertRead}
              onDismiss={handleDismissAlert}
            />
          </div>

          <div className={styles.budgetCategoriesSection}>
            <div className={styles.sectionHeader}>
              <h2>Budget Categories</h2>
              <div className={styles.categoryActions}>
                <div className={styles.viewSelector}>
                  <button className={`${styles.viewButton} ${view === "all" ? styles.active : ""}`} onClick={() => setView("all")}>All</button>
                  <button className={`${styles.viewButton} ${view === "exceeded" ? styles.active : ""}`} onClick={() => setView("exceeded")}>Exceeded</button>
                  <button className={`${styles.viewButton} ${view === "normal" ? styles.active : ""}`} onClick={() => setView("normal")}>Normal</button>
                </div>
                <button className={styles.addButton} onClick={() => { setEditingCategory(null); setIsFormVisible(true); }}>
                  + Add Budget
                </button>
              </div>
            </div>

            <BudgetCategoryList
              categories={filteredCategories()}
              onEdit={(category) => { setEditingCategory(category); setIsFormVisible(true); }}
              onDelete={handleDeleteCategory}
            />
          </div>
        </div>
      </div>
      {isFormVisible && <BudgetForm category={editingCategory} onSave={handleSaveCategory} onCancel={() => { setIsFormVisible(false); setEditingCategory(null); }} />}
    </Layout>
  );
}
