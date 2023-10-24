"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "./myStudy.module.css";
import CreateIcon from "@mui/icons-material/Create";
import Link from "@/node_modules/next/link";
const columns = [
  { id: "index", label: " ", minWidth: 5, align: "left" },
  { id: "title", label: "제목", align: "center", minWidth: 170 },

  {
    id: "created",
    label: "작성일",
    minWidth: 100,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

function createData(index, title, name, created) {
  return { index, title, name, created };
}

const rows = [
  createData("1", "IN", "김지수", "2023 - 10 - 23"),
  createData("2", "CN", 1403500365, 9596961),
  createData("3", "IT", 60483973, 301340),
  createData("4", "US", 327167434, 9833520),
];

export function StickyHeadTable() {
  const [selectedRow, setSelectedRow] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    console.log("selectedRow", selectedRow);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="myTable">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => setSelectedRow(row.name)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
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
          className={styles["tablePagination_right"]}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Link href="myStudy/created">
          <CreateIcon
            color="primary"
            className={styles["tablePagination_left"]}
          />
        </Link>
      </Paper>
    </>
  );
}

export default function myStudy() {
  return (
    <>
      <StickyHeadTable></StickyHeadTable>
    </>
  );
}
