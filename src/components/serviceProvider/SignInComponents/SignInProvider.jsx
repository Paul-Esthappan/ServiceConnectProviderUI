import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormComponent from "../../../components/reUsableComponents/FormComponent";
import ImageIconsComponent from "../../../components/reUsableComponents/ImageIconsComponents";
import Icon from "../../../assets/ICON.png";
import envolope from "../../../assets/envolope.svg";
import passlock from "../../../assets/password.svg";
import { signInProvider } from "../../../services/loginService";
import { setAccessToken, setLoginStatus } from "../../../redux/features/authSlice"; // Import the setLoginStatus action

function SignInProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const fieldConfigs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      label: "Email",
      required: true,
      icon: envolope,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      icon: passlock,
    },
  ];

  const inputConfig = {
    inputWidth: "100%",
    inputHeight: "48px",
  };

  const buttonConfig = {
    label: "Sign In",
    type: "submit",
    btnWidth: "w-full",
    btnHeight: "h-12",
  };


  // Function to handle form submission
  const apiEndpoint = async (values) => {
    try {
      const { access, refresh } = await signInProvider(values.email, values.password);
      console.log('access', access);  // Check the access token value here
      if (!access) {
        throw new Error('Access token not received');
      }
  
      // Dispatch the access token to Redux
      dispatch(setAccessToken(access));
      dispatch(setLoginStatus({ isLoggedIn: true, refresh  }));
      // Navigate to the dashboard
      navigate("/bookings");
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      alert(error.message || "Failed to sign in");
    }
  };
  

  const iconsConfig = [
    {
      src: Icon,
      width: 50,
      height: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="bg-light-gray shadow-lg p-4 max-w-xl w-full  md:max-w-lg sm:h-full lg:max-w-xl lg:p-0 xl:max-w-lg xl:p-4">
        {/* Centering Image and Heading at the top */}
        <div className="flex flex-col items-center justify-center mb-6">
          <ImageIconsComponent iconsConfig={iconsConfig} />
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mt-4">
            Service Connect
          </h2>
        </div>

        {/* Form Component with Icons */}
        <FormComponent
          fieldConfigs={fieldConfigs}
          buttonConfig={buttonConfig}
          inputConfig={inputConfig}
          apiEndpoint={apiEndpoint}
          title="Let's Sign In!"
          paragraph="Login to your account to continue your courses"
          rememberMe={true}
          forgotPassword={true}
        />
      </div>
    </div>
  );
}

export default SignInProvider;
