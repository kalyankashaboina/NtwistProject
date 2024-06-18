import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeTable from './main'; 
import EmployeeForm from './form'; 
import View from './View'; 

function NavigateComponent() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
          <Route path="/emp" element={<EmployeeForm />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NavigateComponent;
