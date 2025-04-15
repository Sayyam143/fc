import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';

export default function Appointment_status() {

    const [appointments,setAppointments] = useState([]);
    var i = 1;
    const client_id = sessionStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(()=>{
        if(client_id)
        {
            display_appointment_status();
        }
    })

    const display_appointment_status = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/client_appointment_status/" + client_id);
            setAppointments(res.data)
        }
        catch(err)
        {
            alert(err);
        }
    }

    const delete_appointment = async(e) => {
      const text = "Are you sure ?";
      try{
        if(window.confirm(text) == true)
        {
          const res = await axios.delete("http://localhost:8867/backend/client_appointment/"+e)
          alert(res.data);
        }
      }
      catch(err){
        alert(err);
      }
    }

  return (
    <div>
        

      <main id="main" class="main mt-5 mb-5">
        <div class="col-12" style={{width:"200%"}}>
          <div class="card">
            <div class="card-body">
                <h5 class="card-title">Appoinetment Status</h5>

                {/* <div class="col-12">
                      <button type='button' class="btn btn-primary float-start mb-3 rounded-pill"><i class="bi bi-person-plus"></i><b> Client Appointment</b></button>
                </div>    */}

                <table id="example" class="table table-striped dt-responsive nowrap w-100">
                
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Doctor Name</th>
                            <th>Doctor Category</th>
                             <th>Appointment Title</th>
                            <th>Appointment Date</th>
                            <th>Message</th>
                            <th>Appointment Status</th>
                          </tr>
                </thead>
               
                <tbody>
                    {appointments.map((appointment)=>
                      <>
                        <tr>
                            <th>{i++}</th>
                            <td>{appointment.client_name}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.category_name}</td>
                            <td>{appointment.appointment_title}</td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.message}</td>
                            <td>{appointment.case_status>0 && appointment.case_status<2? <p style={{color:'gray'}}><b>Pending</b></p>:
                            appointment.case_status>1 && appointment.case_status<3? <p style={{color:'green'}}><b>Approve</b></p>: 
                            appointment.case_status>2 && appointment.case_status<4? <p style={{color:'red'}}><b>Disapprove</b></p> : ""} </td>
                            <td>{appointment.case_status>0 && appointment.case_status<2? <button type="submit" class="btn btn-danger rounded-pill" onClick={()=>delete_appointment(appointment.appointment_id)}>Delete</button>:""}</td>
                        </tr>
                        
                      </>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
