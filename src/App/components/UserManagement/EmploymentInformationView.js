import React, { useState } from "react";
import { Form } from "react-bootstrap";
const EmployeeInformation = (props) => {
  let { employmentDetails } = props.data;
  console.log(props.data);
  employmentDetails = employmentDetails || {};
  let { employmentType, income, company } = employmentDetails;
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Office Name</Form.Label>
          <Form.Control value={company} type="text" placeholder="Enter office name" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Income</Form.Label>
          <Form.Control value={income} type="text" placeholder="Enter income" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Type</Form.Label>
          <Form.Control value={employmentType} type="text" placeholder="Enter employment type" disabled />
        </Form.Group>
      </Form>
    </>
  );
};

export default EmployeeInformation;
