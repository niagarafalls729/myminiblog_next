'use client';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './guestBook.module.css';
import CreateIcon from '@mui/icons-material/Create';
import Link from '@/node_modules/next/link';

const columns = [
  { id: 'index', label: ' ', minWidth: 5, align: 'left' },
  { id: 'title', label: '제목', align: 'center' },
  { id: 'id', label: '작성자', align: 'center' },
  {
    id: 'created',
    label: '작성일',
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(index, title, id, created) {
  return { index, title, id, created };
}

const rows = [createData('1', 'IN', '김지수', '2023 - 10 - 23')];

export default function guestBook() {
  const [selectedRow, setSelectedRow] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    console.log('selectedRow', selectedRow);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} className="myTable">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
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
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => setSelectedRow(row.name)}
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
          rowsPerPageOptions={false}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
        <Link href="guestBook/create">
          <CreateIcon
            color="primary"
            className={styles['tablePagination_left']}
          />
        </Link>
      </Paper>
    </>
  );
}
