import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Side() {

	const [contact_no,setContact_no]=useState([]);
	const [category,setCategory]=useState([]);
	const [lawyer,setLawyer]=useState([]);
	

	useEffect(()=>{
		fetchcontact();
		fetchcategory(); // Fetch Lawyer Category
		fetchlawyer(); //Fetch Lawyer
		fetchlawyer_category(); // Fetch Lawyer Category
	},[])

	const fetchcontact = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/contact");
			setContact_no(res.data);
		}
		catch(err){
			alert(err);
		}
	}

	const fetchcategory = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/category");
			setCategory(res.data);
		}
		catch(err){
			alert(err);
		}
	}

	const fetchlawyer = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/lawyer");
			setLawyer(res.data);
		}
		catch(err){
			alert(err);
		}
	}

	const fetchlawyer_category = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/join_query_lawyer");
			setLawyer(res.data);
		}
		catch(err){
			alert(err);
		}
	}

  return (
    <div>
		
      <section class="banner">
        
	<div class="container">
		<div class="row">
			<div class="col-lg-6 col-md-12 col-xl-7">
				<div class="block">
				
					
					<h1 class="mb-3 mt-3">HealthHub – Your Trusted Healthcare Partner</h1>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="features gray-bg">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="feature-block d-lg-flex">
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-surgeon-alt"></i>
						</div>
						<span>24 Hours Service</span>
						<h4 class="mb-3">Online Appoinment</h4>
						<p class="mb-4">Get all time appointment.</p>
					</div>
				
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-ui-clock"></i>
						</div>
						<span>Timing schedule</span>
						<h4 class="mb-3">Working Hours</h4>
						<ul class="w-hours list-unstyled">
		                    <li class="d-flex justify-content-between">Sun - Wed : <span>8:00 - 17:00</span></li>
		                    <li class="d-flex justify-content-between">Thu - Fri : <span>9:00 - 17:00</span></li>
		                    <li class="d-flex justify-content-between">Sat - sun : <span>10:00 - 17:00</span></li>
		                </ul>
					</div>
				
					<div class="feature-item mb-5 mb-lg-0">
						<div class="feature-icon mb-4">
							<i class="icofont-support"></i>
						</div>
						<span>Help</span>
						<h4 class="mb-3">{contact_no.contact_no}</h4>
						<p>If client can get any need then client can contact to above number.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


 
<section class="section service gray-bg">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-7 text-center">
				<div class="section-title">
					<h2>Make Appointment</h2>
					<div class="divider mx-auto my-4"></div>
					<p>Patient can get easily appointment to Doctor And Doctor can change Patient appointment status</p>
				</div>
			</div>
		</div>
		
		<div class="row">
		{category.map((category_name)=>	
		<>
		{category_name.status>0 && category_name.status<2?
			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-item mb-4">
					<div class="icon d-flex align-items-center">
						<img src={"../upload/" + category_name.category_image}  width={80} height={80} alt="" class="rounded-circle" style={{border: "5px solid #eff0f3"}}/>
						<h4 class="mt-3 mb-3"><Link to={"/Lawyer/" + category_name.category_id}>{category_name.category_name}</Link></h4>
					</div>
					<div class="content">
						{/* <p class="mb-4">{category_name.description}</p> */}
					</div>
				</div>
			</div>
		:""}
		</>
		)}
		
		</div>
	</div>
</section>

<section class="section testimonial-2 white-bg">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-7">
				<div class="section-title text-center">
					<h2>Doctor</h2>
					<div class="divider mx-auto my-4"></div>
					<p>We have introduce to all type of Doctor and Patient can also send mail through Email-id</p>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row align-items-center">
			{lawyer.map((lawyer_detail)=>
			<>
			{lawyer_detail.status>0 && lawyer_detail.status<2?
			<div class="col-md-6 d-flex testimonial-wrap-2">
				
				<div class="testimonial-block style-2  white-bg Larger shadow">
					<i class="icofont-quote-right"></i>
					<div class="testimonial-thumb">
						<img src={"../upload/" + lawyer_detail.image} alt="" class="img-fluid"/>
					</div>
				
					<div class="client-info ">
					
						<h4>{lawyer_detail.category_name}</h4>
					
						<span>{lawyer_detail.name}</span>
						<p>
							<h6>Email Id: <b style={{color: "blue"}}><a href={`mailto:${lawyer_detail.email}?subject=&body`}>{lawyer_detail.email}</a></b></h6>
							<h6> Address: {lawyer_detail.address},{lawyer_detail.city},
							{lawyer_detail.state},{lawyer_detail.country}</h6>
						</p>
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
