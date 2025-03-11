"use client";

import React, { useEffect, useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import styles from "../styles/dashboard.module.css";

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  console.log("User in header:", user); // Check if user is parsed correctly

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1>Dashboard</h1>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.searchContainer}>
          <Search size={18} />
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </div>
        <button className={styles.notificationButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>
        <div className={styles.userProfile}>
          <img src="/placeholder.svg?height=40&width=40" alt="User" className={styles.userAvatar} />
          <span className={styles.userName}>
            {user?.split(" ")[0] || "Guest"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
