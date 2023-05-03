import React from 'react';
import PersonalDetailsForm from './components/Home/PersonalDetailsForm';
import DisplayFormData from './components/Home/DisplayFormData';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalDetailsForm />} />
      <Route path="/display" element={<DisplayFormData />} />
    </Routes>
  );
};

export default AppRoutes;
