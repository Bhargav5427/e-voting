import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login() {

    let name = useRef();
    let password = useRef();

    let handleSubmit = async () => {
        let data = {
            name: name.current.value,
            password: password.current.value
        }
        if (name.current.value == "" || password.current.value == "") {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 1000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "please complete all fields"
            });
            name.current.value = ''
            password.current.value = ''
        }
        else if (data?.name !== "" || data?.password !== "") {
            let res = await axios.post("http://13.127.211.205:8000/v1/login/admin", data).catch(e => console.log(e))
            if (res?.status == 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 1000,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Login Successfully"
                });
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 600)

                name.current.value = ''
                password.current.value = ''
            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 1500,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "please check name and Password"
                });
                name.current.value = ''
                password.current.value = ''
            }
        }
    }
   


    return (
        <div className='container'>
            <div className='row'>

                <div className='left-side col-6 d-flex justify-content-center align-items-center'>
                    <h1>E-Voting</h1>
                </div>
                <div className='right-side col-6'>
                    <div className=' d-flex justify-content-center align-items-center' style={{ height: "100vh" }} >
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        inputRef={name}
                                        label="name"
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
                                    >
                                        Sign In
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
