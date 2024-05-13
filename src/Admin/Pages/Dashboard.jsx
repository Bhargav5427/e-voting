import * as React from "react";
import { Grid, ListItem, Box } from "@mui/joy";
import DataTable from "../../Atoms/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { BsInboxesFill } from "react-icons/bs";
import ProgressBarCard from "../../components/ProgressBarCard";

const Dashboard = () => {
  // Redux hooks
  const partydata = useSelector((state) => state.admin.party);
  const electiondata = useSelector((state) => state.admin.election);
  const userdata = useSelector((state) => state.admin.user);
  const votedata = useSelector((state) => state.admin.vote);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  function calculatePartyVotes(data) {
    const partyVotes = {};
    // Filter out entries where the user has voted for a party
    const votedEntries = data.filter(
      (entry) => entry.party !== null && entry.election !== null
    );
    // Iterate over voted entries
    votedEntries.forEach((entry) => {
      const { party } = entry;
      if (party.party_name in partyVotes) {
        partyVotes[party.party_name]++;
      } else {
        partyVotes[party.party_name] = 1;
      }
    });
    return partyVotes;
  }

  const partyVotes = calculatePartyVotes(votedata);
  console.log("Party Votes:", partyVotes);

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
      id: "party",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "votes",
      label: "Votes",
      minWidth: 100,
      align: "center",
    },
  ];

  const rows = partydata?.map((party) => ({
    id: party._id,
    img: party.party_logo,
    party: party.party_name,
    votes: partyVotes[party.party_name] || 0, // Set votes to 0 if party has no votes
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
        <DataTable columns={columns} rows={rows} height={430} />
      </Box>
    </>
  );
};

export default Dashboard;
