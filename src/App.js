import './App.css';
import { useState } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
  Router,
  BrowserRouter,
  Routes,
}from 'react-router-dom';
import Header from './views/Header.jsx';
import Index from './views/Index.jsx';
import Footer from './views/Footer.jsx';
import About from './views/About.jsx';
import Services from './views/Services';
import Blog from './views/Blog.jsx'
import Appointment from './views/Appointment.jsx';
import Contact from './views/Contact.jsx';
import Login from './views/Login.jsx';
import Lawyer from './views/Doctor.jsx';
import Ragistration from './views/Ragistration.jsx';
import Appointment_status from './views/Appointment_status.jsx';
import Inquiry from './views/Inquiry.jsx';
import Profile from './views/Profile.jsx';
import Display_inquiry from './views/Display_inquiry.jsx';
import Change_password from './views/Change_password.jsx';
import Forget_password from './views/Forget_password.jsx';
const Layout = () => {
  return(
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout></Layout>,
//     children:[
//       {
//         path: "/",
//         element: <Home></Home>
//       },
//       {
//         path: "/About",
//         element: <About></About>
//       },
//       {
//         path: "/Lawyer/:id",
//         element: <Lawyer></Lawyer>
//       },
//       {
//         path: "/Services",
//         element: <Services></Services>
//       },
//       {
//         path: "/Blog",
//         element: <Blog></Blog>
//       },
//       {
//         path: "/Appointment/:id",
//         element: <Appointment></Appointment>
//       },
//       {
//         path: "/App",  ?????????????????????????????????????????
//         element: <Contact></Contact>
//       },
//       {
//         path: "/Contact", 
//         element: <Contact></Contact>
//       },
//       {
//         path: "/Login",
//         element: <Login_layout></Login_layout>
//       }
//     ]
//   }
// ])  

function App() {
  const [auth,setAuth] = useState(sessionStorage.getItem("user"));
  // console.log(auth);
  return (
   <div>
    <BrowserRouter>
        {auth?
          <>
          <Layout/>
            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/About' element={<About/>}/>
                <Route path='/Lawyer/:id' element={<Lawyer/>}/>
                <Route path='/Services' element={<Services/>}/>
                <Route path='/Blog' element={<Blog/>}/>
                <Route path='/Appointment/:id' element={<Appointment/>}/>
                <Route path='/Appointment_status/:id' element={<Appointment_status/>}/>
                <Route path='/Contact' element={<Contact/>}/>
                <Route path='/Inquiry/:id' element={<Inquiry/>}/>
                <Route path='/Display_Inquiry/:id' element={<Display_inquiry/>}/>
                <Route path='/Profile/:id' element={<Profile/>}/>
                <Route path='/Change_password/:id' element={<Change_password/>}/>
            </Routes>
          <Footer/>
          </>
        :
          <>
            <Routes>
               <Route path='/' element={<><Header/><Index/><Footer/></>}/>
               <Route path='/About' element={<><Header/><About/><Footer/></>}/>
               <Route path='/Lawyer/:id' element={<><Header/><Lawyer/><Footer/></>}/>
               <Route path='/Services' element={<><Header/><Services/><Footer/></>}/>
               <Route path='/Blog' element={<><Header/><Blog/><Footer/></>}/>
               <Route path='/Appointment/:id' element={<><Header/><Appointment/><Footer/></>}/>
               <Route path='/Contact' element={<><Header/><Contact/><Footer/></>}/>
               <Route path='/Login' element={<><Header/><Login/></>}/>
               <Route path='/Registration' element={<><Header/><Ragistration/></>}/>
               <Route path='/Forget_password' element={<><Header/><Forget_password/></>}/>
            </Routes>
          </>
          }
    </BrowserRouter>
      {/* <RouterProvider router={router}></RouterProvider> */}
   </div>
  );
}

export default App;
