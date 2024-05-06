import * as React from "react";
import TablewithRadio from "../../Atoms/TablewithRadio";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData, postData } from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  election_get_req,
  partylist_get_req,
  vote_get_req,
  vote_post_req,
} from "../../Redux-Toolkit/Constant";

export default function Home() {
  let dispatch = useDispatch();

  // fetch data
  useEffect(() => {
    dispatch(
      fetchData({ endpoint: partylist_get_req, dataType: "connection" })
    );
    dispatch(fetchData({ dataType: "vote", endpoint: vote_get_req }));
  }, []);


  // fetch Connection list
  let connectionData = useSelector((state) => state.admin.connection);
  let data = connectionData?.map((connection) => ({
    id: connection._id,
    election_name: connection.election.election_name,
    party: connection.party.party_name,
    partylogo: connection.party.party_logo,
  }));


  // Get user Info
  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  };
  let user = getUser();


  // post data
  let finalData = (rowData) => {
    let data = {
      user: user._id,
      party: rowData.id,
    };
    dispatch(
      postData({ dataType: "vote", endpoint: vote_post_req, payload: data })
    );
    // window.location.reload();
    // localStorage.clear();
    // window.location.href = "/";
  };


  let voteData = useSelector((state) => state.admin.vote);
  console.log(voteData, "votedata");
  return <TablewithRadio data={data} Output={finalData} />;
}
