import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleLogin } from '../utils/auth';
import {Card, PageHeader, Button, Modal, Form, Input, Alert} from 'antd';

const Login = (props) => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /*
    * handle logging in a user
    *
    * handleLogin() returns true if the username and password is valid
    * otherwise alert the user that the combination is incorrect
    */
    async function handleSubmit() {
        setError("")
        setLoading(true)
        if (username !== "" && password !== "") {
            var res = handleLogin(username, password);
            if (res) {
                //props.setRefresh(!props.refresh);
                history.push("/events");
                props.refreshPage();
            } else {
                setError("Invalid Username or Password")
                setLoading(false)
            }
        }
    }

    let footer = (
        <React.Fragment>
            <Button key="back" onClick={() => {props.setOpen(false)}} style={{margin:"10px"}}>
                Cancel
            </Button>
            <Button type="primary" key="back" onClick={() => {props.setOpen(false); handleSubmit()}} style={{margin:"10px"}}>
                Login
            </Button>
        </React.Fragment>
    ) 

    return (
        <>
        <Modal style={{top: "22%"}} width={"550px"} bodyStyle={{minHeight:"140px"}} title="Log In" visible={props.open} 
                    onOk={() => {props.setOpen(false)}} onCancel={() => {props.setOpen(false)}}
                    footer={footer}>
                <Form name="basic" style={{height:"30px"}}>
                    <Form.Item
                        label="Username"
                        name="Username"
                    >
                        <Input onChange={(e) => {setUsername(e.target.value)}}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="Password"
                    >
                        <Input onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Item>
                </Form>
            </Modal> 
        </>
    );
};

export default Login