import styles from "../Analytics.module.css"

const ProgressItem = ({ label, value, percentage, variant = "info" }) => (
  <div className={styles.categoryItem}>
    <div className={styles.categoryHeader}>
      <span>{label}</span>
      <span className={styles[`${variant}Budget`]}>{value}</span>
    </div>
    <div className="progress">
      <div
        className={`progress-bar bg-${variant}`}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
    <div className={styles.categoryDetails}>{value}</div>
  </div>
)

export default ProgressItem