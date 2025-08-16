'use client';
import { useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import styles from './baseTableList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from '@/node_modules/next/link';

import { useAppSelector } from '@/redux/hooks';
import Grid from '@/components/ui/Grid';

export default function BaseTableList(props) {
  const userId = useAppSelector(state => state.user.id);
  const { 
    columns, 
    rows, 
    onRowClick, 
    useUrl, 
    disabledWrite, 
    pagination, 
    onPageChange, 
    loading,
    variant = 'default',
    showRowNumbers = false,
    hoverEffect = true,
    striped = false
  } = props;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);

  // 부모 컴포넌트의 페이지 상태와 동기화 (0부터 시작하는 인덱스로 변환)
  const currentPage = (pagination?.page || 1) - 1;

  // 디버깅 로그
  console.log('BaseTableList props:', {
    rowsLength: rows?.length,
    pagination,
    currentPage,
    loading,
    dataLoaded: rows?.length > 0,
    variant,
    showRowNumbers,
    hoverEffect,
    striped
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangePage = (newPage) => {
    console.log('BaseTableList handleChangePage 호출 - newPage:', newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  const rowClick = (rowData) => {
    console.log('BaseTableList rowClick:', rowData);
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  return !mounted ? (
    'loading....'
  ) : (
    <>
      <Grid container>
        <Grid xs={0} lg={2}></Grid>
        <Grid xs={12} lg={8} className={styles['create_wrap']}>
          <div className={styles.tableWrapper}>
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
              variant={variant}
              showRowNumbers={showRowNumbers}
              hoverEffect={hoverEffect}
              striped={striped}
            />
          </div>
        </Grid>
        <Grid xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
}
