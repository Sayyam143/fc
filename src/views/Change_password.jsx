import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Change_password() {
    const [client_id,setClientId] = useState(sessionStorage.getItem("user"));
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [cperror,setCperror] = useState({});
    const [email1,setEmail1] = useState('');
    const navigate = useNavigate();
    
    const cp_validation = () => {
        const error = {};
        if(!password)
        {
            error.password = "Password are Required";
        }
        if(!cpassword)
        {
            error.cpassword = "Confirm password are Required";
        }
        if(!email1)
        {
            error.email1 = "Email is Required";
        }
        else if(password != cpassword)
        {
            error.password = "Password are not same";
        }
        if(password && password.length < 8)
        {
            error.password = "Enter must be 8 character password";
        }
        if(cpassword && cpassword.length < 8)
        {
            error.cpassword = "Enter must be 8 character password";
        }
        return error;
    }

    const btnchangepassword = async(e) => {
        e.preventDefault();
        setCperror(cp_validation());
        if(password && cpassword && password == cpassword && password.length >=8 && cpassword.length >=8)
        {
            try{
                const res = await axios.get("http://localhost:8867/backend/change_password/"+client_id,{
                    params:{
                        email: email1
                    }
                });
                if(res.data <= 0)
                {
                    alert("This email address is not exist");
                }
                else
                {
                    if(res.data == email1)
                    {
                        const entry_by = client_id;
                        const res = await axios.put("http://localhost:8867/backend/change_password/" + client_id,{
                            password,
                            entry_by
                        });
                        alert(res.data);
                        navigate("/");
                    }
                }
                
            }
            catch(err){
                alert(err);
            }
        }
        else
        {
            setCperror(cp_validation());
        }
    }
  return (
    <div>
        {/* <section class="page-title bg-1">
        <div class="container">
            <div class="row">
            
            <div class="col-md-12">
                <div class="block text-center">
                <h1 class="text-capitalize mb-5 text-lg">Change Password</h1>
                </div>
            </div>
            </div>
        </div>
        </section> */}

      <div class="row h-100 justify-content-md-start mb-5">
        <div className="col-md-6">
            <img src="../images/bg/change-password-01.jpg" alt="" width="100%" height="100%" />
        </div>
                <div className="col-md-4 mt-5 ml-5">
				<div class="card-wrapper mr-5">
					<div class="card fat mt-4">
						<div class="card-body">
							<h4 class="card-title">Change Password</h4>
							<form method="POST" class="my-login-validation" novalidate="">
                                <div className='row'>
								    <div class="form-group col-12">
								    	<label for="inquiry-title">Email-ID</label>
								    	<input id="inquiry-title" type="text" class="form-control rounded-pill" name="inquiry-title" onChange={(e)=>setEmail1(e.target.value)} placeholder='Enter your email-id'/>
								    	<p style={{color: 'red'}}>{cperror.email1}</p>
								    </div>
                           
								    <div class="form-group col-12">
								    	<label for="inquiry-title">Password</label>
								    	<input id="inquiry-title" type="password" class="form-control rounded-pill" name="inquiry-title" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter new password'/>
								    	<p style={{color: 'red'}}>{cperror.password}</p>
								    </div>

                                    <div class="form-group col-md-12">
								    	<label for="inquiry-title">Confirm Password</label>
								    	<input id="inquiry-title" type="password" class="form-control rounded-pill" name="inquiry-title" onChange={(e)=>setCpassword(e.target.value)} placeholder='Enter Confirm password'/>
								    	<p style={{color: 'red'}}>{cperror.cpassword}</p>
								    </div>

                                </div>
                                

								<div class="form-group m-0">
                                    <center>
									    <button type="submit" class="btn btn-primary col-6" onClick={btnchangepassword}>
									    	save
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
  )
}
