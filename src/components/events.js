import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import getEvents from '../utils/api'
import { Header, Image, Container } from 'semantic-ui-react'
import {Card, PageHeader, Button, Modal, Form, Input} from 'antd';
import cookie from "js-cookie";
import img from "../assets/defaultPFP.jpg"
import Login from "./login";
import { handleLogout } from '../utils/auth';

const Events = () => {
    // initial state with array of project information
    let initialEvents = [];
  
    const history = useHistory()
  
    // // initialize state variables to be empty array of projects
    const [events, setEvents] = useState(initialEvents)
    const [loginOpen, setLoginOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)

  
    // use effect for functional component
    useEffect(() => {
        getCorrectEvents();
    }, []);

    async function getCorrectEvents() {
        setEvents(await getEvents());
    }

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

    function getLink(privateURL, publicURL) {
        var res = cookie.get("token");
        if (res == null || res != "validToken") {
            return publicURL;
        }
        return privateURL;
    }

    function getImgLink(link) {
        return link ? link : img;
    }

    function logout() {
        handleLogout();
        console.log("logging out")
        window.location.reload();
        //history.push("/events");
    }

    const descStyle = {
        marginTop: "10px",
        fontSize: "12px"
    };

    const noSpaceStyle = {
        margin: "0px",
        fontSize: "12px"
    }

    const paddedHeader = {
        marginTop: "5px",
        fontSize: "12px"
    } //#a4effc #74d9f7

    return (
        <div style={{display:"flex"}}>
        <PageHeader
            className="site-page-header"
            title={<span style={{fontSize:"25px", marginLeft:"25px"}}>Events</span>}
            style={{position:"fixed", backgroundColor:"#a4effc", width:"100%", zIndex:"1"}}
            extra={[
                <Button key="logout" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => logout()}>Logout</Button>,
                <Button key="login" style={{backgroundColor:"#f2f5fa", marginRight:"25px"}}  onClick={() => setLoginOpen(true)}>Login</Button>
              ]}
        />
        <div className='eventList' style={{marginTop:"100px"}}>
            {events.map((ev) => 
                <div className='individualEvent'>
                <Card title={ev.name} style={{padding:"10px",marginLeft:"auto",marginRight:"auto", width:"60%"}}>
                  <div className='floatleft'>
                    <div className='eventId' style={noSpaceStyle}><span style={{fontWeight:"500"}}>Event ID:</span> {ev.id}</div>
                    <div className='eventType' style={noSpaceStyle}><span style={{fontWeight:"500"}}>Event Type:</span> {ev.event_type}</div>
                    <div className='eventTime' style={noSpaceStyle}><span style={{fontWeight:"500"}}>Time:</span> {displayDate(ev.start_time)} - {displayDate(ev.end_time)}</div>
                    <p style={descStyle}>{ev.description}</p>
                    <div className='eventDescription' style={noSpaceStyle}><span style={{fontWeight:"500"}}>Speakers:</span> {ev.speakers.map((speaker) => <>
                        <div className='floatleft'>
                        <div className='speakerName' style={noSpaceStyle}>{speaker.name}</div>
                        <div>
                            <img src={getImgLink(speaker.profile_pic)} style={{marginTop:"10px", marginBottom:"10px", marginLeft:"5px"}} width="100" height="100"/>
                        </div>
                        </div></>)}</div>
                    <a href={getLink(ev.private_url, ev.public_url)}>View Event</a>
                    <div className='relatedEvents' style={paddedHeader}><span style={{fontWeight:"500"}}>Related Events:</span> {ev.related_events.toString()}</div>
                  </div>
                  </Card>                       
                </div>           
            )}
          </div>

          <Login open={loginOpen} setOpen={setLoginOpen} refresh={refresh} setRefresh={setRefresh}/>
        </div>

        
        
    //   <>
    //   {loading ? (
    //       <center>
    //         {" "}
    //         <CSpinner
    //           className="loadingspinner"
    //           style={{
    //             width: "4rem",
    //             height: "4rem",
    //             marginTop: "20%",
    //             marginBottom: "20%",
    //           }}
    //           color="success"
    //           variant="grow"
    //         />
    //       </center>
    //     ) : (
    //     <div style={{marginBottom: "30px"}}>
    //       <div className='projectDashboardHeader'>
    //         <div className='floatright'>
    //           <CButton
    //             onClick={toggle}
    //             color="primary"
    //           ><b>Create Project</b></CButton>
  
    //           <CModal
    //             show={modal}
    //             onClose={toggle}
    //           >
    //             <CModalBody>
    //               <CForm>
    //                 <h2>Create a New Project</h2>
    //                 <br></br>
    //                 <CRow>
    //                   <CCol sm="12">
    //                     <h6>Project Name</h6>
    //                     <CInputGroup>
    //                       <CInput
    //                         label="Project Name"
    //                         placeholder="Enter Project Name"
    //                         onChange={handleEvent}
    //                         value={newProjectName}
    //                       />
    //                     </CInputGroup>
    //                     <br></br>
    //                     <div className='floatright'>
    //                       <CButton 
    //                         color="primary"
    //                         onClick={addProject}
    //                       >Add Project</CButton>{'  '}
    //                       <CButton
    //                         color="secondary"
    //                         onClick={toggle}
    //                       >Cancel</CButton>
    //                     </div>
    //                   </CCol>
    //                 </CRow>
    //               </CForm>
    //             </CModalBody>
    //           </CModal>
    //         </div>
    //         <h1>Projects</h1>
    //       </div>
            
    //       <div className='projectDashboardList'>
    //         {projects.map((project) => 
    //         <>
    //             <div className='individualprojectdashboard' onClick={() => history.push(`/projects/${project.projectid}`)}>
    //               <div className='floatleft'>
    //                 <h5>{project.projectname}</h5>
    //                 <h6 className='projectinfodesc'>Number of APIs: {project.numberurls}</h6>
    //               </div>
    //               <div className="floatright">
                      
    //                   <CButton onClick={(e) => deleteProject(e, project.projectid)} shape='pill' variant='outline' color='warning'>
    //                     <CIcon style={{ color:"red",marginBottom: "4px"}} content={freeSet.cilTrash}></CIcon>
    //                   </CButton>
    //               </div>
                                                  
    //             </div>
    //           </>
    //         )}
    //       </div>
  
    //     </div>
    //     )}
    //   </>
  
    );
  };
  
export default Events
