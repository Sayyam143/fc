import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';

export default function Login() {

	const [mobile_no,setMobileno] = useState('');
	const [password,setPassword] = useState('');
	const [formerror,setFormerror] = useState({});
	
	const navigate = useNavigate();

	const validation = () => {
		const error = {};
		if(!mobile_no)
		{
			error.mobile_no = "Please enter mobile number";
		}
		else if(mobile_no.length != 10)
		{
			error.mobile_no = "Must be enter 10 digit number";
		}
		if(!password)
		{
			error.password = "Please enter password";
		}
		else if(password.length < 8)
		{
			error.password = "Must be enter 8 character";
		}
		return error;
	}

	const btnlogin = async(e) => {
		e.preventDefault();
		setFormerror(validation());
		if(mobile_no && password && mobile_no.length == 10 && password.length >= 8)
		{
			try{
				const res = await axios.get("http://localhost:8867/backend/client_login",{
					params:{
						mobile_no: mobile_no,
						password: password
					}
				});
				if(res.data>0)
				{
					
					sessionStorage.setItem("user",res.data);
					window.location.reload();
					navigate("/");
								
				}	
				else
				{
					alert("Mobile number and password are not exist");
					navigate("/Registration")
				}
			}
			catch(err)
			{
				alert(err);
			}
		}
	}

  return (
    <div>
		<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div className="col-md-6 float-left">
					<img src="../images/bg/login-01.jpg" alt="" width="100%" height="100%" />
				</div>
				<div className="col-md-6 mt-5">
				<div class="card-wrapper">
					<div class="card fat col-md-8 float-left">
						<div class="card-body">
							<h4 class="card-title text-center" style={{color: 'red'}}>Patient Login</h4>
							<form method="POST" class="my-login-validation" novalidate="">
								<div class="form-group">
									<label for="mobileno">Enter Mobile No</label>
									<input id="mobileno" type="number" class="form-control rounded-pill" name="mobileno" onChange={(e)=>setMobileno(e.target.value)} placeholder='Enter Mobile no'/>
									<p style={{color: 'red'}}>{formerror.mobile_no}</p>
								</div>

								<div class="form-group">
									<label for="password">Password</label>
									<input id="password" type="password" class="form-control rounded-pill" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
									<p style={{color: 'red'}}>{formerror.password}</p>
								</div>
								<div class="form-group">
									<div className="text-right"><Link to="/Forget_password">Forget Password</Link></div>
								</div>
								<div class="form-group m-0">
									<button type="submit" class="btn btn-primary btn-block" onClick={btnlogin}>
										Login
									</button>
								</div>
								<div class="mt-4 text-center">
									Don't have an account? <Link to="/Registration">Create One</Link>
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
