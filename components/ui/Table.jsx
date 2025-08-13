import styles from './Table.module.css';

export default function Table({ 
  columns, 
  rows, 
  onRowClick,
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  className = '',
  ...props 
}) {
  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const paginatedRows = pagination 
    ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    : rows;

  return (
    <div className={`${styles.tableContainer} ${className}`} {...props}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map(column => (
              <th 
                key={column.id} 
                className={styles.headerCell}
                style={{ textAlign: column.align || 'left' }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <tr 
              key={index} 
              className={`${styles.row} ${onRowClick ? styles.clickable : ''}`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map(column => (
                <td 
                  key={column.id} 
                  className={styles.cell}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, rows.length)} of ${rows.length}`}
          </div>
          <div className={styles.paginationControls}>
            <button 
              className={styles.paginationButton}
              disabled={page === 0}
              onClick={() => onPageChange?.(page - 1)}
            >
              Previous
            </button>
            <button 
              className={styles.paginationButton}
              disabled={(page + 1) * rowsPerPage >= rows.length}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

