import React, { useState } from 'react';
import Login from "./login"
import { PageHeader, Button } from 'antd';
import { useHistory } from "react-router-dom";


const Landing = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const history = useHistory();

    /** redirect to the events page */
    function toEvents() {
        history.push('/events');
    }

    /** single style for center text */
    let textStyle = {
        display:"flex",
        justifyContent:"center", 
        alignItems:"center", 
        fontSize:"30px", 
        height: "100vh", 
        fontFamily:"Mulish", 
        fontWeight:"600", 
        marginLeft:"auto", 
        marginRight:"auto",
    };

    return (
        <div>
            <div className="Home Page" style={{ backgroundColor:"#fce2ac", height:"100vh", width:"100wh"}}>
                <PageHeader
                className="site-page-header"
                title={<span style={{fontSize:"25px", marginLeft:"25px"}}>Welcome</span>}
                style={{position:"fixed", backgroundColor:"#fccf72", width:"100%", zIndex:"1"}}
                extra={[
                    <Button key="login" shape="round" size="large" style={{backgroundColor:"#f2f5fa"}}  onClick={() => toEvents()}>View Events</Button>, //#1a88c4
                    <Button key="login" shape="round" size="large" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => setLoginOpen(true)}>Login</Button>
                ]} 
            />
            <div style={textStyle}>Hack the North 2021 Frontend Challenge</div>
            <Login open={loginOpen} setOpen={setLoginOpen} refresh={refresh}/>
            </div>
        </div>
    );
}

export default Landing