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
import Swal from "sweetalert2";

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
    id: connection?._id,
    election_name: connection?.election?.election_name,
    election: connection?.election?._id,
    party: connection?.party?.party_name,
    partylogo: connection?.party?.party_logo,
  }));

  // Get user Info
  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  };
  let user = getUser();

  // post data
  // post data
  let finalData = (rowData) => {
    console.log(rowData);
    let data = {
      user: user?._id,
      party: rowData?.id,
      election: rowData?.election,
    };
    console.log(data);
    dispatch(
      postData({ dataType: "vote", endpoint: vote_post_req, payload: data })
    );
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Your Vote submitted Successfully",
    });

    // Add a delay before reloading the location
    setTimeout(() => {
      window.location.reload();
      localStorage.clear();
      window.location.href = "/";
    }, 1500); // Adjust the delay time as needed (in milliseconds)
  };

  let voteData = useSelector((state) => state.admin.vote);
  console.log(voteData, "votedata");
  return <TablewithRadio data={data} Output={finalData} />;
}
