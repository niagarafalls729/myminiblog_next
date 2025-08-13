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
  const { columns, rows, onRowClick, useUrl, disabledWrite } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rowClick = e => {
    console.log('e', e.index);
    onRowClick(e.index);
  };

  return !mounted ? (
    'loading....'
  ) : (
    <>
      <Grid container>
        <Grid xs={0} lg={2}></Grid>
        <Grid xs={12} lg={8} className={styles['create_wrap']}>
          <div className={styles.tableWrapper}>
            <Table 
              columns={columns}
              rows={rows}
              onRowClick={rowClick}
              pagination={true}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {(!disabledWrite || (disabledWrite && userId === 'admin')) && (
              <Link href={`/${useUrl}/create`} className={styles.createButton}>
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            )}
          </div>
        </Grid>
        <Grid xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
}
