"use client"
import styles from  "../styles/transaction.module.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Show dots if current page is > 3
      if (currentPage > 3) {
        pageNumbers.push("...")
      }

      // Show current page and surrounding pages
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Show dots if current page is < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.pageButton} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      <div className={styles.pageNumbers}>
        {getPageNumbers().map((number, index) =>
          number === "..." ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={number}
              className={`${styles.pageNumber} ${currentPage === number ? styles.active : ""}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ),
        )}
      </div>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

