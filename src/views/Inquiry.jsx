import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

export default function Inquiry() {
    const client_id = sessionStorage.getItem("user");
    const location = useLocation();
    const lawyerId = location.pathname.split("/")[2];
    const [lawyer,setLawyer] = useState([]);
    const [inquiry_title,setInquiry_title] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const [formerror,setFormerror] = useState({});

    useEffect(()=>{
        if(lawyerId && client_id)
        { 
            fetchLawyer();
        }
    })

    const validation = () => {
        const error = {};
        if(!inquiry_title)
        {
            error.inquiry_title = "Inquiry Title is Reqired";
        }
        if(!message)
        {
            error.message = "Message is Required";
        }
        return error;
    }

    const fetchLawyer = async() => {
        try{
        
            const res = await axios.get("http://localhost:8867/backend/lawyer_join_appointment/"+lawyerId)
            setLawyer(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    const btnInquiry = async(e) => {
        if(client_id)
        {
            e.preventDefault();
            setFormerror(validation());
            if(inquiry_title && message)
            {
                const lawyer_id = lawyerId;
                const entry_by = client_id;
                try{
                    const res = await axios.post("http://localhost:8867/backend/add_client_inquiry",{
                        client_id,
                        lawyer_id,
                        inquiry_title,
                        message,
                        entry_by
                    })
                    alert(res.data);
                    navigate("/");
                }
                catch(err){
                    alert(err);
                }
            }
            else
            {
                setFormerror(validation());
            }            
        }
        else
        {
            navigate("/Login");
        }
    }
  return (
    <div>
        

        <section class="h-100 mb-5">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
                <div className="col-md-6 float-left">
					<img src="../images/bg/inquiry-icon.jpg" alt="" width="100%" height="100%" />
				</div>
                <div className="col-md-5">
				    <div class="card-wrapper">
					<div class="brand mt-5">
                        <center>
						    {/* <img src="img/logo.png" width={300} alt="logo"/> */}
                        </center>
					</div>
					<div class="card fat mt-4">
						<div class="card-body">
							<h4 class="card-title">Inquiry of Doctor</h4>
							<form method="POST" class="my-login-validation" novalidate="">
								<div className='row'>
                                <div class="form-group col-md-6">
								    	<label for="name">Doctor Name</label>
								    	<input id="name" type="text" class="form-control bg-white rounded-pill" name="name" defaultValue={lawyer.name} disabled/>
								    </div>

								    <div class="form-group col-md-6">
								    	<label for="mobileno">Doctor Category</label>
								    	<input id="mobileno" type="text" class="form-control bg-white rounded-pill" name="mobileno" defaultValue={lawyer.category_name} disabled/>
								    </div>
                                </div>
                                
                                <div className='row'>
								    <div class="form-group col-12">
								    	<label for="inquiry-title">Inquiry Title</label>
								    	<input id="inquiry-title" type="text" class="form-control rounded-pill" name="inquiry-title" onChange={(e)=>setInquiry_title(e.target.value)} placeholder='Enter Inquiry Title'/>
								    	<p style={{color: 'red'}}>{formerror.inquiry_title}</p>
								    </div>
                                </div>

                                <div className='row'>
                                    <div class="form-group col-12">
								    	<label for="inquiry-message">Inquiry Message</label>
								    	<textarea  id="inquiry-message" type="text" class="form-control" name="inquiry-message" onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Inquiry Message'/>
								    	<p style={{color: 'red'}}>{formerror.message}</p>
								    </div>
                                </div>

								<div class="form-group m-0">
									<button type="submit" class="btn btn-primary btn-block" onClick={btnInquiry}>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				    </div>
                </div>
			</div>
		</div>
		</section>
    </div>
  )
}
