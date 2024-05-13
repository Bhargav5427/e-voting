import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  fetchData,
  postData,
} from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  election_delete_req,
  election_get_req,
  election_post_req,
} from "../../Redux-Toolkit/Constant";
import DataTable from "../../Atoms/DataTable";
import AddButton from "../../Atoms/Button";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Election = () => {
  // Input titles and types for AddButton component
  const inputTitles = ["election_name", "date"];
  const inputTypes = ["text", "date"];

  // Redux state selectors
  const data = useSelector((state) => state.admin.election);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  // Redux dispatch
  const dispatch = useDispatch();

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  // If loading, display loading indicator
  if (isLoading) {
    return "Loading...";
  }

  // If error, display error message
  if (error) {
    return error;
  }

  // Function to handle form submission for adding election
  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: election_post_req,
        dataType: "election",
      })
    );
  };

  // Define columns for DataTable
  const columns = [
    {
      id: "ElectionName",
      label: "Election Name",
      minWidth: 170,
      align: "center",
    },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
  ];

  // Filter data based on search term
  const filteredData = data.filter((election) =>
    election.election_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map data for DataTable rows, handle potential null data
  const rows = filteredData.map((election) => ({
    ElectionName: election?.election_name || "",
    date: election?.date || "",
    id: election?._id || "",
  }));

  // Function to handle deletion of election
  const handleDelete = (id) => {
    dispatch(
      deleteData({ endpoint: election_delete_req, id, dataType: "election" })
    );
  };

  // Dummy function for handling update (not implemented)
  const handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      {/* Search and Add buttons */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <TextField
            id="search-bar"
            className="text"
            label="Enter Election Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <AddButton
          title="Add Election"
          inputTitles={inputTitles}
          inputTypes={inputTypes}
          onSubmit={handleSubmit}
        />
      </Grid>
      {/* DataTable */}
      <Box mt={11}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={450}
        />
      </Box>
    </>
  );
};

export default Election;
