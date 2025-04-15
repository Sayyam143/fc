import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Footer() {

	const [contact_footer,setContact_footer] = useState([])

	useEffect(()=>{
		contact_display();
	},[]);

	const contact_display = async() =>{
		try{
			const res = await axios.get("http://localhost:8867/backend/contact");
			setContact_footer(res.data)
		}
		catch(err){
			alert(err);
		}
	}
  return (
    <div>
      <footer className="footer section gray-bg">
	<div className="container">
		<div className="row">
			<div className="col-lg-4 mr-auto col-sm-6">
				<div className="widget ">
					<div className="logo">
						<img src="images/logo.png" alt="" className="img-fluid"/>
					</div>
					
				</div>
			</div>

			<div className="col-lg-2 col-md-6 col-sm-6">
				<div className="widget mb-5 mb-lg-0">
					<h4 className="text-capitalize">Navigation</h4>
					

					<ul className="list-unstyled footer-menu lh-35">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/Services">Service</Link></li>
						<li><Link to="/Blog">Blog</Link></li>
						<li><Link to="/About">About Us</Link></li>
						<li><Link to="/Contact">Contact Us</Link></li>
					</ul>
				</div>
			</div>

			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="widget widget-contact mb-5 mb-lg-0">
					<h4 className="text-capitalize mb-3">Get in Touch</h4>
					<div className="divider mb-4"></div>

					<div className="footer-contact-block mb-4">
						<div className="icon d-flex align-items-center">
							<i className="icofont-email mr-3"></i>
							<span className="h6 mb-0">Support Available for 24/7</span>
						</div>
						<h4 className="mt-2"><a href={`mailto:${contact_footer.email}?subject=&body=`}>{contact_footer.email}</a></h4>
					</div>

					<div className="footer-contact-block">
						<div className="icon d-flex align-items-center">
							<i className="icofont-support mr-3"></i>
							<span className="h6 mb-0">Mon to Fri : 08:30 - 18:00</span>
						</div>
						<h4 className="mt-2"><a href={contact_footer.contact_no}>{contact_footer.contact_no}</a></h4>
					</div>
				</div>
			</div>
		</div>
		
		<div className="footer-btm py-4 mt-5 text-center">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-12">
					<div className="copyright">
						&copy; Design and <span className="text-color">Development</span> by L.J Group 74
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-4">
					<a className="backtop js-scroll-trigger" href="#top">
						<i className="icofont-long-arrow-up"></i>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
    </div>
  )
}
