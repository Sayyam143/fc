import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
export default function Header() {

	const [contact,setContact]=useState([]);
	const client_id = sessionStorage.getItem("user");
	const navigate = useNavigate();
	useEffect(()=>{
		fetchcontact();	
	},[])

	const fetchcontact = async() => {
		try{
			const res = await axios.get("http://localhost:8867/backend/contact");
			setContact(res.data);
		}
		catch(err){
			alert(err);
		}
	}

	const btnsigout = () =>{
		sessionStorage.clear("user");
		window.location.reload();
		navigate("/");
	}

  return (
    <div>
	<header>
	<div class="header-top-bar">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6">
					<ul class="top-bar-info list-inline-item pl-0 mb-0">
						<li class="list-inline-item"><a ><i class="icofont-support-faq mr-2"></i>{contact.email}</a></li>
						<li class="list-inline-item"><a><i class="icofont-location-pin mr-2"></i>{contact.address}</a></li>
					</ul>
				</div>
				<div class="col-lg-6">
					<div class="text-lg-right top-right-bar mt-2 mt-lg-0">
						<a  >
							<i class="icofont-telephone"></i>
							<span class="h6">{contact.contact_no}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<nav class="navbar navbar-expand-lg navigation" id="navbar">
		<div class="container">
			<a class="navbar-brand" href="index.html">
				<img src="images/logo.png" alt="" width={130} class="img-fluid"/>
			</a>

			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false" aria-label="Toggle navigation">
			<span class="icofont-navigation-menu"></span>
		</button>
	
		<div class="collapse navbar-collapse" id="navbarmain">
			<ul class="navbar-nav ml-auto">
			<li class="nav-item active">
				<Link class="nav-link" to="/">Home</Link>
			</li>
			<li class="nav-item"><Link class="nav-link" to="/About">About</Link></li>
			<li class="nav-item"><Link class="nav-link" to="/Services">Services</Link></li>
			<li class="nav-item"><Link class="nav-link" to="/Blog">Blog</Link></li>
			<li class="nav-item"><Link class="nav-link" to="/Contact">Contact</Link></li>
			
			{client_id ?
				<div class="dropdown">
					<a class="btn dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{color:'black'}}>
						Display
					</a>

					<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<Link to={"/Appointment_status/" + client_id}><li class="dropdown-item">Appoinment Status</li></Link>
						<Link to={"/Display_Inquiry/" + client_id}><li class="dropdown-item">Display Inquiry</li></Link>
						<Link to={"/Profile/" + client_id}><li class="dropdown-item">Manage Profile</li></Link>
						<Link to={"/Change_password/" + client_id}><li class="dropdown-item">Change Password</li></Link>
						<Link onClick={btnsigout}><li class="dropdown-item">Logout</li></Link>
					</ul>
				</div>
			:""}		
			
			{!client_id ? <li class="nav-item"><Link class="nav-link" to="/Login">Login</Link></li>
			: <li class="bg-danger rounded-pill"></li>	}					
			</ul>
		</div>
		</div>
	</nav>
	</header>
    </div>
  )
}
