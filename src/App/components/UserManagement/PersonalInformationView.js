import React from "react";
import { Form } from "react-bootstrap";
const PersonalInformation = (props) => {
  let { role, personalDetails, email, kycDetails } = props.data;
  personalDetails = personalDetails || {};
  let { firstName, lastName, gender, dob, mobileNumber } = personalDetails;
  kycDetails = kycDetails || {};
  let { pan, aadhaar, nationality } = kycDetails;

  console.log(role);
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User Types</Form.Label>
          <Form.Control
            value={role}
            type="text"
            placeholder="Enter user type"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            type="text"
            placeholder="Enter first name"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            type="text"
            placeholder="Enter last name"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            value={gender}
            type="text"
            placeholder="Enter gender"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Primary Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter primary email address"
            disabled
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Primary Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter primary phone number"
            disabled
            value={mobileNumber}
          />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Date of Birth"
            value={dob}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Nationality"
            value={nationality}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>PAN Number</Form.Label>
          <Form.Control
            value={pan}
            type="text"
            placeholder="Enter PAN Number"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Aadhaar Number</Form.Label>
          <Form.Control
            type="text"
            value={aadhaar}
            placeholder="Enter Aadhaar Number"
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default PersonalInformation;
