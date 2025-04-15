import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function Services() {

    const [category,setCategory]=useState([]);

    useEffect(()=>{
        fatchCategory();
    },[])

    const fatchCategory = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/category")
            setCategory(res.data)
        }
        catch(err){
            alert(err);
        }
    }
  return (
    <div>
   
  

    <section class="section service-2">
        <div class="container">
            <div class="row">
            {category.map((category_detail)=>
            <>
			{category_detail.status>0 && category_detail.status<2?
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="service-block mb-5" style={{height: "80%"}}>
                        <div style={{width: "100%" ,marginTop:"20%"}}>
                            <img src={'../upload/' + category_detail.category_image} alt="hello" class="img-fluid img-thumbnail"/>
                        </div>
                        <div class="content">
                            <h4 class="mt-4 title-color">{category_detail.category_name}</h4>
                            <p class="mb-4">{category_detail.description}</p>
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
