import * as React from "react";
import ProgressBarCard from "../../components/ProgressBarCard";
import { Grid, ListItem, Box } from "@mui/joy";
import DataTable from "../../Atoms/DataTable";

const Dashboard = () => {
  // Atomic Table
  let columns = [
    {
      id: "PartyLogo",
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
  let rows = [
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
    {
      PartyLogo: "India",
      PartyName: "bhajap",
      PartySCode: "bjp",
    },
  ];

  // handleDelete
  let handleDelete = () => {
    console.log("delete");
  };

  // handleUpdate
  let handleUpdate = () => {
    console.log("Update");
  };
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
        <Grid xs={4}>
          <ListItem>
            <ProgressBarCard />
          </ListItem>
        </Grid>
        <Grid xs={4}>
          <ListItem>
            <ProgressBarCard />
          </ListItem>
        </Grid>
        <Grid xs={4}>
          <ListItem>
            <ProgressBarCard />
          </ListItem>
        </Grid>
      </Grid>
      <Box mt={3}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={430}
        />
      </Box>
    </>
  );
};

export default Dashboard;
