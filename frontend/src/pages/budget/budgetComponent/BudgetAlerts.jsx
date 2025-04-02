"use client"

import { useState } from "react";
import styles from "../styles/budget.module.css";

const BudgetAlerts = (props) => {
  const { alerts, unreadCount, onMarkRead, onDismiss } = props;
  const [isExpanded, setIsExpanded] = useState(false);

   console.log("alerts in alerts Component " , alerts)

  // Format date
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get alert icon based on type
  const getAlertIcon = (type) => {
    const icons = {
      warning: "⚠️",
      success: "✅",
      info: "ℹ️",
    };
    return icons[type] || "📌";
  };

  // Get alert class based on type
  const getAlertClass = (type) => {
    const classes = {
      warning: styles.warningAlert,
      success: styles.successAlert,
      info: styles.infoAlert,
    };
    return classes[type] || "";
  };

  return (
    <div className={`${styles.alertsCard} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.alertsHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <h2>Alerts & Notifications</h2>
        {unreadCount > 0 && <span className={styles.alertBadge}>{unreadCount}</span>}
        <button className={styles.toggleButton}>{isExpanded ? "−" : "+"}</button>
      </div>

      <div className={styles.alertsList}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`${styles.alertItem} ${!alert.read ? styles.unread : ""} ${getAlertClass(alert.type)}`}
            >
              <div className={styles.alertIcon}>{getAlertIcon(alert.type)}</div>
              <div className={styles.alertContent}>
                <div className={styles.alertHeader}>
                  <span className={styles.alertCategory}>{alert.category}</span>
                  <span className={styles.alertDate}>{formatDate(alert.date)}</span>
                </div>
                <p className={styles.alertMessage}>{alert.message}</p>
              </div>
              <div className={styles.alertActions}>
                {!alert.read && (
                  <button
                    className={styles.markReadButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkRead(alert.id);
                    }}
                    aria-label="Mark as read"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  className={styles.dismissButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(alert.id);
                  }}
                  aria-label="Dismiss alert"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noAlerts}>
            <p>No alerts or notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetAlerts;
