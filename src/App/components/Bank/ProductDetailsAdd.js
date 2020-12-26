import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useClient } from '../../../client';
import {Col, Card, Button} from 'react-bootstrap';
import { ADD_PRODUCT_DATA } from '../../../graphql/mutation';

const ProductDetailsAdd = props => {
  const client = useClient();
  const [disabled, setDisabled] = useState(false);

  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [fbBankCode, setFbBankCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [fbProductCode, setFbProductCode] = useState('');

  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [minIncome, setMinIncome] = useState(0);
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [minLoanRatio, setMinLoanRatio] = useState(0);
  const [maxLoanRatio, setMaxLoanRatio] = useState(0);
  const [minLoanTenure, setMinLoanTenure] = useState(0);
  const [maxLoanTenure, setMaxLoanTenure] = useState(0);
  const [minInterestRateMen, setMinInterestRateMen] = useState(0);
  const [minInterestRateWomen, setMinInterestRateWomen] = useState(0);
  const [minProcessingFee, setMinProcessingFee] = useState(0);
  const [minPreclosureCharge, setMinPreclosureCharge] = useState(0);
  const [maxPreclosureCharge, setMaxPreclosureCharge] = useState(0);
  const [fbProcessingFee, setFbProcessingFee] = useState(0);
  const [minProcessingFeeSlab, setMinProcessingFeeSlab] = useState(0);
  const [maxProcessingFeeSlab, setMaxProcessingFeeSlab] = useState(0);
  const [coApplicantMaxEMI, setCoApplicantMaxEMI] = useState(0);
  const [coApplicantMinAge, setCoApplicantMinAge] = useState(0);
  const [coApplicantMinSalary, setCoApplicantMinSalary] = useState(0);
  const [documents, setDocuments] = useState('');
  const [eligibilty, setEligibility] = useState('');
  const [details, setDetails] = useState('');
  const [fbOffers, setFbOffers] = useState('');
  

  
  const handleSubmit = async e => {
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
        

      const response = await client.request(ADD_PRODUCT_DATA,variables);
      console.log(response);
      setDisabled(true);
    } catch (err) {
        console.log(err);
    }
  };


  const handleBankName = (event) => {
    setBankName(event.target.value);
    if(event.target.value==="ICICI Bank Ltd") { setBankCode("ICIC"); setFbBankCode("BNK101"); }
    else if(event.target.value==="HDFC Bank Ltd") { setBankCode("HDFC"); setFbBankCode("BNK102"); }
    else if(event.target.value==="HDFC Ltd") { setBankCode("HDFL"); setFbBankCode("BNK103"); }
    else if(event.target.value==="HDB Ltd") { setBankCode("HDBL"); setFbBankCode("BNK104"); }
    else if(event.target.value==="Kotak Mahindra Bank") { setBankCode("KTMB"); setFbBankCode("BNK105"); }
    else if(event.target.value==="Federal Bank") { setBankCode("FEDB"); setFbBankCode("BNK106"); }
    else if(event.target.value==="DCB Bank") { setBankCode("DCBB"); setFbBankCode("107"); }
    else if(event.target.value==="Shinhan Bank") { setBankCode("SHNB"); setFbBankCode("BNK108"); }
    else if(event.target.value==="Home First Finance Corporation") { setBankCode("HFFC"); setFbBankCode("BNK109"); }
    else if(event.target.value==="Indostar Capital") { setBankCode("IDSC"); setFbBankCode("BNK110"); }
    else if(event.target.value==="Reliance Capital") { setBankCode("RELC"); setFbBankCode("BNK111"); }
    else if(event.target.value==="PNB Housing Finance") { setBankCode("PNBH"); setFbBankCode("BNK112"); }
    else if(event.target.value==="SBI Capital Securities") { setBankCode("SBIS"); setFbBankCode("BNK113"); }
    else if(event.target.value==="IDFC Bank") { setBankCode("IDFC"); setFbBankCode("BNK114"); }
    else if(event.target.value==="Aditya Birla Housing Finance") { setBankCode("ABHF"); setFbBankCode("BNK115"); }
    else if(event.target.value==="Tata Capital Housing Finance") { setBankCode("TCHF"); setFbBankCode("BNK116"); }
    else if(event.target.value==="Indiabulls Home Loans") { setBankCode("IBHL"); setFbBankCode("BNK117"); }
    else if(event.target.value==="Vistaar Finance") { setBankCode("VISF"); setFbBankCode("BNK118"); }
    else if(event.target.value==="Ratnakar Bank Ltd") { setBankCode("RNBL"); setFbBankCode("BNK119"); }
    else { setBankCode("EDWF"); setFbBankCode("BNK120	"); }
  };

  const handleProductName = (event) => {
    setProductName(event.target.value);
    if(event.target.value==="Home Loan")
    {
      setProductCode("HL");
      setFbProductCode("PDC101");
    }
    else if(event.target.value==="Loan Against Property")
    {
      setProductCode("LAP");
      setFbProductCode("PDC102");
    }
    else if(event.target.value==="Business Loan")
    {
      setProductCode("BL");
      setFbProductCode("PDC103");
    }
    else if(event.target.value==="Personal Loan")
    {
      setProductCode("PL");
      setFbProductCode("PDC104");
    }
    else {
      setProductCode("OD");
      setFbProductCode("PDC105");
    }

  };


  return (
    <> 
      <br />
      <Col md={12} className="float-right">
          <Button className="float-right" variant="success" onClick={handleSubmit}>Create</Button>
      </Col>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Bank Name</Form.Label>
          <Form.Control value={bankName} onChange={handleBankName} as="select" custom disabled={disabled}>
            <option value="">-------</option>
            <option value="Ratnakar Bank Ltd">Ratnakar Bank Ltd</option>
            <option value="Edelweiss Finance">Edelweiss Finance</option>
            <option value="ICICI Bank Ltd">ICICI Bank Ltd</option>
            <option value="SBI Capital Securities">SBI Capital Securities</option>
            <option value="IDFC Bank">IDFC Bank</option>
            <option value="Aditya Birla Housing Finance">Aditya Birla Housing Finance</option>
            <option value="Tata Capital Housing Finance">Tata Capital Housing Finance</option>
            <option value="Indiabulls Home Loans">Indiabulls Home Loans</option>
            <option value="Vistaar Finance">Vistaar Finance</option>
            <option value="HDFC Bank Ltd">HDFC Bank Ltd</option>
            <option value="HDFC Ltd">HDFC Ltd</option>
            <option value="HDB Ltd">HDB Ltd</option>
            <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
            <option value="PNB Housing Finance">PNB Housing Finance</option>
            <option value="Reliance Capital">Reliance Capital</option>
            <option value="Indostar Capital">Indostar Capital</option>
            <option value="Home First Finance Corporation">Home First Finance Corporation</option>
            <option value="Shinhan Bank">Shinhan Bank</option>
            <option value="DCB Bank">DCB Bank</option>
            <option value="Federal Bank">Federal Bank</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Product Name</Form.Label>
          <Form.Control value={productName} onChange={handleProductName} id="productName" as="select" custom disabled={disabled}>
            <option value="">-------</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Loan Against Property">Loan Against Property</option>
            <option value="Business Loan" >Business Loan</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Overdraft">Overdraft</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Min Age</Form.Label>
          <Form.Control type="text" placeholder="Enter Minimum Age" value={minAge} disabled={disabled} onChange={e => setMinAge(parseFloat(e.target.value))} />
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

export default ProductDetailsAdd;
