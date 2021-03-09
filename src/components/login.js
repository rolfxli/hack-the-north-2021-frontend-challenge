import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleLogin } from '../utils/auth';

const Login = () => {
    // return (
    //     <div className="Login Page">
    //         <p>
    //             Login. </p>
    //     </div>
    // );

    const history = useHistory();

    // the initial values of the username and password
    let initialLogin = {
        username: "",
        password: ""
    }
    const [logininfo, setLogininfo] = useState(initialLogin);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    function handleEvent(event) {
        setError("")
        const { name, value } = event.target
        setLogininfo((preState) => ({
          ...preState,
          [name]: value,
        }));
    }

    /*
    * handle logging in a user
    *
    * handleLogin() returns true if the username and password is valid
    * otherwise alert the user that the combination is incorrect
    */
    async function handleSubmit() {
        setError("")
        setLoading(true)
        if (logininfo.username !== "" && logininfo.password !== "") {
            var res = handleLogin(logininfo.username, logininfo.password);
            if (res) {
                history.push('events')
            } else {
                setError("Invalid Username or Password")
                setLoading(false)
            }
        }
    }

    return (
        <h>Login</h>
        // <>
        // <Header></Header>
        // <br></br>
        // <div className="hero section center-content illustration-section-01r" style={{marginTop: "15%"}}>
        // <CContainer>
        //     <CRow className="justify-content-center">
        //     <CCol md="8">
        //         <CCardGroup>
        //         <CCard>
        //             <CCardBody>
        //             <CForm>
        //                 <h2>Login to view Dashboard</h2>
        //                 <br></br>
        //                 <h6 color='white'>Email
        //                 </h6>
        //                 <CInputGroup className="mb-3">
        //                 <CInput
        //                     type="email"
        //                     name="email"
        //                     placeholder="Email"
        //                     onChange={handleEvent}
        //                     value={logininfo.email}
        //                 />

        //                 </CInputGroup>
        //                 <h6 color='white'>Password
        //                 </h6> 
        //                 <CInputGroup>
                
        //                 <CInput
        //                     type="password"
        //                     name = "password"
        //                     placeholder="Password"
        //                     autoComplete="username"
        //                     onChange={handleEvent}
        //                     value={logininfo.password}
        //                 />
        //                 </CInputGroup>
        //                 <br></br>
        //                 <CButton
        //                 onClick={handleSubmit}
        //                 color="primary"
        //                 className="px-4"
        //                 >
        //                 Login
        //                 </CButton>
        //                 <br></br><br></br>
        //                 {error && (
        //                 <>
        //                     <CAlert color="danger" closeButton>
        //                     {error}
        //                     </CAlert>
        //                 </>
        //                 )}
        //                 {loading && 
        //                 <center>
        //                 <CSpinner
        //                 style={{width:'4rem', height:'4rem', marginTop: "20px", marginBottom: "20px"}}
        //                 color="success"
        //                 variant="grow"
        //             />
        //             </center>
        //                 }
                    
        //             </CForm>
        //             </CCardBody>
        //         </CCard>
        //         </CCardGroup>
        //     </CCol>
        //     </CRow>
        // </CContainer>
        // </div>
        // </>
    );
};

export default Login