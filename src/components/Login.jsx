import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux-Toolkit/Slice/AdminSlice";
import { vote_get_req } from "../Redux-Toolkit/Constant";

function Login() {
  // Refs for input fields
  let name = useRef();
  let password = useRef();

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Redux dispatch
  let dispatch = useDispatch();

  // Fetch vote data from server
  useEffect(() => {
    dispatch(fetchData({ dataType: "vote", endpoint: vote_get_req }));
  }, []);

  // Select vote data from Redux store
  let voteData = useSelector((state) => state.admin.vote);

  // Function to handle form submission
  let handleSubmit = async () => {
    // Set loading state to true when form is submitted
    setLoading(true);

    // Get input values from refs
    let data = {
      cardNo: name.current.value,
      password: password.current.value,
    };

    // Validate input fields
    if (name.current.value === "" || password.current.value === "") {
      setLoading(false); // Reset loading state
      // Show error alert if any field is empty
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
        icon: "error",
        title: "Please complete all fields",
      });
      name.current.value = "";
      password.current.value = "";
    } else {
      try {
        // Make POST request to user login endpoint
        let res = await axios.post(
          "http://13.127.211.205:8000/v1/login/user",
          data
        );
        if (res.status === 200) {
          if (!voteData.find((val) => val.user?.cardNo === data.cardNo)) {
            // Set login info to localStorage
            localStorage.setItem("role", "user");
            localStorage.setItem("userData", JSON.stringify(res.data.data));

            // Show success alert on successful login
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
              title: "Login Successfully",
            });

            // Redirect to home page after 600 milliseconds
            setTimeout(() => {
              window.location.href = "/home";
            }, 600);

            // Clear input fields after successful login
            name.current.value = "";
            password.current.value = "";
          } else {
            // Show error alert if user has already voted
            setLoading(false); // Reset loading state
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
              icon: "error",
              title: "You have already voted",
            });
            name.current.value = "";
            password.current.value = "";
          }
        } else {
          // Show error alert if login fails
          setLoading(false); // Reset loading state
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
            icon: "error",
            title: "Please check VoterID and password",
          });
          name.current.value = "";
          password.current.value = "";
        }
      } catch (error) {
        // Show error alert if request fails
        setLoading(false); // Reset loading state
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
          icon: "error",
          title: "Please check VoterID and password",
        });
        console.error(error);
      }
    }
  };
  console.log(process.env.REACT_APP_BASE_URL,"qwertyu");

  // Function to handle admin role redirection
  const handleAdminRole = () => {
    // Redirect to admin login page
    window.location.href = "/adminlogin";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="left-side col-6 d-flex justify-content-center align-items-center">
          <h1>E-Voting</h1>
        </div>
        <div className="right-side col-6">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  User Sign in
                </Typography>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    inputRef={name}
                    label="VoterID"
                    name="name"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    inputRef={password}
                    label="Password"
                    type="password"
                    id="password"
                  />
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? "Signing In..." : "Sign In"}{" "}
                    {/* Show loading text when signing in */}
                  </Button>
                  <Button
                    onClick={handleAdminRole}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Admin Login
                  </Button>
                </div>
              </Box>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
