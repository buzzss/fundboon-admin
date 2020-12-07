import React, { useState } from "react";
import { Form } from "react-bootstrap";
const EducationInformation = (props) => {
  const { data, setData } = props;

  const { qualificationDetails } = data;

  const { qualification } = qualificationDetails;

  const handleChange = (event) => {
    const newQualificationDetails = {
      ...qualificationDetails,
      [event.target.id]: event.target.value,
    };
    setData({ ...data, qualificationDetails: newQualificationDetails });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Qualification</Form.Label>
          <Form.Control
            value={qualification}
            onChange={handleChange}
            id="qualification"
            type="text"
            placeholder="Enter qualification"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default EducationInformation;
