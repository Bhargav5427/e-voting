import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable({
  columns,
  rows,
  onDelete,
  onUpdate,
  height,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change in pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle delete action
  const handleDelete = (id) => {
    onDelete(id);
  };

  // Handle update action
  const handleUpdate = (id) => {
    onUpdate(id);
  };

  return (
    <Paper
      sx={{ maxWidth: "97%", overflow: "hidden", border: "1px solid #d7d7d7" }}
    >
      <TableContainer sx={{ maxHeight: height }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Render table header */}
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {/* Action column */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render table rows */}
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column, colIndex) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={colIndex} align={column.align}>
                        {/* Render table cell */}
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : column.id === "img" ? (
                          // Render image if column id is "img"
                          <img
                            src={value}
                            alt="Image"
                            style={{ width: "100px", height: "100px" }}
                          />
                        ) : (
                          // Otherwise, render text value
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  {/* Action buttons */}
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleUpdate(row.id)} // Pass id to handleUpdate
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)} // Pass id to handleDelete
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
