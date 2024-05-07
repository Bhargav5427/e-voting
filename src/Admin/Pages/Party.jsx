import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  fetchData,
  postData,
} from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  party_delete_req,
  party_get_req,
  party_post_req,
} from "../../Redux-Toolkit/Constant";
import DataTable from "../../Atoms/DataTable";
import AddButton from "../../Atoms/Button";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Grid, IconButton, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";

const Party = () => {
  const dispatch = useDispatch();

  // Atomic Button
  const inputTitles = ["party_name", "short_code", "party_logo"];
  const inputTypes = ["text", "text", "file"];
  const [open, setOpen] = React.useState(false);

  // Redux state selectors
  const data = useSelector((state) => state.admin.party);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // If loading, display loading indicator
  if (isLoading) {
    return "loading...";
  }

  // If error, display error message
  if (error) {
    return error;
  }

  // Function to handle form submission for adding party
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("party_name", event.target.elements["party-name"].value);
    formData.append("party_logo", event.target.elements["party-logo"].files[0]);
    formData.append(
      "short_code",
      event.target.elements["party-short-code"].value
    );

    dispatch(
      postData({
        payload: formData,
        endpoint: party_post_req,
        dataType: "party",
      })
    );

    setOpen(false);
  };

  // Define columns for DataTable
  const columns = [
    {
      id: "img",
      label: "Party Logo",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartyName",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartySCode",
      label: "Party Short-Code",
      minWidth: 170,
      align: "center",
    },
  ];

  // Map data for DataTable rows, handle potential null data
  const rows = data?.map((party) => ({
    id: party?._id,
    PartyName: party?.party_name || "",
    PartyLogo: party?.party_logo || "",
    PartySCode: party?.short_code || "",
  }));

  // Function to handle deletion of party
  const handleDelete = (id) => {
    dispatch(deleteData({ endpoint: party_delete_req, id, dataType: "party" }));
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
        <form>
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <TextField
            id="search-bar"
            className="text"
            label="Enter Party Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
        </form>
        <div>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Add />
            &nbsp; Add Party
          </Button>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Add Party
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="party-name"
                  label="Party Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <input
                  type="file"
                  id="party-logo"
                  name="partyLogo"
                  accept="image/*"
                  required
                />
                <TextField
                  id="party-short-code"
                  label="Party Short Code"
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Sheet>
          </Modal>
        </div>
      </Grid>
      <Box mt={11}>
        {/* DataTable */}
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

export default Party;
