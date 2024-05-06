import React, { useEffect } from "react";
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
  const inputTitles = ["election_name", "date"];
  const inputTypes = ["text", "date"];

  const data = useSelector((state) => state.admin.election);
  console.log(data);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: election_post_req,
        dataType: "election",
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
    { id: "date", label: "Date", minWidth: 170, align: "center" },
  ];

  const rows = data?.map((election) => ({
    ElectionName: election.election_name,
    date: election.date,
    id: election._id,
  }));

  const handleDelete = (id) => {
    console.log(id);
    // dispatch(
    //   deleteData({ endpoint: election_delete_req, id, dataType: "election" })
    // );
  };

  const handleUpdate = () => {
    console.log("Update");
  };

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
            label="Enter Election Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
        </form>
        <AddButton
          title="Add Election"
          inputTitles={inputTitles}
          inputTypes={inputTypes}
          onSubmit={handleSubmit}
        />
      </Grid>
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
