import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "../styles/dashboard.module.css";

const Layout = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={styles.main}>
        <Header toggleSidebar={toggleSidebar} />
        <div className={styles.dashboardContent}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
