import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentModal from '../../../components/serviceProvider/editServiceComponents/editServiceModal';
import EditServiceForm from '../../../components/serviceProvider/editServiceComponents/EditServiceForm';
import NavbarHead from '../../../components/serviceProvider/layout/NavbarHead';
import { fetchservicedetails } from '../../../editservice/editserviceapi';
const EditService = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leadBalance, setLeadBalance] = useState(0);
  const [formValues, setFormValues] = useState(null);
  const [data,setvalues] = useState({status: 'Active',
    serviceTitle: 'Web Development Service',
    description: 'We offer professional web development services',
    gstCode: 'GST123456',
    serviceCategory: 'Web Development',
    serviceSubCategory: 'Fullstack',
    servicetype: 'Lead',
    collar:'blue',
    certificateFileName: 'certificate.pdf',
    licenseFileName: 'license.pdf',
    leadBalance: 50,
    terms: true,
    mediaFiles: [],});
  
  
 

  const navigate = useNavigate();
  const { id } = useParams(); // Get the service ID from the route params

  const handleConfirmPayment = () => {
    setIsLoading(true);

    // Process and log the form data
    console.log('Form Data:', formValues);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentModal(false);
      navigate('/my-services');
    }, 2000);
  };

  useEffect(() => {
    
    fetchservicedetails(id)
      .then((data) => {
       
       setvalues(pre=>({
        ...pre,
        leadBalance:data.leadBalance,
        gstCode:data.gstcode,
        terms:data.accepted_terms,
        description:data.description,
       }))
        
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [id]);





  return (
    
    <div className="flex bg-light-gray overflow-auto">
      
      <div className="flex flex-col items-center p-4 bg-light-gray rounded-md md:shadow-lg w-full min-h-screen justify-center overflow-auto">
        <EditServiceForm
          serviceId={id}  // Pass the service ID to the form
          data = {data}
          setFormValues={setFormValues}
          setLeadBalance={setLeadBalance}
          setShowPaymentModal={setShowPaymentModal}
        />

        {showPaymentModal && (
          <PaymentModal
            isLoading={isLoading}
            leadBalance={leadBalance}
            onClose={() => setShowPaymentModal(false)}
            onConfirm={handleConfirmPayment}
          />
        )}
      </div>
    </div>
    
  );
};

export default EditService;
