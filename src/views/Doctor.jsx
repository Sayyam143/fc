import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation,Link } from 'react-router-dom';
export default function Lawyer() {

    const [lawyer,setLawyer]=useState([]);
	const [category,setCategory]=useState([]);
    const location = useLocation();
    const Id = location.pathname.split("/")[2];
	const client_id = sessionStorage.getItem("user");

	useEffect(()=>{
		if(Id)
		{
			fetchlawyer();
			fetchcategory();
		}
	},[])
    

    const fetchlawyer = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/lawyer_category/"+Id);
            setLawyer(res.data);
        }
        catch(err){
            alert(err);
        }
    }

	const fetchcategory = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/category/"+Id)
			setCategory(res.data);
		}
		catch(err){
			alert(err);
		}
	}

  return (
	<div>



		<section class="section service white-bg">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-7 text-center">
						<div class="section-title">
							<h2>{category.category_name} Doctor</h2>
							<div class="divider mx-auto my-4"></div>
						</div>
					</div>
				</div>
				
				<div class="row">
					{lawyer.map((lawyer_category)=>
					<>
					{lawyer_category.status>0 && lawyer_category.status<2?
					<div class="col-lg-4 col-md-6 col-sm-6">
						<div class="service-item mb-4 Larger shadow">
							<div class="icon d-flex align-items-center">
								<img src={"../upload/"+lawyer_category.image}  width={80} height={80} alt="" class="rounded-circle" style={{border: "5px solid #eff0f3"}}/>
								<h4 class="mt-3 mb-3">{lawyer_category.name}</h4>
							</div>
							<div class="content">
								<p><b>Category: </b>{category.category_name}</p>
								<p><b>Email-Id: </b>{lawyer_category.email}</p>
								<p><b>City: </b>{lawyer_category.city}</p>
								<p><b>Country: </b>{lawyer_category.country}</p>
							</div>
							<div>
								<center>
									{!client_id? <button type='submit' class='btn btn-primary'><Link to={"/Appointment/"+lawyer_category.lawyer_id} style={{color: 'white'}}>Make Appointment</Link></button>:
									<>
										<button type='submit' class='btn btn-primary'><Link to={"/Appointment/"+lawyer_category.lawyer_id + sessionStorage.setItem("category",Id)} style={{color: 'white'}}>Make Appointment</Link></button>
										<button type='submit' class='btn btn-primary mt-2'><Link to={"/Inquiry/"+lawyer_category.lawyer_id} style={{color: 'white'}}>Inquiry</Link></button>
									</>
									}
								</center>
							</div>
						</div>
					</div>
					:""}
					</>
					)}	
				</div>
			</div>
		</section>
</div>
  )
}
