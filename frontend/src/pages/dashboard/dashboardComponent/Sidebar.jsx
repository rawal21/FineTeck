"use client";

import React from "react";
import { Wallet, Home, BarChart3, CreditCard, PieChart, Calendar, User, Settings, X, Zap } from "lucide-react";
import styles from "../styles/dashboard.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          <li className={styles.active}>
            <a href="#">
              <Home size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <CreditCard size={20} />
              <span>Transactions</span>
            </a>
          </li>
          <li>
            <a href="#">
              <PieChart size={20} />
              <span>Budgets</span>
            </a>
          </li>
          <li>
            <a href="#">
              <Calendar size={20} />
              <span>Calendar</span>
            </a>
          </li>
          <li>
            <a href="#">
              <User size={20} />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="#">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </li>
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
