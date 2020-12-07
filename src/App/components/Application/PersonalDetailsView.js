import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useClient } from '../../../client';
import {Col, Card, Button} from 'react-bootstrap';
import { UPDATE_APPLICATION_DATA } from '../../../graphql/mutation';
import { GET_ALL_APPLICATIONS_QUERY } from '../../../graphql/queries';
const PersonalDetails = props => {
  const client = useClient();
  const [disabled, setDisabled] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mob, setMob] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [nation, setNation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [qualification, setQualification] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');

  const [applicationNumber, setApplicationNumber] =  useState('');

  const [loanAmount, setLoanAmount] =  useState('');
  const [loanCity, setLoanCity] =  useState('');
  const [assetCity, setAssetCity] =  useState('');
  const [assetWorth, setAssetWorth] =  useState('');
  const [loanTenure, setLoanTenure] =  useState('');
  const [loanPurpose, setLoanPurpose] =  useState('');
  const [assetState, setAssetState] =  useState('');
  const [assetType, setAssetType] =  useState('');
  const [homeLoanCity, setHomeLoanCity] =  useState('');

  const [coApplicant, setCoApplicant] =  useState('');
  const [coApplicantIncome, setCoApplicantIncome] =  useState('');
  const [coApplicantEMI, setCoApplicantEMI] =  useState('');
  const [coApplicantRelation, setCoApplicantRelation] =  useState('');
  const [exiloan, setExiloan] =  useState('');
  const [exiLoanBank, setExiLoanBank] =  useState('');
  const [exiEMI, setExiEMI] =  useState('');
  const [chqbnc, setChqbnc] =  useState('');
  const [exiLoanType, setExiLoanType] =  useState('');
  const [transfer, setTransfer] =  useState('');

  const [permanentAddress, setPermanentAddress] =  useState('');
  const [permanentAddressLandmark, setPermanentAddressLandmark] =  useState('');
  const [permanentAddressType, setPermanentAddressType] =  useState('');
  const [permanentAddressPincode, setPermanentAddressPincode] =  useState('');
  const [permanentAddressPincodeCity, setPermanentAddressPincodeCity] =  useState('');
  const [permanentAddressPincodeState, setPermanentAddressPincodeState] =  useState('');
  const [permanentAddressAccomodation, setPermanentAddressAccomodation] =  useState('');
  const [currentAddress, setCurrentAddress] =  useState('');
  const [currentAddressLandmark, setCurrentAddressLandmark] =  useState('');
  const [currentAddressType, setCurrentAddressType] =  useState('');
  const [currentAddressPincode, setCurrentAddressPincode] =  useState('');
  const [currentAddressPincodeCity, setCurrentAddressPincodeCity] =  useState('');
  const [currentAddressPincodeState, setCurrentAddressPincodeState] =  useState('');
  const [currentAddressAccomodation, setCurrentAddressAccomodation] =  useState('');

  const [emp, setEmp] =  useState('');
  const [income, setIncome] =  useState('');
  const [company, setCompany] =  useState('');
  const [turnover, setTurnover] =  useState('');
  const [officeAddress, setOfficeAddress] =  useState('');
  const [officeAddressLandmark, setOfficeAddressLandmark] =  useState('');
  const [officeAddressPincode, setOfficeAddressPincode] =  useState('');
  const [industryType, setIndustryType] =  useState('');

  useEffect(() => {
    if(props.id==undefined){
      props = {id: 0}
    }
    if(disabled)
    {
      client.request(GET_ALL_APPLICATIONS_QUERY).then(application => {
        if (application === null) return;
        setFirstName(application.getAllApplicationsRequest[props.id].personalDetails.firstName);
        setLastName(application.getAllApplicationsRequest[props.id].personalDetails.lastName);
        setMob(application.getAllApplicationsRequest[props.id].personalDetails.mob);
        setGender(application.getAllApplicationsRequest[props.id].personalDetails.gender);
        setDob(application.getAllApplicationsRequest[props.id].personalDetails.dob);
        setAadhaar(application.getAllApplicationsRequest[props.id].personalDetails.aadhaar);
        setPan(application.getAllApplicationsRequest[props.id].personalDetails.pan);
        setNation(application.getAllApplicationsRequest[props.id].personalDetails.nation);
        setMaritalStatus(application.getAllApplicationsRequest[props.id].personalDetails.maritalStatus);
        setQualification(application.getAllApplicationsRequest[props.id].personalDetails.qualification);
        setPrimaryEmail(application.getAllApplicationsRequest[props.id].personalDetails.primaryEmail);
        setSecondaryEmail(application.getAllApplicationsRequest[props.id].personalDetails.secondaryEmail);

        setApplicationNumber(application.getAllApplicationsRequest[props.id].applicationNumber);

        setPermanentAddress(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddress);
        setPermanentAddressLandmark(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressLandmark);
        setPermanentAddressType(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressType);
        setPermanentAddressPincode(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressPincode);
        setPermanentAddressPincodeCity(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressPincodeCity);
        setPermanentAddressPincodeState(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressPincodeState);
        setPermanentAddressAccomodation(application.getAllApplicationsRequest[props.id].addressDetails.permanentAddressAccomodation);
        setCurrentAddress(application.getAllApplicationsRequest[props.id].addressDetails.currentAddress);
        setCurrentAddressLandmark(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressLandmark);
        setCurrentAddressType(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressType);
        setCurrentAddressPincode(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressPincode);
        setCurrentAddressPincodeCity(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressPincodeCity);
        setCurrentAddressPincodeState(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressPincodeState);
        setCurrentAddressAccomodation(application.getAllApplicationsRequest[props.id].addressDetails.currentAddressAccomodation);


        setEmp(application.getAllApplicationsRequest[props.id].employmentDetails.emp);
        setIncome(application.getAllApplicationsRequest[props.id].employmentDetails.income);
        setCompany(application.getAllApplicationsRequest[props.id].employmentDetails.company);
        setTurnover(application.getAllApplicationsRequest[props.id].employmentDetails.turnover);
        setOfficeAddress(application.getAllApplicationsRequest[props.id].employmentDetails.officeAddress);
        setOfficeAddressLandmark(application.getAllApplicationsRequest[props.id].employmentDetails.officeAddressLandmark);
        setOfficeAddressPincode(application.getAllApplicationsRequest[props.id].employmentDetails.officeAddressPincode);
        setIndustryType(application.getAllApplicationsRequest[props.id].employmentDetails.industryType);


        setLoanAmount(application.getAllApplicationsRequest[props.id].loanDetails.loanAmount);
        setLoanCity(application.getAllApplicationsRequest[props.id].loanDetails.loanCity);
        setLoanTenure(application.getAllApplicationsRequest[props.id].loanDetails.loanTenure);
        setLoanPurpose(application.getAllApplicationsRequest[props.id].loanDetails.loanPurpose);
        setAssetWorth(application.getAllApplicationsRequest[props.id].loanDetails.assetWorth);
        setAssetCity(application.getAllApplicationsRequest[props.id].loanDetails.assetCity);
        setAssetState(application.getAllApplicationsRequest[props.id].loanDetails.assetState);
        setAssetType(application.getAllApplicationsRequest[props.id].loanDetails.assetType);
        setHomeLoanCity(application.getAllApplicationsRequest[props.id].loanDetails.homeLoanCity);


        setCoApplicant(application.getAllApplicationsRequest[props.id].bankDetails.coApplicant);
        setCoApplicantIncome(application.getAllApplicationsRequest[props.id].bankDetails.coApplicantIncome);
        setCoApplicantEMI(application.getAllApplicationsRequest[props.id].bankDetails.coApplicantEMI);
        setCoApplicantRelation(application.getAllApplicationsRequest[props.id].bankDetails.coApplicantRelation);
        setExiloan(application.getAllApplicationsRequest[props.id].bankDetails.exiloan);
        setExiLoanBank(application.getAllApplicationsRequest[props.id].bankDetails.exiLoanBank);
        setExiEMI(application.getAllApplicationsRequest[props.id].bankDetails.exiEMI);
        setChqbnc(application.getAllApplicationsRequest[props.id].bankDetails.chqbnc);
        setExiLoanType(application.getAllApplicationsRequest[props.id].bankDetails.exiLoanType);
        setTransfer(application.getAllApplicationsRequest[props.id].bankDetails.transfer);
      });
    }
  });

  
  const handleSubmit = () => {
    try {
      const variables = {
        applicationNumber,
        firstName,
        lastName,
        mob,
        dob,
        gender,
        pan,
        aadhaar,
        nation,
        maritalStatus,
        qualification,
        primaryEmail,
        secondaryEmail,
        loanAmount,
        loanCity,
        assetCity,
        assetWorth,
        loanTenure,
        loanPurpose,
        assetState,
        assetType,
        homeLoanCity,
        coApplicant,
        coApplicantIncome,
        coApplicantEMI,
        coApplicantRelation,
        exiloan,
        exiLoanBank,
        exiEMI,
        chqbnc,
        exiLoanType,
        transfer,
        permanentAddress,
        permanentAddressLandmark,
        permanentAddressType,
        permanentAddressPincode,
        permanentAddressPincodeCity,
        permanentAddressPincodeState,
        permanentAddressAccomodation,
        currentAddress,
        currentAddressLandmark,
        currentAddressType,
        currentAddressPincode,
        currentAddressPincodeCity,
        currentAddressPincodeState,
        currentAddressAccomodation,
        emp,
        income,
        company,
        turnover,
        officeAddress,
        officeAddressLandmark,
        officeAddressPincode,
        industryType
      }
        

      client.request(UPDATE_APPLICATION_DATA,variables);
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
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={firstName} disabled={disabled} onChange={e => setFirstName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" value={lastName} disabled={disabled} onChange={e => setLastName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter Gender" value={gender} disabled={disabled} onChange={e => setGender(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Marital Status</Form.Label>
          <Form.Control type="text" placeholder="Enter Marital Status" value={maritalStatus} disabled={disabled} onChange={e => setMaritalStatus(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="Enter Date of Birth" value={dob} disabled={disabled} onChange={e => setDob(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Primary Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter primary email address"
            value={primaryEmail}
            disabled={disabled}
            onChange={e => setPrimaryEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Secondary Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter alternate email address"
            value={secondaryEmail}
            disabled={disabled}
            onChange={e => setSecondaryEmail(e.target.value)}
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
            value={mob}
            disabled={disabled}
            onChange={e => setMob(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nationality</Form.Label>
          <Form.Control type="text" placeholder="Enter Nationality" value={nation} disabled={disabled} onChange={e => setNation(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Qualification</Form.Label>
          <Form.Control type="text" placeholder="Enter Qualification" value={qualification} disabled={disabled} onChange={e => setQualification(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>PAN Number</Form.Label>
          <Form.Control type="text" placeholder="Enter PAN Number" value={pan} disabled={disabled} onChange={e => setPan(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Aadhaar Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaar}
            disabled={disabled}
            onChange={e => setAadhaar(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default PersonalDetails;
