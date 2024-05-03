import { Box, Grid } from '@mui/material'
import React from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import DataTable from '../../Atoms/DataTable';
import AddButton from '../../Atoms/Button';

const User = () => {

  // Atomic Button
  const inputTitles = ['Election Name', 'Election Date'];
  const inputTypes = ['text', 'date'];
  const handleSubmit = (formData) => {
    console.log('Submitted data:', formData);
  };

  // Atomic Table
  let columns = [
    {
      id: 'ElectionName',
      label: 'Election Name',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'date',
      label: 'date',
      minWidth: 170,
      align: 'center',
    }
  ]
  let rows = [
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },
    {
      ElectionName: 'India', date: '27/34/2003', PartySCode: 'bjp',
    },

  ]

  // handleDelete
  let handleDelete = () => {
    console.log("delete");
  }


  // handleUpdate
  let handleUpdate = () => {
    console.log("Update");
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <form>
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <TextField
            id="search-bar"
            className="text"
            label="Enter User Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
        </form>
        <AddButton
          title="Add User"
          inputTitles={inputTitles}
          inputTypes={inputTypes}
          onSubmit={handleSubmit} />
      </Grid>
      <Box mt={6}>
        <DataTable columns={columns} rows={rows} onDelete={handleDelete} onUpdate={handleUpdate} height={500} />
      </Box>
    </>
  )
}

export default User