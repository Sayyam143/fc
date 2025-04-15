import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const [contact_form,setContact_form]=useState([]);
    const id = sessionStorage.getItem("user");
    /* Feedback variable decalration section */ 
    const client_id = id;
    const [feedback_title,setFeedback_title]=useState('');
    const [message,setMessage]=useState('');
    const [status,setStatus]=useState(1); 
    const entry_by = id;
    const navigate = useNavigate();

    const [formerror,setFormerror] = useState({});

    useEffect(()=>{
        contact_display();
    },[])

    const validation = () =>{
        const error = {};
        if(!feedback_title)
        {
            error.feedback_title = "Please enter feedback title";
        }
        if(!message)
        {
            error.message = "Please enter feedback message";
        }
        return error;
    }

    const btnheandle = async(e) => {
        if(id)
        {
            try{
                e.preventDefault();
                setFormerror(validation());
                if(feedback_title && message)
                {
                    insertfeedback();
                }
            }
            catch(err){
                alert(err);
            }
        }
        else
        {
            navigate("/Login");
        }
        
    }

    const insertfeedback = async() => {
        try{
            const res = await axios.post("http://localhost:8867/backend/feedback",{
                client_id,
                feedback_title,
                message,
                status,
                entry_by
            });
            alert(res.data);
            window.location.reload();
        }
        catch(err){
            alert(err);
        }
    }

    const contact_display = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/contact")
            setContact_form(res.data);
        }
        catch(err){
            alert(err);
        }
    }
  return (
    <div>
        <section class="section contact-info pb-0">
    <div class="container">
    <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="section-title text-center">
                    <h2 class="text-md mb-2">Contact us</h2>
                    <div class="divider mx-auto my-4"></div>
                    <p class="mb-5">Laboriosam exercitationem molestias beatae eos pariatur, similique, excepturi mollitia sit perferendis maiores ratione aliquam?</p>
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-lg-4 col-sm-6 col-md-6">
                <div class="contact-block mb-4 mb-lg-0">
                    <i class="icofont-live-support"></i>
                    <h5>Call Us</h5>
                    {contact_form.contact_no}
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 col-md-6">
            <a href={`mailto:${contact_form.email}?subject=&body`}>
                <div class="contact-block mb-4 mb-lg-0">
                    <i class="icofont-support-faq"></i>
                    <h5>Email Us</h5>
                     {contact_form.email}
                </div>
            </a>
            </div>
            <div class="col-lg-4 col-sm-6 col-md-6">
            <a href={contact_form.location_link}>
                <div class="contact-block mb-4 mb-lg-0">
                    <i class="icofont-location-pin"></i>
                    <h5>Location</h5>
                     {contact_form.address}
                </div>
            </a>
            </div>
        </div>
    </div>
</section>

<section class="contact-form-wrap section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="section-title text-center">
                    <h2 class="text-md mb-2">Feedback</h2>
                    <div class="divider mx-auto my-4"></div>
                    <p class="mb-5">Laboriosam exercitationem molestias beatae eos pariatur, similique, excepturi mollitia sit perferendis maiores ratione aliquam?</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <form id="contact-form" class="contact__form " method="post" action="mail.php">

                    <div class="row">
                        <div class="col-12">
                            <div class="alert alert-success contact__msg" style={{display: "none"}} role="alert">
                                Your message was sent successfully.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <input name="name" id="name" type="text" class="form-control bg-white rounded-pill" placeholder="Enter your Feedback" onChange={(e)=>setFeedback_title(e.target.value)}/>
                                <p style={{color: "red"}}>{formerror.feedback_title}</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-group-2 mb-4">
                        <textarea name="message" id="message" class="form-control bg-white" rows="5" placeholder="Enter your message" onChange={(e)=>setMessage(e.target.value)}></textarea>
                        <p style={{color: "red"}}>{formerror.message}</p>
                    </div>

                    <div class="text-center">
                        <input class="btn btn-main btn-round-full" name="submit" type="submit" value="Send Messege" onClick={btnheandle}></input>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>


        {/* <div class="google-map ">
            <div id="map"></div>
        </div> */}
    </div>
  )
}
