'use client';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './baseTableList.module.css';
import CreateIcon from '@mui/icons-material/Create';
import Link from '@/node_modules/next/link';

import { useAppSelector } from '@/redux/hooks';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

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
          <Paper sx={{ width: '100%', overflow: 'hidden' }} className="myTable">
            <TableContainer sx={{ maxHeight: 700 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, idx) => (
                      <TableCell
                        key={column.id + idx}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          width: column.minWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id + idx}
                          onClick={() => rowClick(row)}
                        >
                          {columns.map(column => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={styles['tablePagination_right']}
              rowsPerPageOptions={(0, '')}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />

            {(!disabledWrite || (disabledWrite && userId === 'admin')) && (
              <Link href={`/${useUrl}/create`}>
                <CreateIcon
                  color="primary"
                  className={styles['tablePagination_left']}
                />
              </Link>
            )}
          </Paper>
        </Grid>
        <Grid xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
}
