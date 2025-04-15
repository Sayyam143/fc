import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const navigate = useNavigate();
    const [client_id,setClientId] = useState(sessionStorage.getItem("user"));
    const [client_name,setClientName] = useState("");
    const [mobile_no,setMobileno] = useState('');
    const [email,setEmail] = useState('');
    const [dob,setDob] = useState('');
    const [age,setAge] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('India');
    const [formerror,setFormerror] = useState({});
    
    useEffect(()=>{
        if(client_id)
        {
            display_client();
        }
    },[])

    const validation = () => {
        const error = {};
        if(!client_name)
        {
            error.client_name = "Name is Required";
        }
        if(!mobile_no)
        {
            error.mobile_no = "Mobile no is Required";
        }
        else if(mobile_no.length != 10)
        {
            error.mobile_no = "Enter 10 digit mobile no";
        }
        if(!email)
        {
            error.email = "Email is Required";
        }
        if(!dob)
        {
            error.dob = "Dob date is Required";
        }
        if(!age)
        {
            error.age = "Age is Required";
        }
        if(!address)
        {
            error.address = "Address is Required";
        }
        if(!city)
        {
            error.city = "City is Required";
        }
        
        return error;
    }

    const btnEditClient = async(e) => {
        e.preventDefault();
        setFormerror(validation());
        if(client_name && mobile_no && mobile_no.length == 10 && email && dob && age && address && city)
        {   
            try{
                const entry_by = client_id;
                const res = await axios.put("http://localhost:8867/backend/client/" + client_id,{
                    client_name,
                    mobile_no,
                    email,
                    dob,
                    age,
                    address,
                    city,
                    country,
                    entry_by
                });
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

    const display_client = async() =>{
        try{
            const res = await axios.get("http://localhost:8867/backend/client/" + client_id);
            setClientName(res.data.client_name);
            setMobileno(res.data.mobile_no);
            setEmail(res.data.email);
            setDob(res.data.dob);
            setAge(res.data.age);
            setAddress(res.data.address);
            setCity(res.data.city);
        }
        catch(err){
            alert(err);
        }
    }

  return (
    <div>
        <section class="page-title bg-1">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="block text-center">
							<h1 class="text-capitalize mb-5 text-lg">Profile</h1> 
						</div>
					</div>
				</div>
			</div>
		</section>

        <section class="h-100 mb-5">
		<div class="container h-100">

			<div class="row h-100 justify-content-md-start">
                <div className="col-md-6 mt-5">
                    <img src="../images/bg/profile-img.jpg" alt="" width="100%" height="100%" />
                </div>

                <div className="col-md-6">
				<div class="card-wrapper">
					<div class="card fat mt-4">
						<div class="card-body">
							<h4 class="card-title">Mange Our Profile</h4>
							<form method="POST" class="my-login-validation" novalidate="">
                                <div className='row'>
								    <div class="form-group col-md-6">
								    	<label for="inquiry-title">Client Name</label>
								    	<input type="text" class="form-control rounded-pill" defaultValue={client_name} name="client_name" onChange={(e)=>setClientName(e.target.value)} placeholder='Enter your name'/>
								    	<p style={{color: 'red'}}>{formerror.client_name}</p>
								    </div>
                           
								    <div class="form-group col-md-6">
								    	<label for="inquiry-title">Mobile no</label>
								    	<input id="inquiry-title" type="text" class="form-control rounded-pill" defaultValue={mobile_no} name="inquiry-title" onChange={(e)=>setMobileno(e.target.value)} placeholder='Enter your mobile no'/>
								    	<p style={{color: 'red'}}>{formerror.mobile_no}</p>
								    </div>

                                </div>

                                <div className="row">
                                    <div class="form-group col-md-6">
								    	<label for="inquiry-title">Email-ID</label>
								    	<input id="inquiry-title" type="email" class="form-control rounded-pill" defaultValue={email} name="inquiry-title" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email-id'/>
								    	<p style={{color: 'red'}}>{formerror.email}</p>
								    </div>
                                
                                    <div class="form-group col-md-6">
								    	<label for="inquiry-message">Date of Birth</label>
								    	<input id="inquiry-message" type="date" class="form-control rounded-pill" defaultValue={dob} name="inquiry-message" onChange={(e)=>setDob(e.target.value)} />
								    	<p style={{color: 'red'}}>{formerror.dob}</p>
								    </div>
                                </div>

                                <div className="row">
                                    <div class="form-group col-md-6">
								    	<label for="inquiry-message">Age</label>
								    	<input id="inquiry-message" type="text" class="form-control rounded-pill" defaultValue={age} name="inquiry-message" onChange={(e)=>setAge(e.target.value)} placeholder='Enter your age'/>
								    	<p style={{color: 'red'}}>{formerror.age}</p>
								    </div>

                                    <div class="form-group col-md-6">
								    	<label for="inquiry-title">Address</label>
								    	<input id="inquiry-title" type="text" class="form-control rounded-pill" defaultValue={address} name="inquiry-title" onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your address'/>
								    	<p style={{color: 'red'}}>{formerror.address}</p>
								    </div>
                                </div>

                                <div className='row'>                                
                                    <div class="form-group col-md-6">
								    	<label for="inquiry-message">City</label>
								    	<input id="inquiry-message" type="text" class="form-control rounded-pill" defaultValue={city}  name="inquiry-message" onChange={(e)=>setCity(e.target.value)} placeholder='Enter your city'/>
								    	<p style={{color: 'red'}}>{formerror.city}</p>
								    </div>

                                    <div class="form-group col-md-6">
								    	<label for="inquiry-message">Country</label>
								    	<input id="inquiry-message" type="text" class="form-control bg-white rounded-pill" defaultValue={country} name="inquiry-message" disabled/>
								    	<p style={{color: 'red'}}></p>
								    </div>
                                </div>

								<div class="form-group m-0">
                                    <center>
									    <button type="submit" class="btn btn-primary col-md-3" onClick={btnEditClient}>
									    	Save
									    </button>
                                    </center>
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
