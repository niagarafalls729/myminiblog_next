import styles from './Table.module.css';
import { useEffect, useState } from 'react';

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
  searchValue = '',
  onSearch = null,
  ...props 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    showRowNumbers,
    isMobile
  });

  // 모바일 카드 렌더링
  if (isMobile) {
    return (
      <div className={tableClassName} {...props}>
        <div className={styles.mobileCards}>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => (
              <div 
                key={index} 
                className={`${styles.mobileCard} ${onRowClick ? styles.clickable : ''} ${hoverEffect ? styles.hoverable : ''}`}
                onClick={() => handleRowClick(row)}
              >
                {/* 제목 (첫 번째 컬럼) */}
                <div className={styles.cardTitle}>
                  {row[columns[0].id]}
                </div>
                
                {/* 메타데이터 (나머지 컬럼들) */}
                <div className={styles.cardMeta}>
                  {columns.slice(1).map(column => (
                    <span key={column.id} className={styles.metaItem}>
                      {column.label}: {row[column.id]}
                    </span>
                  ))}
                </div>
                
                {/* 우측 상단 숫자 (댓글 수 등) */}
                {row.COMMENT_COUNT > 0 && (
                  <div className={styles.cardNumber}>
                    {row.COMMENT_COUNT}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.noData}>데이터가 없습니다</div>
          )}
        </div>
        
        {pagination && (
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`}
            </div>
            {onSearch && (
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="제목 검색..."
                  value={searchValue}
                  onChange={(e) => onSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            )}
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

  // 데스크톱 테이블 렌더링
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
          {onSearch && (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="제목 검색..."
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}
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

