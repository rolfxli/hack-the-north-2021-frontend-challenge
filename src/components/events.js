import {React, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import getEvents from '../utils/api'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const Events = () => {
    // initial state with array of project information
    let initialEvents = [];
  
    const history = useHistory()
  
    // // initialize state variables to be empty array of projects
    // // projects: array of {'name', 'mostRecentStatus'}
    const [events, setEvents] = useState(initialEvents)
    // const [loading, setLoading] = useState(true);
    // const [modal, setModal] = useState(false)
    // const [newProjectName, setNewProjectName] = useState(initialNewProjectName)
  
    // const toggle = () => {
    //   setModal(!modal)
    //   setNewProjectName("")
    // }
  
    // use effect for functional component
    useEffect(() => {
        getCorrectEvents();
        //console.log(events)
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
    
    // async function addProject() {
    //   console.log(newProjectName)
    //   var token = cookie.get('token')
    //   var userid = cookie.get('userid')
    //   if (newProjectName !== "") {
    //     const url = `${process.env.REACT_APP_BASEURL}users/${userid}/projects?token=${token}`
    //     const payload = {
    //       "projectname": newProjectName
    //     }
    //     axios
    //       .all([
    //         axios.post(url, payload)
    //       ])
    //       .then(
    //         axios.spread(() => {
    //           getProjects()
    //         }),
    //       )
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //       .finally(
    //         toggle()
    //       )
    //   }
    // }
  
    // function deleteProject(event, projectid) {
    //   const token = cookie.get('token')
    //   // delete the project
    //   axios.delete(`${process.env.REACT_APP_BASEURL}projects/${projectid}?token=${token}`)
    //   .then(
    //     setProjects(projects.filter(
    //         function(project) { 
    //             return project.projectid !== projectid 
    //         }
    //     ))
    //   )
    //   .catch((err) => {
    //     console.error(err)
    //   });
    //   event.stopPropagation()
    // }
  
    // function handleEvent(event) {
    //   const { value } = event.target
    //   setNewProjectName(value)
    //   console.log(newProjectName)
    // } onClick={() => history.push(`/login`)}
    
    return (
        <>
        <h>Events</h>
        <div className='eventList'>
            {events.map((ev) => 
            <>
                <div className='individualEvent'>
                  <div className='floatleft'>
                    <h5>{ev.name}</h5>
                    <h6 className='event start time'>Start Time: {displayDate(ev.start_time)}</h6>
                    <h6 className='event end time'>End Time: {displayDate(ev.end_time)}</h6>
                    <h6 className='event description'>Description: {ev.description}</h6>
                    <h6 className='event description'>Speakers: {ev.speakers.map((speaker) => <>
                        <div className='floatleft'>
                        <h className='speaker name'>{speaker.name}</h>
                        <div>
                            <img src={speaker.profile_pic} onerror="if (this.src != 'defaultPFP.jpg') this.src = 'defaultPFP.jpg';"   width="100" height="100"/>
                        </div>
                        </div></>)}</h6>
                  </div>
                  <div className="floatright">
                      
                      {/* <CButton onClick={(e) => deleteProject(e, project.projectid)} shape='pill' variant='outline' color='warning'>
                        <CIcon style={{ color:"red",marginBottom: "4px"}} content={freeSet.cilTrash}></CIcon>
                      </CButton> */}
                  </div>
                                                  
                </div>                
            </>
            )}
          </div>
        </>
        
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
