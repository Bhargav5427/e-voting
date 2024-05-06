import * as React from "react";
import DataTable from "../../Atoms/DataTable";
import { Box, Button, Grid, ListItem } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, postData } from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  election_get_req,
  party_get_req,
  party_get_req_id,
  partylist_delete_req,
  partylist_get_req,
  partylist_post_req,
} from "../../Redux-Toolkit/Constant";
import { useEffect } from "react";

export default function Connection() {
  // DropDown

  let election = useRef();
  let party = useRef();
  const [Election, setElection] = React.useState("");
  const [Party, setParty] = React.useState("");

  const Electiondata = useSelector((state) => state.admin.election);
  const Partydata = useSelector((state) => state.admin.party);
  const Connection = useSelector((state) => state.admin.connection);
  console.log(Connection, "data");

  console.log(Party, "party");
  console.log(Election, "Election");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
  }, []);
  useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
  }, []);
  useEffect(() => {
    dispatch(
      fetchData({ endpoint: partylist_get_req, dataType: "connection" })
    );
  }, []);

  let handleSubmit = () => {
    let finaldata = {
      election: Election,
      party: Party,
    };
    dispatch(
      postData({
        payload: finaldata,
        endpoint: partylist_post_req,
        dataType: "connection",
      })
    );
  };
  const columns = [
    {
      id: "ElectionName",
      label: "Election Name",
      minWidth: 170,
      align: "center",
    },
    { id: "Partyname", label: "Party Name", minWidth: 170, align: "center" },
  ];

  const rows = Connection?.map((Connection) => ({
    ElectionName: Connection.election.election_name,
    Partyname: Connection.party.party_name,
    id: Connection._id,
  }));

  // handleDelete
  let handleDelete = (id) => {
    console.log("delete",id);
    dispatch(deleteData({ endpoint: partylist_delete_req, id, dataType: "connection" }));
  };

  // handleUpdate
  let handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        mt={4}
        columns={12}
        sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={8}>
          <ListItem>
            <DataTable
              columns={columns}
              rows={rows}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              height={500}
            />
          </ListItem>
        </Grid>
        <Grid item xs={4} container direction="column">
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="party-select-label">Choose Party</InputLabel>
              <Select
                labelId="party-select-label"
                id="party-select"
                value={Party}
                label="Party"
                onChange={(event) => setParty(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Partydata?.map((val, ind) => (
                  <MenuItem key={ind} value={val._id}>
                    {val.party_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="election-select-label">
                Choose Election
              </InputLabel>
              <Select
                labelId="election-select-label"
                id="election-select"
                value={Election}
                label="Election"
                onChange={(event) => setElection(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Electiondata?.map((val, ind) => (
                  <MenuItem key={ind} value={val._id}>
                    {val.election_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

{
  /* <Grid item xs={4} container direction="column">
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <InputLabel id="party-select-label">Party</InputLabel>
            <Select
              labelId="party-select-label"
              id="party-select"
              value={Party}
              onChange={(event) => setParty(event.target.value)}
              label="Party"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Partydata?.map((val, ind) => (
                <MenuItem key={ind} ref={party} value={val._id}>
                  {val.party_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <InputLabel id="election-select-label">Election</InputLabel>
            <Select
              labelId="election-select-label"
              id="election-select"
              value={Election}
              onChange={(event) => setElection(event.target.value)}
              label="Election"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Electiondata?.map((val, ind) => (
                <MenuItem key={ind} ref={election} value={val._id}>
                  {val.election_name}
                </MenuItem>
              ))}
            </Select>
            <Box mt={3}>
              <Button
                sx={{ maxWidth: "100%" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Add Connection
              </Button>
            </Box>
          </FormControl>
        </Grid> */
}
