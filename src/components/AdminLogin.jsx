import React, { useRef, useState } from "react";
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

function AdminLogin() {
  // Refs for input fields
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async () => {
    // Set loading state to true when form is submitted
    setLoading(true);

    // Get input values from refs
    const data = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };

    // Validate input fields
    if (!data.name || !data.password) {
      setLoading(false); // Reset loading state
      // Show error alert if any field is empty
      Swal.fire({
        icon: "error",
        title: "Please complete all fields",
      });
      return;
    }

    try {
      // Make POST request to login endpoint
      const res = await axios.post(
        "http://13.127.211.205:8000/v1/login/admin",
        data
      );

      // Check response status
      if (res.status === 200) {
        // Store user role in localStorage
        localStorage.setItem("role", "admin");
        // Show success alert on successful login
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
        }).then(() => {
          // Redirect to dashboard after 600 milliseconds
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 600);
        });
        // Clear input fields after successful login
        nameRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        // Show error alert if login fails
        setLoading(false); // Reset loading state
        Swal.fire({
          icon: "error",
          title: "Please check name and password",
        });
      }
    } catch (error) {
      // Show error alert if request fails
      setLoading(false); // Reset loading state
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Please check name and password",
      });
    }
  };

  // Function to handle user role redirection
  const handleUserRole = () => {
    // Redirect to user login page
    window.location.href = "/login";
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
                  Admin Sign in
                </Typography>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    inputRef={nameRef}
                    label="Name"
                    name="name"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    inputRef={passwordRef}
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
                    onClick={handleUserRole}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading} // Disable button when loading
                  >
                    User Login
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

export default AdminLogin;
