// src/components/AlertMessage.jsx

import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ variant, message }) => {
  return (
    <Alert variant={variant} className="text-center">
      {message}
    </Alert>
  );
};

export default AlertMessage;
