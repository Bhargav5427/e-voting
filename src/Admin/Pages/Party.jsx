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
import { FaPlus } from "react-icons/fa6";
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

const Party = () => {
  let dispatch = useDispatch();
  // Atomic Button
  const inputTitles = ["party_name", "short_code", "party_logo"];
  const inputTypes = ["text", "text", "file"];
  const [open, setOpen] = React.useState(false);

  const { data, success, message } = useSelector((state) => state.admin.party);
  console.log(data);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(fetchData());
    }
  }, [success, dispatch]);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: party_post_req,
        dataType: "party",
      })
    );
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
    console.log(id);
    dispatch(deleteData({ endpoint: party_delete_req, id, dataType: "party" }));
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
            <FaPlus /> Add Party
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
                This is the modal title
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                Make sure to use <code>aria-labelledby</code> on the modal
                dialog with an optional <code>aria-describedby</code> attribute.
              </Typography>
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
