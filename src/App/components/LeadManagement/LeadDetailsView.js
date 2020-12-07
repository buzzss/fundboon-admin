import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useClient } from '../../../client';
import {Col, Card, Button} from 'react-bootstrap';
import { UPDATE_LEADS_DATA } from '../../../graphql/mutation';
import { GET_ALL_LEADS_QUERY } from '../../../graphql/queries';
const LeadDetails = props => {
  const client = useClient();
  const [disabled, setDisabled] = useState(true);

  const [comment, setComment] = useState('');
  const [leadId, setLeadId] = useState('');
  const [refererId, setRefererId] = useState('');
  const [dateOfApply, setDateOfApply] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loanType, setLoanType] = useState('');
  const [empType, setEmpType] = useState('');
  const [martial, setMartial] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [income, setIncome] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [status, setStatus] = useState('');
  const [mobile, setMobile] = useState('');

  

  useEffect(() => {
    if(props.id==undefined){
      props = {id: 0}
    }
    if(disabled)
    {
      client.request(GET_ALL_LEADS_QUERY).then(lead => {
        if (lead === null) return;
        setComment(lead.getAllLeads[props.id].comment);
        setLeadId(lead.getAllLeads[props.id].leadId);
        setRefererId(lead.getAllLeads[props.id].refererId);
        setDateOfApply(lead.getAllLeads[props.id].dateOfApply);
        setUpdateDate(lead.getAllLeads[props.id].updateDate);
        setName(lead.getAllLeads[props.id].name);
        setEmail(lead.getAllLeads[props.id].email);
        setAmount(lead.getAllLeads[props.id].amount);
        setLoanType(lead.getAllLeads[props.id].loanType);
        setEmpType(lead.getAllLeads[props.id].empType);
        setMartial(lead.getAllLeads[props.id].martial);
        setEducation(lead.getAllLeads[props.id].education);
        setGender(lead.getAllLeads[props.id].gender);
        setDate(lead.getAllLeads[props.id].date);
        setIncome(lead.getAllLeads[props.id].income);
        setSalaryType(lead.getAllLeads[props.id].salaryType);
        setCompanyName(lead.getAllLeads[props.id].companyName);
        setAddress(lead.getAllLeads[props.id].address);
        setCity(lead.getAllLeads[props.id].city);
        setState(lead.getAllLeads[props.id].state);
        setPinCode(lead.getAllLeads[props.id].pinCode);
        setPan(lead.getAllLeads[props.id].pan);
        setAadhaar(lead.getAllLeads[props.id].aadhaar);
        setStatus(lead.getAllLeads[props.id].status);
        setMobile(lead.getAllLeads[props.id].mobile);
      });
    }
  });

  
  const handleSubmit = () => {
    try {
      const variables = {
        comment,
        leadId,
        refererId,
        dateOfApply,
        updateDate,
        name,
        email,
        amount,
        loanType,
        empType,
        martial,
        education,
        gender,
        date,
        income,
        salaryType,
        companyName,
        address,
        city,
        state,
        pinCode,
        pan,
        aadhaar,
        status,
        mobile
      }
        

      client.request(UPDATE_LEADS_DATA,variables);
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
          <Button className="float-right" variant="success" onClick={handleSubmit}>Save</Button>
          <Button className="float-right" variant="info" onClick={handleEdit}>Edit</Button>
      </Col>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Lead ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Lead ID" value={leadId} disabled={true} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Referer ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Referer ID" value={refererId} disabled={disabled} onChange={e => setRefererId(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control type="text" placeholder="Enter Comment" value={comment} disabled={disabled} onChange={e => setComment(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date of Apply</Form.Label>
          <Form.Control type="text" placeholder="Enter Date of Apply" value={dateOfApply} disabled={disabled} onChange={e => setDateOfApply(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Update Date</Form.Label>
          <Form.Control type="text" placeholder="Enter Update Date" value={updateDate} disabled={disabled} onChange={e => setUpdateDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} disabled={disabled} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" value={email} disabled={disabled} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter Amount" value={amount} disabled={disabled} onChange={e => setAmount(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Loan Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Loan Type" value={loanType} disabled={disabled} onChange={e => setLoanType(e.target.value)} />
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
          <Form.Label>Created Date</Form.Label>
          <Form.Control type="text" placeholder="Enter Date" value={date} disabled={disabled} onChange={e => setDate(e.target.value)} />
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
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" placeholder="Enter Status" value={status} disabled={disabled} onChange={e => setStatus(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" placeholder="Enter Mobile" value={mobile} disabled={disabled} onChange={e => setMobile(e.target.value)} />
        </Form.Group>
      </Form>
    </>
  );
};

export default LeadDetails;
