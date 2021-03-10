import React, { useEffect, useState, useHistory} from 'react';
import cookie from "js-cookie";
import Login from "./login"
import {Card, PageHeader, Button, Modal, Form, Input} from 'antd';
import { handleLogout } from '../utils/auth';


const Landing = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);

    function isLoggedIn() {
        var logged = cookie.get("token");
        if (logged == null || logged == "validToken") {
            return true;
        }
        return false;
    }


    function logout() {
        handleLogout();
        window.location.reload();
    }

    return (
        <div className="Home Page">
            <PageHeader
            className="site-page-header"
            title={<span style={{fontSize:"25px", marginLeft:"25px"}}>Events</span>}
            style={{position:"fixed", backgroundColor:"#a4effc", width:"100%", zIndex:"1"}}
            extra={[
                <Button key="logout" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => logout()}>Logout</Button>,
                <Button key="login" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => setLoginOpen(true)}>Login</Button>
              ]}
        />
        <Login open={loginOpen} setOpen={setLoginOpen} refresh={refresh}/>
        </div>
        
    );
}

export default Landing