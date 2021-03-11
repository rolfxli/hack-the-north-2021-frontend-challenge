import React, { useState, useEffect } from 'react';
import getEvents from '../utils/api'
import { Card, PageHeader, Button } from 'antd';
import cookie from "js-cookie";
import img from "../assets/defaultPFP.jpg"
import Login from "./login";
import { handleLogout } from '../utils/auth';
import eventStyles from './componentStyles/events.css'

const Events = () => {
    // set the initial events to an empty array
    let initialEvents = [];
  
    const [events, setEvents] = useState(initialEvents)
    const [loginOpen, setLoginOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
  
    /** get events on component load */
    useEffect(() => {
        getCorrectEvents();
    }, []);

    /** get the events through API call */
    async function getCorrectEvents() {
        setEvents(await getEvents());
    }

    /** format event time */
    function displayDate(unixtime) {
        var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var date = new Date(unixtime);

        // Year
        var year = date.getFullYear();

        // Month
        var month = months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        // Hours
        var hours = date.getHours();

        // Minutes
        var minutes = "0" + date.getMinutes();

        // Display date time in MM-dd-yyyy h:m:s format
        var fulldate = hours + ':' + minutes.substr(-2) +' '+ month + ' ' + day + ' ' + year + ' '
        return fulldate;
        };

    /** provide the private link if logged in */
    function getLink(privateURL, publicURL) {
        var res = cookie.get("token");
        if (res == null || res != "validToken") {
            return publicURL;
        }
        return privateURL;
    }

    /** display a default PFP if the PFP link does not exist */
    function getPfpLink(link) {
        return link ? link : img;
    }

    /** handle logout action
     *  removes cookies and reloads page
     */
    function logout() {
        handleLogout();
        console.log("logging out")
        reloadPage();
    }

    /** wrapper to reload the page */
    function reloadPage() {
        window.location.reload();
    }

    /**
     * custom styles not in css file
     */
    let eventInfoStyle = {
        fontWeight:"500"
    }
    let cardStyle = {
        padding:"10px",
        marginLeft:"auto",
        marginRight:"auto",
        width:"60%"
    }
    let pfpStyle = {
        marginTop:"10px",
        marginBottom:"10px",
        marginLeft:"5px"
    }

    return (
        <div style={{display:"flex", backgroundColor:"#fce2ac"}}>
        <PageHeader
            className="site-page-header"
            title={<span style={{fontSize:"25px", marginLeft:"25px"}}>Events</span>}
            style={{position:"fixed", backgroundColor:"#fccf72", width:"100%", zIndex:"1"}} 
            extra={[
                <Button key="logout" size="large" shape="round" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => logout()}>Logout</Button>,
                <Button key="login" size="large" shape="round" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => setLoginOpen(true)}>Login</Button>
              ]}
        />
        <div className='eventList' style={{marginTop:"100px"}}>
            {events.map((ev) => 
                <div className='individualEvent'>
                <Card title={ev.name} style={cardStyle} extra={<a href={getLink(ev.private_url, ev.public_url)}>View Event</a>}>
                    <div className='floatleft'>
                        <div className='eventId' style={eventStyles.noSpaceStyle}><span style={eventInfoStyle}>Event ID:</span> {ev.id}</div>
                        <div className='eventType' style={eventStyles.noSpaceStyle}><span style={eventInfoStyle}>Event Type:</span> {ev.event_type}</div>
                        <div className='eventTime' style={eventStyles.noSpaceStyle}><span style={eventInfoStyle}>Time:</span> {displayDate(ev.start_time)} - {displayDate(ev.end_time)}</div>
                        <div className='relatedEvents' style={eventStyles.noSpaceStyle}><span style={eventInfoStyle}>Related Event IDs:</span> {ev.related_events.toString()}</div>
                        <br/>
                        <p style={eventStyles.descStyle}>{ev.description}</p>
                        <div className='eventDescription' style={eventStyles.noSpaceStyle}><span style={eventInfoStyle}>Speakers:</span> {ev.speakers.map((speaker) => <>
                            <div className='floatleft'>
                            <div className='speakerName' style={eventStyles.noSpaceStyle}>{speaker.name}</div>
                            <div>
                                <img src={getPfpLink(speaker.profile_pic)} style={pfpStyle} width="100" height="100"/>
                            </div>
                            </div></>)}
                        </div>
                    </div>
                  </Card>                       
                </div>           
            )}
          </div>
          <Login open={loginOpen} setOpen={setLoginOpen} refresh={refresh} setRefresh={setRefresh} refreshPage={reloadPage}/>
        </div>  
    );
  };
  
export default Events
