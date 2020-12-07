import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useClient } from '../../../client';
import {Col, Card, Button} from 'react-bootstrap';
import { UPDATE_PRODUCT_DATA } from '../../../graphql/mutation';
import { GET_ALL_PRODUCTS_QUERY } from '../../../graphql/queries';
const ProductDetails = props => {
  const client = useClient();
  const [disabled, setDisabled] = useState(true);

  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [fbBankCode, setFbBankCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [fbProductCode, setFbProductCode] = useState('');

  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minIncome, setMinIncome] = useState('');
  const [minLoanAmount, setMinLoanAmount] = useState('');
  const [maxLoanAmount, setMaxLoanAmount] = useState('');
  const [minLoanRatio, setMinLoanRatio] = useState('');
  const [maxLoanRatio, setMaxLoanRatio] = useState('');
  const [minLoanTenure, setMinLoanTenure] = useState('');
  const [maxLoanTenure, setMaxLoanTenure] = useState('');
  const [minInterestRateMen, setMinInterestRateMen] = useState('');
  const [minInterestRateWomen, setMinInterestRateWomen] = useState('');
  const [minProcessingFee, setMinProcessingFee] = useState('');
  const [minPreclosureCharge, setMinPreclosureCharge] = useState('');
  const [maxPreclosureCharge, setMaxPreclosureCharge] = useState('');
  const [fbProcessingFee, setFbProcessingFee] = useState('');
  const [minProcessingFeeSlab, setMinProcessingFeeSlab] = useState('');
  const [maxProcessingFeeSlab, setMaxProcessingFeeSlab] = useState('');
  const [coApplicantMaxEMI, setCoApplicantMaxEMI] = useState('');
  const [coApplicantMinAge, setCoApplicantMinAge] = useState('');
  const [coApplicantMinSalary, setCoApplicantMinSalary] = useState('');
  const [documents, setDocuments] = useState('');
  const [eligibilty, setEligibility] = useState('');
  const [details, setDetails] = useState('');
  const [fbOffers, setFbOffers] = useState('');

  

  useEffect(() => {
    if(props.id==undefined){
      props = {id: 0}
    }
    if(disabled)
    {
      client.request(GET_ALL_PRODUCTS_QUERY).then(product => {
        if (product === null) return;
        setBankName(product.getAllProducts[props.id].bankName);
        setBankCode(product.getAllProducts[props.id].bankCode);
        setFbBankCode(product.getAllProducts[props.id].fbBankCode);
        setProductName(product.getAllProducts[props.id].productName);
        setProductCode(product.getAllProducts[props.id].productCode);
        setFbProductCode(product.getAllProducts[props.id].fbProductCode);

        setMinAge(product.getAllProducts[props.id].minAge);
        setMaxAge(product.getAllProducts[props.id].maxAge);
        setMinIncome(product.getAllProducts[props.id].minIncome);
        setMinLoanAmount(product.getAllProducts[props.id].minLoanAmount);
        setMaxLoanAmount(product.getAllProducts[props.id].maxLoanAmount);
        setMinLoanRatio(product.getAllProducts[props.id].minLoanRatio);
        setMaxLoanRatio(product.getAllProducts[props.id].maxLoanRatio);
        setMinLoanTenure(product.getAllProducts[props.id].minLoanTenure);
        setMaxLoanTenure(product.getAllProducts[props.id].maxLoanTenure);
        setMinInterestRateMen(product.getAllProducts[props.id].minInterestRateMen);
        setMinInterestRateWomen(product.getAllProducts[props.id].minInterestRateWomen);
        setMinProcessingFee(product.getAllProducts[props.id].minProcessingFee);
        setMinPreclosureCharge(product.getAllProducts[props.id].minPreclosureCharge);
        setMaxPreclosureCharge(product.getAllProducts[props.id].maxPreclosureCharge);
        setFbProcessingFee(product.getAllProducts[props.id].fbProcessingFee);
        setMinProcessingFeeSlab(product.getAllProducts[props.id].minProcessingFeeSlab);
        setMaxProcessingFeeSlab(product.getAllProducts[props.id].maxProcessingFeeSlab);
        setCoApplicantMaxEMI(product.getAllProducts[props.id].coApplicantMaxEMI);
        setCoApplicantMinAge(product.getAllProducts[props.id].coApplicantMinAge);
        setCoApplicantMinSalary(product.getAllProducts[props.id].coApplicantMinSalary);
      });
    }
  });

  
  const handleSubmit = () => {
    try {
      const variables = {
        bankName,
        bankCode,
        fbBankCode,
        productName,
        productCode,
        fbProductCode,
        minAge,
        maxAge,
        minIncome,
        minLoanAmount,
        maxLoanAmount,
        minLoanRatio,
        maxLoanRatio,
        minLoanTenure,
        maxLoanTenure,
        minInterestRateMen,
        minInterestRateWomen,
        minProcessingFee,
        minPreclosureCharge,
        maxPreclosureCharge,
        fbProcessingFee,
        minProcessingFeeSlab,
        maxProcessingFeeSlab,
        coApplicantMaxEMI,
        coApplicantMinAge,
        coApplicantMinSalary
      }
        

      client.request(UPDATE_PRODUCT_DATA,variables);
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
          <Form.Label>Min Age</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Age" value={minAge} disabled={disabled} onChange={e => setMinAge(parseFloat(parseFloat(e.target.value)))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Age</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Age" value={maxAge} disabled={disabled} onChange={e => setMaxAge(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Income</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Income" value={minIncome} disabled={disabled} onChange={e => setMinIncome(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Loan Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Loan Amount" value={minLoanAmount} disabled={disabled} onChange={e => setMinLoanAmount(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Loan Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Loan Amount" value={maxLoanAmount} disabled={disabled} onChange={e => setMaxLoanAmount(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Loan Ratio</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Loan Ratio" value={minLoanRatio} disabled={disabled} onChange={e => setMinLoanRatio(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Loan Ratio</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Loan Ratio" value={maxLoanRatio} disabled={disabled} onChange={e => setMaxLoanRatio(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Loan Tenure</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Loan Tenure" value={minLoanTenure} disabled={disabled} onChange={e => setMinLoanTenure(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Loan Ratio</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Loan Tenure" value={maxLoanTenure} disabled={disabled} onChange={e => setMaxLoanTenure(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Interest Rate Men</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Interest Rate for Men" value={minInterestRateMen} disabled={disabled} onChange={e => setMinInterestRateMen(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Interest Rate Women</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Interest Rate for Women" value={minInterestRateWomen} disabled={disabled} onChange={e => setMinInterestRateWomen(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Processing Fee</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Processing Fee" value={minProcessingFee} disabled={disabled} onChange={e => setMinProcessingFee(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Preclosure Charge</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Preclosure Charge" value={minPreclosureCharge} disabled={disabled} onChange={e => setMinPreclosureCharge(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Preclosure Charge</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Preclosure Charge" value={maxPreclosureCharge} disabled={disabled} onChange={e => setMaxPreclosureCharge(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>FB Processing Fee</Form.Label>
          <Form.Control type="text" placeholder="Enter Fundboon Processing Fee" value={fbProcessingFee} disabled={disabled} onChange={e => setFbProcessingFee(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Processing Fee Slab</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Processing Fee Slab" value={minProcessingFeeSlab} disabled={disabled} onChange={e => setMinProcessingFeeSlab(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Max Processing Fee Slab</Form.Label>
          <Form.Control type="text" placeholder="Enter Maximum Processing Fee Slab" value={maxProcessingFeeSlab} disabled={disabled} onChange={e => setMaxProcessingFeeSlab(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>CoApplicant Max EMI</Form.Label>
          <Form.Control type="text" placeholder="Enter CoApplicant Maximum EMI" value={coApplicantMaxEMI} disabled={disabled} onChange={e => setCoApplicantMaxEMI(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>CoApplicant Min Age</Form.Label>
          <Form.Control type="text" placeholder="Enter CoApplicant Minimum Age" value={coApplicantMinAge} disabled={disabled} onChange={e => setCoApplicantMinAge(parseFloat(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>CoApplicant Min Salary</Form.Label>
          <Form.Control type="text" placeholder="Enter CoApplicant Minimum Salary" value={coApplicantMinSalary} disabled={disabled} onChange={e => setCoApplicantMinSalary(e.target.value)} />
        </Form.Group>
      </Form>
    </>
  );
};

export default ProductDetails;
