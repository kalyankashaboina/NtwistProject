// src/components/EmployeeForm.jsx

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AlertMessage from './AlertMessage'; // Correct relative path based on your project structure
import { Link } from 'react-router-dom';

const EmployeeForm = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    dateOfHire: '',
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Convert date format from dd/mm/yyyy to yyyy-mm-dd for <Form.Control type="date" />
    if (name === 'dateOfHire') {
      // Ensure the input value is a valid date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(value)) {
        setForm({
          ...form,
          [name]: value, // If already in correct format, directly set
        });
      } else {
        // Convert dd/mm/yyyy to yyyy-mm-dd
        const formattedDate = value.split('/').reverse().join('-');
        setForm({
          ...form,
          [name]: formattedDate,
        });
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation for first name (must be greater than 5 characters)
    if (!form.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (form.firstName.length <= 5) {
      newErrors.firstName = 'First name must be greater than 5 characters';
    }

    // Validation for last name
    if (!form.lastName) newErrors.lastName = 'Last name is required';

    // Validation for email
    if (!form.email) newErrors.email = 'Email is required';

    // Validation for position
    if (!form.position) newErrors.position = 'Position is required';

    // Validation for department
    if (!form.department) newErrors.department = 'Department is required';

    // Validation for salary
    if (!form.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(form.salary)) {
      newErrors.salary = 'Salary must be a number';
    }

    // Validation for date of hire (must be a valid date format)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!form.dateOfHire) {
      newErrors.dateOfHire = 'Date of hire is required';
    } else if (!dateRegex.test(form.dateOfHire)) {
      newErrors.dateOfHire = 'Date of hire must be in YYYY-MM-DD format';
    } else {
      const date = new Date(form.dateOfHire);
      if (isNaN(date.getTime())) {
        newErrors.dateOfHire = 'Date of hire must be a valid date';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setErrors({});
      setValidated(true);
      setSubmissionStatus('Submitting...');

      try {
        await axios.post('http://localhost:3016/add/add_emp', form);
        setSubmissionStatus('Employee added successfully!');
        // fetchEmployees(); // Refresh employee list
        setForm(initialFormState); // Clear form inputs
      } catch (error) {
        setSubmissionStatus('Submission failed. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-center text-primary mb-4">Employee Form</h2>
          <Form noValidate onSubmit={handleSubmit}>
            {validated && submissionStatus && (
              <AlertMessage variant="success" message={submissionStatus} />
            )}
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label className="text-primary">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label className="text-primary">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="text-primary">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPosition" className="mb-3">
              <Form.Label className="text-primary">Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter position"
                name="position"
                value={form.position}
                onChange={handleChange}
                isInvalid={!!errors.position}
              />
              <Form.Control.Feedback type="invalid">
                {errors.position}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDepartment" className="mb-3">
              <Form.Label className="text-primary">Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                name="department"
                value={form.department}
                onChange={handleChange}
                isInvalid={!!errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSalary" className="mb-3">
              <Form.Label className="text-primary">Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter salary"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                isInvalid={!!errors.salary}
              />
              <Form.Control.Feedback type="invalid">
                {errors.salary}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDateOfHire" className="mb-3">
              <Form.Label className="text-primary">Date of Hire</Form.Label>
              <Form.Control
                type="date"
                name="dateOfHire"
                value={form.dateOfHire}
                onChange={handleChange}
                isInvalid={!!errors.dateOfHire}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfHire}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="form-button mt-3">
              Submit
            </Button>
          </Form>


          <Button variant="danger" as={Link} to="/">Close</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeForm;
