"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Wallet, Home, BarChart3, CreditCard, PieChart, Calendar, User, Settings, X, Zap 
} from "lucide-react";
import styles from "../styles/dashboard.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Get current route for active state

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", route: "/dashboard" },
    { id: "analytics", icon: BarChart3, label: "Analytics", route: "/analytics" },
    { id: "transactions", icon: CreditCard, label: "Transactions", route: "/transactions" },
    { id: "budgets", icon: PieChart, label: "Budgets", route: "/budgets" },
    { id: "calendar", icon: Calendar, label: "Calendar", route: "/calendar" },
    { id: "profile", icon: User, label: "Profile", route: "/profile" },
    { id: "settings", icon: Settings, label: "Settings", route: "/settings" },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <Wallet size={24} className={styles.logoIcon} />
          <h2 className={styles.logo}>FinanceTrack</h2>
        </div>
        <button className={styles.closeButton} onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className={location.pathname === item.route ? styles.active : ""}>
              <Link to={item.route} onClick={toggleSidebar}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.upgradeCard}>
          <Zap size={20} className={styles.upgradeIcon} />
          <div>
            <h3>Upgrade to Pro</h3>
            <p>Get more features</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
