import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DataTable from '../../Atoms/DataTable';
import { Box, Button, Grid, ListItem } from '@mui/material';
import ProgressBarCard from '../../components/ProgressBarCard';
import { useRef } from 'react';

export default function Connection() {
  // DropDown

  let election = useRef();
  let party = useRef();
  // const [Election, SetElection] = React.useState('');
  // const [Party, setParty] = React.useState('');

  let handleSubmit = () => {
    let data = {
      election: election.current.value,
      party: party.current.value,
    }
    console.log(data);
  }
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
      <Grid container spacing={2} mt={4} columns={12} sx={{ flexGrow: 1, alignItems: 'center', justifyContent: "center" }}>
        <Grid item xs={8}>
          <ListItem>
            <DataTable columns={columns} rows={rows} onDelete={handleDelete} onUpdate={handleUpdate} height={500} />
          </ListItem>
        </Grid>
        <Grid item xs={4} container direction="column">
          <ListItem>
            <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
              <InputLabel id="demo-select-small-label">Election</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Election"
                name='election'
                inputRef={election}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
              <InputLabel id="demo-select-small-label">Party</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Party"
                name='party'
                inputRef={party}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Box mt={3} >
                <Button sx={{ maxWidth: "100%" }} variant="contained" onClick={handleSubmit}>Add Connection</Button>
              </Box>
            </FormControl>
          </ListItem>
        </Grid>
      </Grid>


    </>
  );
}
