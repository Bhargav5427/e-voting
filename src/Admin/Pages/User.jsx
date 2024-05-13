import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import DataTable from "../../Atoms/DataTable";
import AddButton from "../../Atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../Redux-Toolkit/Slice/AdminSlice";
import { user_post_req } from "../../Redux-Toolkit/Constant";

const User = () => {
  // Atomic Button
  const inputTitles = [
    "cardNo",
    "name",
    "fatherName",
    "sex",
    "dob",
    "assemblyNoandName",
    "address",
    "partNoandName",
    "password",
  ];
  const inputTypes = [
    "text",
    "text",
    "text",
    "text",
    "date",
    "text",
    "text",
    "text",
    "password",
  ];

  const dispatch = useDispatch();

  // Function to handle form submission for adding user
  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: user_post_req,
        dataType: "user",
      })
    );
  };

  // Get user data from Redux store
  const data = useSelector((state) => state.admin.user);

  // Define columns for DataTable
  const columns = [
    { id: "cardNo", label: "Election Name", minWidth: 170, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "fatherName", label: "Father Name", minWidth: 170, align: "center" },
    { id: "sex", label: "Gender", minWidth: 170, align: "center" },
    { id: "dob", label: "DOB", minWidth: 170, align: "center" },
    { id: "assemblyNoandName", label: "A.N.N", minWidth: 170, align: "center" },
    { id: "partNoandName", label: "P.N", minWidth: 170, align: "center" },
    { id: "password", label: "Password", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
  ];

  // Map user data for DataTable rows, handle potential null data
  const rows = data?.map((user) => ({
    cardNo: user?.cardNo || "",
    name: user?.name || "",
    fatherName: user?.fatherName || "",
    sex: user?.sex || "",
    dob: user?.dob || "",
    assemblyNoandName: user?.assemblyNoandName || "",
    partNoandName: user?.partNoandName || "",
    password: user?.password || "",
    address: user?.address || "",
  }));

  // Dummy function for handling deletion and update (not implemented)
  const handleDelete = () => {};
  const handleUpdate = () => {};

  return (
    <>
      {/* Search and Add buttons */}
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
          onSubmit={handleSubmit}
        />
      </Grid>
      <Box mt={6}>
        {/* DataTable */}
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={500}
        />
      </Box>
    </>
  );
};

export default User;
