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
  variant = 'default', // 테이블 변형 (default, compact, wide 등)
  showRowNumbers = false, // 행 번호 표시 여부
  hoverEffect = true, // 호버 효과 여부
  striped = false, // 줄무늬 효과 여부
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

  // 테이블 클래스명 동적 생성
  const tableClassName = `${styles.tableContainer} ${className} ${styles[variant] || ''}`;
  const tableClass = `${styles.table} ${styles[`table_${variant}`] || ''}`;
  const rowClass = `${styles.row} ${onRowClick ? styles.clickable : ''} ${hoverEffect ? styles.hoverable : ''} ${striped ? styles.striped : ''}`;

  // 디버깅 로그 추가
  console.log('Table 컴포넌트 렌더링:', {
    rowsLength: rows?.length,
    pagination,
    page,
    rowsPerPage,
    totalRows,
    totalPages,
    variant,
    showRowNumbers
  });

  return (
    <div className={tableClassName} {...props}>
      <table className={tableClass}>
        <thead>
          <tr className={styles.headerRow}>
            {showRowNumbers && (
              <th className={styles.headerCell} style={{ width: '50px', textAlign: 'center' }}>
                #
              </th>
            )}
            {columns.map(column => (
              <th 
                key={column.id} 
                className={styles.headerCell}
                style={{ 
                  textAlign: column.align || 'left',
                  width: column.width || 'auto',
                  padding: column.padding || '16px'
                }}
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
                className={rowClass}
                onClick={() => handleRowClick(row)}
              >
                {showRowNumbers && (
                  <td className={styles.cell} style={{ width: '50px', textAlign: 'center' }}>
                    {page * rowsPerPage + index + 1}
                  </td>
                )}
                {columns.map(column => (
                  <td 
                    key={column.id} 
                    className={styles.cell}
                    style={{ 
                      textAlign: column.align || 'left',
                      width: column.width || 'auto',
                      padding: column.padding || '16px'
                    }}
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
              <td colSpan={showRowNumbers ? columns.length + 1 : columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                데이터가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`}
          </div>
          <div className={styles.paginationControls}>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

