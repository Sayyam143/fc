import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Ragistration() {

    const [client_name,setClient_name] = useState('');
    const [mobile_no,setMobileno] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const ragistration = async() => {
        try{
            const res = await axios.post("http://localhost:8867/backend/client_login",{
                client_name,
                mobile_no,
                email,
                password
            })
            alert(res.data);
            navigate("/Registration ");
        }   
        catch(err){
            alert(err);
        }
    }
  return (
    <div>
		<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="brand mt-5">
                        <center>
						    <img src="img/logo.png" width={300} alt="logo"/>
                        </center>
					</div>
					<div class="card fat mt-4">
						<div class="card-body">
							<h4 class="card-title">Ragistration</h4>
							<form method="POST" class="my-login-validation" novalidate="">
								<div className='row'>
                                <div class="form-group col-md-6">
								    	<label for="name">Name</label>
								    	<input id="name" type="text" class="form-control" name="password" onChange={(e)=>setClient_name(e.target.value)}/>
								    	<div class="invalid-feedback">
								    		Password is required
								    	</div>
								    </div>

								    <div class="form-group col-md-6">
								    	<label for="mobileno">Mobile No</label>
								    	<input id="mobileno" type="text" class="form-control" name="password" onChange={(e)={ragistration}}/>
								    	<div class="invalid-feedback">
								    		Password is required
								    	</div>
								    </div>
                                </div>
                                
                                <div className='row'>
                                    <div class="form-group col-md-6">
								    	<label for="email">Email Id</label>
								    	<input id="email" type="text" class="form-control" name="password" required data-eye/>
								    	<div class="invalid-feedback">
								    		Password is required
								    	</div>
								    </div>

								    <div class="form-group col-md-6">
								    	<label for="password">Password</label>
								    	<input id="password" type="password" class="form-control" name="password" required data-eye/>
								    	<div class="invalid-feedback">
								    		Password is required
								    	</div>
								    </div>
                                </div>

                                <div className='row'>
                                    <div class="form-group col-md-12">
								    	<label for="password">Confirm Password</label>
								    	<input id="password" type="password" class="form-control" name="password" required data-eye/>
								    	<div class="invalid-feedback">
								    		Password is required
								    	</div>
								    </div>
                                </div>
								<div class="form-group">
									<div class="custom-checkbox custom-control">
										<input type="checkbox" name="remember" id="remember" class="custom-control-input"/>
										<label for="remember" class="custom-control-label">Remember Me</label>
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
  )
}
