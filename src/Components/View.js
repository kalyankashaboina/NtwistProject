// EmployeeTable.jsx

import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const View = ({employees}) => {


  // const[employees,setEmployees]=useState("")
  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3016/add/get_emp');
  //     setEmployees(response.data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Date of Hire</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.position}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>{employee.dateOfHire}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default View;
