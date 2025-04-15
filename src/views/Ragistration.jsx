import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
export default function Registration() {

    const [clients,setClients] = useState([]);

    const [client_name,setClient_name] = useState('');
    const [mobile_no,setMobileno] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [formerror,setFormerror] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        check_clients();
    },[]);

    const validation = () => {
        const error = {};
        if(!client_name)
        {
            error.client_name = "Client name is required";
        }
        if(!mobile_no)
        {
            error.mobile_no = "Mobile number is reqired";
        }
        else if(mobile_no.length != 10)
        {
            error.mobile_no = "Mobile number are must be enter 10 digit";
        }
        if(!email)
        {
            error.email = "Email id is required";
        }
        if(!password)
        {
            error.password = "Password is required";
        }
        if(!cpassword)
        {
            error.cpassword = "Cofirm password is required";
        }
        else if(password.length < 8)
        {
            error.password = "Password are must be 8 character";
        }
        else if(cpassword.length < 8)
        {
            error.cpassword = "Cofirm Password are must be 8 character";
        }
        else if(password != cpassword)
        {
            error.cpassword = "Password and Confirm Password are not same";
        }
        return error;
    }

    const check_clients = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/client");
            setClients(res.data[0]);
        }
        catch(err){
            alert(err);
        }
    }

    const ragistration = async(e) => {
        e.preventDefault();
        setFormerror(validation());
        if(client_name && mobile_no && email && password && cpassword && password.length >= 8 && cpassword.length >= 8 && mobile_no.length == 10)
        {
            if(password == cpassword)
            {
                try{
                    if(clients.mobile_no != mobile_no)
                    {
                        if(clients.email != email)
                        {
                            const res = await axios.post("http://localhost:8867/backend/client_login",{
                                client_name,
                                mobile_no,
                                email,
                                password
                            });
                            alert(res.data);
                            navigate("/Login")
                        }
                        else
                        {
                            alert("This Email Id '" + email + "' is already existing please enter another Email Id");
                        }                       
                    }
                    else
                    {
                        alert("This mobile no '" + mobile_no + "' is already existing please enter another mobile no");
                    }
                    
                }
                catch(err)
                {
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
            setFormerror(validation());
        }
    }
  return (
    <div>
      <div>
		<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
                <div className="col-md-6 float-left">
					<img src="../images/bg/Ragistration-01.jpg" alt="" width="100%" height="100%" />
				</div>
				<div class="card-wrapper mt-3">
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title text-center" style={{color:'red'}}>Patient Registration</h4>
							<form method="POST" class="my-login-validation" novalidate="">
								<div className='row'>
                                <div class="form-group col-md-6">
								    	<label for="name">Name</label>
								    	<input id="name" type="text" class="form-control rounded-pill" name="name" onChange={(e)=>setClient_name(e.target.value)} placeholder='Enter name'/>
								    	<p style={{color: 'red'}}>{formerror.client_name}</p>
								    </div>

								    <div class="form-group col-md-6">
								    	<label for="mobileno">Mobile No</label>
								    	<input id="mobileno" type="text" class="form-control rounded-pill" name="mobileno" onChange={(e)=>setMobileno(e.target.value)} placeholder='Enter Mobile no'/>
								    	<p style={{color: 'red'}}>{formerror.mobile_no}</p>
								    </div>
                                </div>
                                
                                <div className='row'>
                                    <div class="form-group col-md-6">
								    	<label for="email">Email Id</label>
								    	<input id="email" type="text" class="form-control rounded-pill" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email Id'/>
								    	<p style={{color: 'red'}}>{formerror.email}</p>
								    </div>

								    <div class="form-group col-md-6">
								    	<label for="password">Password</label>
								    	<input id="password" type="password" class="form-control rounded-pill" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
								    	<p style={{color: 'red'}}>{formerror.password}</p>
								    </div>
                                </div>

                                <div className='row'>
                                    <div class="form-group col-md-12">
								    	<label for="password">Confirm Password</label>
								    	<input id="password" type="password" class="form-control rounded-pill" name="password" onChange={(e)=>setCpassword(e.target.value)} placeholder='Enter Confirm Password'/>
								    	<p style={{color: 'red'}}>{formerror.cpassword}</p>
								    </div>
                                </div>

								<div class="form-group m-0">
									<button type="submit" class="btn btn-primary btn-block" onClick={ragistration}>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		</section>
    </div>
    </div>
  )
}
