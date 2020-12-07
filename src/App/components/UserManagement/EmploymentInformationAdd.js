import React, { useState } from "react";
import { Form } from "react-bootstrap";
const EmployeeInformation = (props) => {
  const { data, setData } = props;
  const { employmentDetails } = data;
  const { company, income, employmentType } = employmentDetails;

  const handleChange = (event) => {
    const newEmploymentDetails = {
      ...employmentDetails,
      [event.target.id]: event.target.value,
    };
    setData({ ...data, employmentDetails: newEmploymentDetails });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Office Name</Form.Label>
          <Form.Control
            value={company}
            id="company"
            type="text"
            onChange={handleChange}
            placeholder="Enter office name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Income</Form.Label>
          <Form.Control
            value={income}
            id="income"
            onChange={handleChange}
            type="text"
            placeholder="Enter income"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Type</Form.Label>
          <Form.Control
            value={employmentType}
            id="employmentType"
            type="text"
            onChange={handleChange}
            placeholder="Enter employment type"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default EmployeeInformation;
