import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RegisterContext = createContext();

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister deve ser usado dentro do RegisterProvider');
  }
  return context;
};

export const RegisterProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step One
    email: '',
    fullName: '',
    
    // Step Two
    password: '',
    
    // Step Three
    birthdate: '',
    gender: '',
    profile: '',
    organization: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const updateFormData = (stepData) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        ...stepData
      };
      return newData;
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      fullName: '',
      password: '',
      birthdate: '',
      gender: '',
      profile: '',
      organization: '',
    });
    setCurrentStep(1);
  };

  const value = {
    formData,
    currentStep,
    updateFormData,
    nextStep,
    previousStep,
    resetForm,
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

RegisterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
