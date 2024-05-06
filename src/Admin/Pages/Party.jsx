import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import DataTable from "../../Atoms/DataTable";
import AddButton from "../../Atoms/Button";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  PostData,
  deleteData,
  fetchData,
  postData,
} from "../../Redux-Toolkit/Slice/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  party_delete_req,
  party_get_req,
  party_post_req,
} from "../../Redux-Toolkit/Constant";
import { Add } from "@mui/icons-material";

const Party = () => {
  let dispatch = useDispatch();
  // Atomic Button
  const inputTitles = ["party_name", "short_code", "party_logo"];
  const inputTypes = ["text", "text", "file"];
  const [open, setOpen] = React.useState(false);

  const data = useSelector((state) => state.admin.party);
  
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);


  // FETCH DATA
  useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

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

  // Atomic Table
  let columns = [
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
  let rows = data?.map((party) => ({
    id: party._id,
    PartyName: party.party_name,
    PartyLogo: party.party_logo,
    PartySCode: party.short_code,
  }));

  // handleDelete
  const handleDelete = (id) => {
    
  };

  const handleUpdate = () => {
    
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
