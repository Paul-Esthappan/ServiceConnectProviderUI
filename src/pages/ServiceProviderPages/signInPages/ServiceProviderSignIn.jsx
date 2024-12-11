import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignInProvider from "../../../components/serviceProvider/SignInComponents/SignInProvider";

const ServiceProviderSignIn = () => {
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      // Navigate to the previous page if logged in
      navigate(-1);
    }
  }, [isLoggedIn, accessToken, navigate]);

  return (
    <div>
      <SignInProvider />
    </div>
  );
};

export default ServiceProviderSignIn;
