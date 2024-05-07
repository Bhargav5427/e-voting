import * as React from "react";
import { Grid, ListItem, Box } from "@mui/joy";
import DataTable from "../../Atoms/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  election_get_req,
  party_get_req,
  user_get_req,
} from "../../Redux-Toolkit/Constant";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { BsInboxesFill } from "react-icons/bs";
import ProgressBarCard from "../../components/ProgressBarCard";

const Dashboard = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const partydata = useSelector((state) => state.admin.party);
  const electiondata = useSelector((state) => state.admin.election);
  const userdata = useSelector((state) => state.admin.user);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  // Fetch data on component mount
  React.useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
    dispatch(fetchData({ endpoint: user_get_req, dataType: "user" }));
  }, [dispatch]);

  // If loading, display loading indicator
  if (isLoading) {
    return "loading...";
  }

  // If error, display error message
  if (error) {
    return error;
  }

  // Atomic Table configuration
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
  const rows = partydata?.map((party) => ({
    id: party._id,
    PartyName: party.party_name,
    PartyLogo: party.party_logo,
    PartySCode: party.short_code,
  }));

  // Function to handle delete action
  const handleDelete = () => {
    console.log("delete");
  };

  // Function to handle update action
  const handleUpdate = () => {
    console.log("Update");
  };

  return (
    <>
      {/* Progress bar cards */}
      <Grid container spacing={19} columns={12} sx={{ flexGrow: 1 }}>
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
      {/* DataTable */}
      <Box mt={5}>
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
