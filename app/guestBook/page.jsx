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
import styles from './guestBook.module.css';
import CreateIcon from '@mui/icons-material/Create';
import Link from '@/node_modules/next/link';
import { axiosGet } from '@/api/baseGet';
import { useRouter } from 'next/navigation';

export default function guestBook() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const columns = [
    // { id: 'index', label: 'No.', minWidth: 5, align: 'left' },
    { id: 'title', label: '제목', align: 'center' },
    { id: 'id', label: '작성자', align: 'right' },
    {
      id: 'created',
      label: '작성일',
      align: 'right',
      // format: (value) => value.toFixed(2),
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook');
      // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      const dataRows = res.map(e =>
        createData(e.index, e.title, e.id, e.creation_timestamp)
      );
      setRows(dataRows);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  function createData(index, title, id, created) {
    return { index, title, id, created };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rowClick = e => {
    console.log('e', e);
    router.push('/guestBook/detail/' + e.index);
  };

  return !mounted ? (
    'loading....'
  ) : (
    <>
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
        <Link href="components/create/guestBook">
          <CreateIcon
            color="primary"
            className={styles['tablePagination_left']}
          />
        </Link>
      </Paper>
    </>
  );
}
