import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useClient } from '../../../client';
import {Col, Card, Button} from 'react-bootstrap';
import { ADD_LEAD_MUTATION } from '../../../graphql/mutation';
const LeadDetailsAdd = props => {
  const client = useClient();
  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [empType, setEmpType] = useState('');
  const [martial, setMartial] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [date, setDate] = useState('');

  
  const handleSubmit = async e => {
    try {
      const variables = {
        name,
        email,
        amount,
        type,
        empType,
        martial,
        education,
        gender,
        income,
        date,
        salaryType,
        companyName,
        address,
        city,
        state,
        pinCode,
        pan,
        aadhaar,
        mobile 
      }
        
      console.log(variables);
      const response = await client.request(ADD_LEAD_MUTATION,variables);
      console.log(response);
      setDisabled(true);
    } catch (err) {
        console.log(err);
    }
  };

  const handleEdit = () => {
    if(disabled)
    {
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  }
  return (
    <> 
      <br />
      <Col md={12} className="float-right">
          <Button className="float-right" variant="success" onClick={handleSubmit}>Create</Button>
      </Col>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} disabled={disabled} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" value={email} disabled={disabled} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="text" placeholder="Enter Date of Birth" value={date} disabled={disabled} onChange={e => setDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter Amount" value={amount} disabled={disabled} onChange={e => setAmount(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Loan Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Loan Type" value={type} disabled={disabled} onChange={e => setType(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Employment Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Employment Type" value={empType} disabled={disabled} onChange={e => setEmpType(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Marital Status</Form.Label>
          <Form.Control type="text" placeholder="Enter Marital Status" value={martial} disabled={disabled} onChange={e => setMartial(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Education</Form.Label>
          <Form.Control type="text" placeholder="Enter Education" value={education} disabled={disabled} onChange={e => setEducation(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter Gender" value={gender} disabled={disabled} onChange={e => setGender(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Income</Form.Label>
          <Form.Control type="text" placeholder="Enter Income" value={income} disabled={disabled} onChange={e => setIncome(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Salary Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Salary Type" value={salaryType} disabled={disabled} onChange={e => setSalaryType(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Company Name" value={companyName} disabled={disabled} onChange={e => setCompanyName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Address" value={address} disabled={disabled} onChange={e => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter City" value={city} disabled={disabled} onChange={e => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="Enter State" value={state} disabled={disabled} onChange={e => setState(e.target.value)} />
        </Form.Group>

       <Form.Group controlId="formBasicEmail">
          <Form.Label>Pincode</Form.Label>
          <Form.Control type="text" placeholder="Enter Pincode" value={pinCode} disabled={disabled} onChange={e => setPinCode(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>PAN</Form.Label>
          <Form.Control type="text" placeholder="Enter PAN" value={pan} disabled={disabled} onChange={e => setPan(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Aadhaar</Form.Label>
          <Form.Control type="text" placeholder="Enter Aadhaar" value={aadhaar} disabled={disabled} onChange={e => setAadhaar(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" placeholder="Enter Mobile" value={mobile} disabled={disabled} onChange={e => setMobile(e.target.value)} />
        </Form.Group>
      </Form>
    </>
  );
};

export default LeadDetailsAdd;
