import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleLogin } from '../utils/auth';
import {Card, PageHeader, Button, Modal, Form, Input} from 'antd';

const Logout = (props) => {
    const history = useHistory();

    /*
    * handle logging in a user
    *
    * handleLogin() returns true if the username and password is valid
    * otherwise alert the user that the combination is incorrect
    */
    async function handleSubmit() {
        handleLogout();
        history.push("/events");
    }

    let footer = (
        <React.Fragment>
            <Button key="back" onClick={() => {props.setOpen(false)}} style={{margin:"10px"}}>
                Cancel
            </Button>
            <Button type="primary" key="back" onClick={() => {props.setOpen(false); handleSubmit()}} style={{margin:"10px"}}>
                Logout
            </Button>
        </React.Fragment>
    ) 

    return (
        <>
        <Modal style={{top: "22%"}} width={"550px"} bodyStyle={{minHeight:"140px"}} title="Log In" visible={props.open} 
                    onOk={() => {props.setOpen(false)}} onCancel={() => {props.setOpen(false)}}
                    footer={footer}>
                Are you sure you want to logout?
            </Modal> 
        </>
    );
};

export default Login