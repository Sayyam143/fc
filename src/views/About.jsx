import React, { useEffect,useState } from 'react'
import axios from 'axios';

export default function About() {
	const[description,setDescription]=useState('');	
	useEffect(()=>{
		fatchabout();
	})
	const fatchabout=async()=>{
		try
		{
				 const res=await axios.get("http://localhost:8867/backend/about");
				 setDescription(res.data.description);
		}
		catch(err)
		{
				 alert(err);
		}
	  }
  return (
    <div>
		 
      <section class="section testimonial">
	<div class="container">
		<div class="row">
			<div class="col-lg-6 offset-lg-6">
				<div class="section-title">
					<h2 class="mb-4">What they say about us</h2>
					<div class="divider  my-4"></div>
				</div>
			</div>
		</div>
		<div class="row align-items-center">
			<div class="col-lg-6 testimonial-wrap offset-lg-6">
				<div class="testimonial-block">
					<div class="client-info ">
						<h4>{description}</h4>
					</div>
					<i class="icofont-quote-right"></i>
					
				</div>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}
