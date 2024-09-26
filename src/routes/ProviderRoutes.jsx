import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import ServiceRequestList from '../pages/ServiceProviderPages/ServiceRequestList';
import BookingDetailsPage from '../pages/ServiceProviderPages/BookingDetailsPage';
import RequestDetailsPage from '../pages/ServiceProviderPages/RequestDetailsPage';
import AllowLocationComponent from '../components/reUsableComponents/AllowLocationComponent'
import RegisteredServices from '../pages/ServiceProviderPages/RegisteredServices'
import ServiceProviderSignIn from '../SignInOTPComponents/Pages/ServiceProviderSignIn'
import OTPPage from '../SignInOTPComponents/Pages/OTPPage';
import AddProfilePage from '../pages/signUpSignInPages/AddProfilePage'
import ComplaintPage from '../pages/Services/ComplaintPage';
import LeadDetails from '../pages/ServiceProviderPages/LeadDetails';





function ProviderRoutes() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/ServiceRequestPage" />} />
        <Route path="/service-request" element={<ServiceRequestList/>} /> 
        <Route path="/booking-details" element={<BookingDetailsPage/>} />
        <Route path="/request-details/:id" element={<RequestDetailsPage/>} />
        <Route path='/addprofile' element={<AddProfilePage/>}/>
        <Route path="/Registered-Services" element={<RegisteredServices />} />
        <Route path="/location" element={<AllowLocationComponent/>} />
        <Route path="/signin" element={<ServiceProviderSignIn />} />
        <Route path="/otpPage" element={<OTPPage />} />
        <Route path='/leaddetails' element={<LeadDetails/>}/>
        <Route path="/complaint" element={<ComplaintPage />} />
 
    

   
      </Routes>

    </div>
  )
}

export default ProviderRoutes