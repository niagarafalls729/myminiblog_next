'use client';
import { useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import styles from './guestBookTable.module.css';

export default function GuestBookTable({ 
  columns, 
  rows, 
  onRowClick, 
  pagination, 
  onPageChange, 
  loading 
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);

  const currentPage = (pagination?.page || 1) - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangePage = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  const rowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  return !mounted ? (
    'loading....'
  ) : (
    <div className={styles.guestBookTableContainer}>
      {loading && <div className={styles.loading}>로딩 중...</div>}
      <Table 
        columns={columns}
        rows={rows}
        onRowClick={rowClick}
        pagination={true}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalRows={pagination?.total || 0}
        totalPages={pagination?.totalPages || 0}
        variant="minimal"
        hoverEffect={true}
        striped={false}
        className={styles.guestBookTable}
      />
    </div>
  );
}

