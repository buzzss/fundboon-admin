import React, { useState } from "react";
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import Swal from "sweetalert2";
import FuzzySearch from "fuzzy-search";
import { useClient } from "../../../client";
import { useCookies } from "react-cookie";
import { GET_ALL_APPLICATIONS_QUERY } from "../../../graphql/queries";
import ViewApplication from "../Application/ViewApplication";


const applications = [];

const Applications = (props) => {
  let { application } = props;
  application = application || [];

  const [showView, setShowView] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleCloseShow = () => {
    setShowView(false);
    setApplicationId("");
  };
  const handleShowView = (event, value) => {
    setShowView(true);
    setApplicationId(value);
  };

  const Details = () => {
    const card = [];

    for (let i = 0; i < application.length; i++) {
      var theDate = new Date(application[i].appliedAt / 1);
      var dateString = theDate.toGMTString();

      var data = {};
      data["id"] = i;

      applications.push(data);

      card.push(
        <tr>
          <td scope="row"> {i + 1}</td>
          <td> {dateString}</td>
          <td> {dateString}</td>
          <td> {application[i].applicationNumber} </td>
          <td> {application[i].type}</td>
          <td>
            {" "}
            {application[i].personalDetails.firstName}{" "}
            {application[i].personalDetails.lastName}{" "}
          </td>
          <td> {i + 1000}</td>
          <td> {application[i].loanDetails.loanAmount} </td>
          <td> {application[i].bankName} </td>
          <td> {application[i].reviewStatus}</td>
          <td> FBrep {i}</td>
          <td>
            {" "}
            <Button onClick={(event) => handleShowView(event, i)}>View</Button>
          </td>
        </tr>
      );
    }
    return card;
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Modal show={showView} onHide={handleCloseShow} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>View Application</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ViewApplication {...applications[applicationId]} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShow}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Applied Date</th>
                <th>Updated Date</th>
                <th>Application Number</th>
                <th>Product Type</th>
                <th>Customer Name</th>
                <th>Associate ID</th>
                <th>Loan Amount</th>
                <th>Bank Name</th>
                <th>Status</th>
                <th>FB Rep</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <Details />
            </tbody>
          </Table>
          <br />
        </Card.Body>
      </Card>
    </>
  );
};

export default Applications;
