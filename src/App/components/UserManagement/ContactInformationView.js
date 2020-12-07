import React from "react";
import { Form } from "react-bootstrap";
const ContactInformation = (props) => {
  let { addressDetails: contactDetails } = props.data;
  console.log(props.data);
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

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            value={houseNumber}
            type="text"
            placeholder="Enter house number"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Locality</Form.Label>
          <Form.Control
            value={locality}
            type="text"
            placeholder="Enter locality"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            type="text"
            placeholder="Enter city"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>State</Form.Label>
          <Form.Control
            value={state}
            type="text"
            placeholder="Enter state"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            value={pinCode}
            type="text"
            placeholder="Enter pincode"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Accomodation Type</Form.Label>
          <Form.Control
            value={accomodationType}
            type="text"
            placeholder="Enter Accomodation Type"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Residence Year</Form.Label>
          <Form.Control
            value={residenceYear}
            type="text"
            placeholder="Enter Residence Year"
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address Check</Form.Label>
          <Form.Control
            value={addressCheck}
            type="text"
            placeholder="Address Check"
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default ContactInformation;
