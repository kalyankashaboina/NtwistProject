import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Navbar, Container } from 'react-bootstrap'; // Import Modal, Form, Navbar, and Container from react-bootstrap
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if using in a routing setup

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the employee being updated

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3016/add/get_emp');
      setEmployees(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3016/add/delete_emp/${id}`);
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedEmployee(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3016/add/update_emp/${selectedEmployee._id}`, selectedEmployee);
      fetchEmployees(); // Refresh employee list
      setShowUpdateModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error state or display error message to user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({
      ...selectedEmployee,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Employee Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar className="me-auto">
              <Link as={Link} to="/">Employees Table</ Link>
            </Navbar>
            <Navbar>
              <Button variant="primary" as={Link} to="/emp">Add Employee</Button>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <Button variant="info" className="me-2">
                    View
                  </Button>
                  <Button variant="warning" className="me-2" onClick={() => handleUpdate(employee)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => deleteEmployee(employee._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Update Employee */}
        <Modal show={showUpdateModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={selectedEmployee ? selectedEmployee.firstName : ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={selectedEmployee ? selectedEmployee.lastName : ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedEmployee ? selectedEmployee.email : ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Employee
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default EmployeeTable;
