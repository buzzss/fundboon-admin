import React, { useState } from "react";
import { Form } from "react-bootstrap";
const EducationInformation = (props) => {
  let { educationDetails } = props.data;
  console.log(props.data)
  educationDetails = educationDetails || {};
  let {
    qualification
  } = educationDetails;
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Qualification</Form.Label>
          <Form.Control value={qualification} type="text" placeholder="Enter qualification" disabled/>
        </Form.Group>
      </Form>
    </>
  );
};

export default EducationInformation;
