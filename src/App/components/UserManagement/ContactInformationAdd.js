import React, { useState } from "react";
import { Form } from "react-bootstrap";
const ContactInformation = (props) => {
  const { data, setData } = props;
  let { contactDetails } = data;
  contactDetails = contactDetails || {};
  let {
    houseNumber,
    locality,
    city,
    state,
    pinCode,
    accomodationType,
    residenceYear,
    addressCheck,
  } = contactDetails;

  const handleChange = (event) => {
    console.log(event.target);

    const newContactDetails = {
      ...contactDetails,
      [event.target.id]: event.target.value,
    };
    setData({ ...data, contactDetails: newContactDetails });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            value={houseNumber}
            id="houseNumber"
            onChange={handleChange}
            type="text"
            placeholder="Enter house number"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Locality</Form.Label>
          <Form.Control
            value={locality}
            onChange={handleChange}
            id="locality"
            type="text"
            placeholder="Enter locality"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={handleChange}
            id="city"
            type="text"
            placeholder="Enter city"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>State</Form.Label>
          <Form.Control
            value={state}
            onChange={handleChange}
            id="state"
            type="text"
            placeholder="Enter state"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            value={pinCode}
            id="pinCode"
            onChange={handleChange}
            type="text"
            placeholder="Enter pincode"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Accomodation Type</Form.Label>
          <Form.Control
            value={accomodationType}
            onChange={handleChange}
            id="accomodationType"
            type="text"
            placeholder="Enter Accomodation Type"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Residence Year</Form.Label>
          <Form.Control
            value={residenceYear}
            onChange={handleChange}
            id="residenceYear"
            type="text"
            placeholder="Enter Residence Year"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address Check</Form.Label>
          <Form.Control
            value={addressCheck}
            onChange={handleChange}
            id="addressCheck"
            type="text"
            placeholder="Address Check"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default ContactInformation;
