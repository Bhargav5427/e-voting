import * as React from "react";
import ProgressBarCard from "../../components/ProgressBarCard";
import { Grid, ListItem, Box } from "@mui/joy";
import DataTable from "../../Atoms/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux-Toolkit/Slice/AdminSlice";
import { election_get_req, party_get_req, user_get_req } from "../../Redux-Toolkit/Constant";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { BsInboxesFill } from "react-icons/bs";

const Dashboard = () => {
  let dispatch = useDispatch();
  const partydata = useSelector((state) => state.admin.party);
  const electiondata = useSelector((state) => state.admin.election);
  const userdata = useSelector((state) => state.admin.user);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);
  React.useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
    dispatch(fetchData({ endpoint: user_get_req, dataType: "user" }));
  }, [dispatch]);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

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
  let rows = partydata?.map((party) => ({
    id: party._id,
    PartyName: party.party_name,
    PartyLogo: party.party_logo,
    PartySCode: party.short_code,
  }));

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
            <ProgressBarCard
              progressValue={partydata.length * 2}
              icon={<FaPeopleGroup />}
              title="TOTAL PARTY"
              amount={partydata.length}
            />
          </ListItem>
        </Grid>
        <Grid xs={4}>
          <ListItem>
            <ProgressBarCard
              icon={<BsInboxesFill />}
              progressValue={electiondata.length * 2}
              title="TOTAL ELECTION"
              amount={electiondata.length}
            />
          </ListItem>
        </Grid>
        <Grid xs={4}>
          <ListItem>
            <ProgressBarCard
              icon={<FaUser />}
              progressValue={userdata.length * 2}
              title="TOTAL VOTER"
              amount={userdata.length}
            />
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
