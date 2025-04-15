import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';

export default function Display_inquiry() {

    const [inquirys,setInquirys] = useState([]);
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
            const res = await axios.get("http://localhost:8867/backend/join_query_inquiry/" + client_id);
            setInquirys(res.data)
        }
        catch(err)
        {
            alert(err);
        }
    }
    const handledelete = async(e) => {
        if(window.confirm("Are you sure ?") == true)
        {
            try{
                const res = await axios.delete("http://localhost:8867/backend/join_query_inquiry/"+e);
                alert(res.data);
                navigate("/");

            }   
            catch(err){
                alert(err);
            }
        }
    }

  return (
    <div>
      

      <main id="main" class="main mt-5 mb-5">
        <div class="col-12" style={{width:"200%"}}>
          <div class="card">
            <div class="card-body">
                <h5 class="card-title">Display Inquiry</h5>

                {/* <div class="col-12">
                      <button type='button' class="btn btn-primary float-start mb-3 rounded-pill"><i class="bi bi-person-plus"></i><b> Client Appointment</b></button>
                </div>    */}

                <table id="example" class="table table-striped dt-responsive nowrap w-100">
                
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Your Name</th>
                            <th>Doctor Name</th>
                            <th>Inquiry title</th>
                            <th>Inquiry Date</th>
                            <th>Message</th>
                            <th>Reply Inquiry</th>
                        </tr>
                </thead>
               
                <tbody>
                    {inquirys.map((inquiry)=>
                      <>
                        <tr>
                            <th>{i++}</th>
                            <td>{inquiry.client_name}</td>
                            <td>{inquiry.name}</td>
                            <td>{inquiry.inquiry_title}</td>
                            <td>{inquiry.inquiry_date}</td>
                            <td>{inquiry.message}</td>
                            <td>{inquiry.replay_inquiry != "" ? inquiry.replay_inquiry : <p>Waiting... </p>}</td>
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
