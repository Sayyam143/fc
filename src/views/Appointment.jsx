import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Appointment() {

    const [contact,setContact_no] = useState([]);
    const [lawyer,setLawyer] = useState([]);
    const [appointment_title,setAppointment_title] = useState('');
    const [appointment_date,setAppointment_date] = useState('');
    const [gender,setGender] = useState('');
    const [message,setMessage] = useState('');
    const [category_name,setCategory_name] = useState('');
    const category_id = sessionStorage.getItem("category")
    const client_id = sessionStorage.getItem("user");
    const location = useLocation();
    const Id = location.pathname.split("/")[2];
    const lawyer_id = Id;

    const navigate = useNavigate();
    const [formerror,setFormerror] = useState({})
    useEffect(()=>{
        fetchcontact();
        if(Id)
        {
            fetchlawyer();
        }
    },[])

    const validation = () => {
       const error = {};
       if(!appointment_title)
       {
            error.appointment_title = "Appointment title is Required";
       }
       if(!appointment_date)
       {
            error.appointment_date = "Appointment Date is Required";
       }
       if(!gender)
       {
            error.gender = "Gender is Required";
       }
       if(!message)
       {
            error.message = "Message is Required";
       }
       return error;
    }

    const fetchcontact = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/contact");
            setContact_no(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    const fetchlawyer = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/lawyer_join_appointment/"+Id);
            setLawyer(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    const sumbit_appointment = async(e) => {
        e.preventDefault();
        setFormerror(validation());
        if(client_id)
        {   
            if(appointment_title && appointment_date && gender && message)
            {
                try{
                    const status = 1;
                    const case_status = 1;
                    const res = await axios.post("http://localhost:8867/backend/client_appointment",{
                        client_id,    
                        lawyer_id,
                        appointment_title,
                        appointment_date,
                        message,
                        gender,
                        category_name,
                        status,
                        case_status,
                        category_id
                    });
                    alert(res.data);
                    navigate("/");
                    // sessionStorage.clear("category");
                }
                catch(err){
                    alert(err)
                }
            }            
        }
        else
        {
            navigate("/Login");
        }
        
    } 

  return (
    <div>
        
        <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-lg-4">
          <div class="mt-3">
            <div class="feature-icon mb-3">
              <i class="icofont-support text-lg"></i>
            </div>
             <span class="h3">Call for an Doctor Service!</span>
              <h2 class="text-color mt-3">{contact.contact_no}</h2>
          </div>
      </div>


      <div class="col-lg-8">
           <div class="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
            <h2 class="mb-2 title-color">Doctor appoinment</h2>
               <form id="#" class="appoinment-form" method="post">
                    <div class="row">
                         <div class="col-lg-6">
                            <div class="form-group">
                                <label><b>Doctor Name</b></label>
                                <input name="time" id="time" type="text" class="form-control bg-white rounded-pill" defaultValue={lawyer.name} disabled/>
                            </div>
                        </div>
                        
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label><b>Doctor Category</b></label>
                                <input name="time" id="time" type="text" class="form-control bg-white rounded-pill" defaultValue={lawyer.category_name} onChange={(e)=>setCategory_name(e.target.value)} disabled/>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label><b>Enter Appointment Title</b></label>
                                <input name="name" id="name" type="text" class="form-control bg-white rounded-pill" placeholder="Enter your appointment related title" onChange={(e)=>setAppointment_title(e.target.value)}/>
                            </div>
                            <p style={{color: 'red'}}>{formerror.appointment_title}</p>
                        </div>

                         <div class="col-lg-6">
                            <div class="form-group">
                                <label><b>Enter Appointment Date</b></label>
                                <input name="date" id="date" type="date" class="form-control bg-white rounded-pill" placeholder="dd/mm/yyyy" onChange={(e)=>setAppointment_date(e.target.value)}/>
                            </div>
                            <p style={{color: 'red'}}>{formerror.appointment_date}</p>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group float-end">
                                <label><b>Select your gender</b></label>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="radio" class="form-radio" value="1" style={{marginRight: '10px', marginLeft: '10px'}} onChange={(e)=>setGender(e.target.value)}/>Male
                                <input type="radio" class="form-radio" value="2" style={{marginRight: '10px', marginLeft: '10px'}} onChange={(e)=>setGender(e.target.value)}/>Female
                            </div>
                            <p style={{color: 'red'}}>{formerror.gender}</p>
                        </div>

                    </div>
                    <div class="form-group-2 mb-4">
                        <label><b>Enter Your Appointment releted message</b></label>
                        <textarea name="message" id="message" class="form-control bg-white " rows="6" placeholder="Your Message" onChange={(e)=>setMessage(e.target.value)}></textarea>
                    </div>
                    <p style={{color: 'red'}}>{formerror.message}</p>

                    <button type="submit" class="btn btn-main btn-round-full" onClick={sumbit_appointment}>Make Appoinment<i class="icofont-simple-right ml-2"></i></button>
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>

  )
}
