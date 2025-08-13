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
  totalRows = 0,
  totalPages = 0,
  className = '',
  ...props 
}) {
  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const handlePageChange = (newPage) => {
    console.log('Table handlePageChange 호출 - newPage:', newPage, 'current page:', page);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // 서버 사이드 페이지네이션을 사용하므로 클라이언트 사이드 슬라이싱 제거
  // const paginatedRows = pagination 
  //   ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  //   : rows;

  // 디버깅 로그 추가
  console.log('Table 컴포넌트 렌더링:', {
    rowsLength: rows?.length,
    pagination,
    page,
    rowsPerPage,
    // paginatedRowsLength: paginatedRows?.length,
    totalRows,
    totalPages
  });

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
          {rows && rows.length > 0 ? (
            rows.map((row, index) => (
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
                    {column.id === 'CONTENT' ? (
                      <div dangerouslySetInnerHTML={{ __html: row[column.id] }} />
                    ) : (
                      row[column.id]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                데이터가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            {totalRows > 0 ? (
              `${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`
            ) : (
              '데이터가 없습니다'
            )}
          </div>
          <div className={styles.paginationControls}>
            <button 
              className={styles.paginationButton}
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button 
              className={styles.paginationButton}
              disabled={(page + 1) * rowsPerPage >= totalRows}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

