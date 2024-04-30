import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import {
    MDBContainer,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {
    let name = useRef();
    let password = useRef();

    let handleLogin = () => {
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
        }
        else {
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: "top",
            //     showConfirmButton: false,
            //     timer: 1000,
            //     didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //     }
            // });
            // Toast.fire({
            //     icon: "success",
            //     title: "Login Successfully"
            // });
            let data = {
                name: name.current.value,
                password: password.current.value,
            }

            window.location.href = "/dashboard"
            // axios.post("http://13.127.211.205:8000/v1/login/admin", data).then((res) => {
            //     console.log(res.data.data.message)
            // })
            name.current.value = ''
            password.current.value = ''
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

                        <Card className='login-card'>
                            <Card.Body>
                                <MDBContainer className="p-1 my-4 d-flex flex-column w-75">

                                    <MDBInput wrapperClass='mb-4' label='name address' id='form1' type='name' ref={name} />
                                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' ref={password} />

                                    <button className="p-2" onClick={handleLogin}>Sign in</button>

                                </MDBContainer>
                            </Card.Body>
                        </Card>
                    </div >
                </div>
            </div>
        </div>
    );
}

export default Login;