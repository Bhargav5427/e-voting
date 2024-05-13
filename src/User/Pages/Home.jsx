import React, { useEffect } from "react";
import TablewithRadio from "../../Atoms/TablewithRadio";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, postData } from "../../Redux-Toolkit/Slice/AdminSlice";
import {
  partylist_get_req,
  vote_get_req,
  vote_post_req,
} from "../../Redux-Toolkit/Constant";
import Swal from "sweetalert2";

const Home = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((state) => state.admin.connection);
  console.log(connectionData);
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    dispatch(
      fetchData({ endpoint: partylist_get_req, dataType: "connection" })
    );
    dispatch(fetchData({ dataType: "vote", endpoint: vote_get_req }));
  }, []);

  const finalData = (rowData) => {
    const data = {
      user: user?._id,
      party: rowData?.party_id,
      election: rowData?.election,
    };
    dispatch(
      postData({ dataType: "vote", endpoint: vote_post_req, payload: data })
    );

    Swal.fire({
      icon: "success",
      title: "Your Vote submitted Successfully",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    setTimeout(() => {
      window.location.reload();
      localStorage.clear();
      window.location.href = "/";
    }, 1500);
  };

  const data = connectionData?.map((connection) => ({
    id: connection?._id,
    election_name: connection?.election?.election_name,
    election: connection?.election?._id,
    party: connection?.party?.party_name,
    party_id: connection?.party?._id,
    partylogo: connection?.party?.party_logo,
  }));

  const voteData = useSelector((state) => state.admin.vote);
  console.log(voteData, "votedata");

  return <TablewithRadio data={data} Output={finalData} />;
};

export default Home;
