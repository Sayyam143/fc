import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function  () {

    const [category,setCategory] = useState([]);
    const [blog,setBlog]=useState([]);

    useEffect(()=>{
        fetchCategory();
        fetchBlog();
    })

    const fetchCategory = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/category");
            setCategory(res.data);
        }   
        catch(err){
            alert(err);
        }
    }

    const fetchBlog = async() => {
        try{
            const res = await axios.get("http://localhost:8867/backend/join_blog");
            setBlog(res.data);
        }   
        catch(err){
            alert(err);
        }
    }

  return (
    <div>
  

    <section class="section blog-wrap">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
        {blog.map((blog_detail)=>  
        <>
        {blog_detail.status>0 && blog_detail.status<2?   
        <div class="col-lg-12 col-md-12 mb-5">
            <div class="blog-item">
                <div class="blog-thumb">
                    <img src={"../upload/" + blog_detail.blog_image} alt="" width={500} height={100} class="img-fluid " style={{borderRadius: "25px"}}/>
                </div>

                <div class="blog-item-content">
                    <div class="blog-item-meta mb-3 mt-4">
                        <span class="text-black text-capitalize mr-3"><i class="icofont-calendar mr-1"></i> 28th January</span>
                        <span class="text-black text-capitalize mr-3">Lawyer Name: <b>{blog_detail.name}</b></span>
                    </div> 

                    <h2 class="mt-3 mb-3"><b>{blog_detail.blog_title}</b></h2>
                    
                    <p class="mb-4">{blog_detail.blog_desc}</p>

                      </div>
            </div>
        </div>
        :""}
        </>
        )}
    </div>
                </div>
                  
            </div>

            <div class="row mt-5">
                <div class="col-lg-8">
                    <nav class="pagination py-2 d-inline-block">
                        <div class="nav-links">
                            <span aria-current="page" class="page-numbers current">1</span>
                            <a class="page-numbers" href="#">2</a>
                            <a class="page-numbers" href="#">3</a>
                            <a class="page-numbers" href="#"><i class="icofont-thin-double-right"></i></a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </section>

    </div>
  )
}
