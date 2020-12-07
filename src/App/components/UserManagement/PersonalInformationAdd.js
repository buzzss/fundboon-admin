import React from "react";
import { Form } from "react-bootstrap";
const PersonalInformation = (props) => {
  const { data, setData } = props;
  const { personalDetails } = data;

  const handleChange = (event) => {
    console.log(event.target);

    const newPersonalDetails = {
      ...personalDetails,
      [event.target.id]: event.target.value,
    };
    setData({ ...data, personalDetails: newPersonalDetails });
  };

  const {
    userType,
    firstName,
    lastName,
    gender,
    email,
    phoneNumber,
    nationality,
    pan,
    aadhar,
    password,
    dob,
  } = personalDetails;
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>User Type</Form.Label>
          <Form.Control
            value={userType}
            onChange={handleChange}
            as="select"
            custom
            id="userType"
          >
            <option value="">----</option>
            <option value="normal">Normal</option>
            <option value="staff">Staff</option>
            <option value="associate">Associate</option>
            <option value="partner">Partner</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            id="firstName"
            value={firstName}
            onChange={handleChange}
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            id="lastName"
            value={lastName}
            onChange={handleChange}
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Gender</Form.Label>
          <Form.Control value={gender} onChange={handleChange} as="select" id="gender" custom>
            <option value="">----</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="not-defined">Rather not say</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Primary Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={handleChange}
            value={email}
            placeholder="Enter primary email address"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            onChange={handleChange}
            value={password}
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Primary Phone Number</Form.Label>
          <Form.Control
            id="phoneNumber"
            type="text"
            onChange={handleChange}
            value={phoneNumber}
            placeholder="Enter primary phone number"
          />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            id="nationality"
            onChange={handleChange}
            type="text"
            value={nationality}
            placeholder="Enter nationality"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            id="dob"
            onChange={handleChange}
            type="date"
            value={dob}
            placeholder="Enter date of birth"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>PAN Number</Form.Label>
          <Form.Control
            value={pan}
            onChange={handleChange}
            id="pan"
            type="text"
            placeholder="Enter PAN Number"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Aadhar Number</Form.Label>
          <Form.Control
            id="aadhar"
            onChange={handleChange}
            type="text"
            placeholder="Enter Aadhar Number"
            value={aadhar}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default PersonalInformation;
