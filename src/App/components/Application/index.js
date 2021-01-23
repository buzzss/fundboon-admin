import React, { useState } from 'react';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classNames from 'classnames';

import Swal from 'sweetalert2';
import FuzzySearch from 'fuzzy-search';
import { useClient } from '../../../client';
import { useCookies } from 'react-cookie';
import { GET_ALL_APPLICATIONS_QUERY } from '../../../graphql/queries';
import { DELETE_APPLICATION_MUTATION } from "../../../graphql/mutation";
import ViewApplication from "./ViewApplication";

import Aux from "../../../Admin/hoc/_Aux";
import { ContactSupportOutlined } from '@material-ui/icons';
  
const selectApplications = () => {
    const checkboxes = document.querySelectorAll(".checkboxApplications");

    const response = [];
    checkboxes.forEach((ele) => {
        const applicationNumber = ele.getAttribute("data-id");
        if (ele.checked) {
            response.push(applicationNumber);
        }
    });
    return response;
};

var applications = [];

const Application = () =>  {
    const client = useClient();
    const [cookies, removeCookie] = useCookies(['user']);
    const [application, setApplication] = useState([]);
    const [isLoading, setLoading] = useState('loading');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [viewApplication, setViewApplication] = useState(null);

    const [search, setSearch] = useState("");
    const [applicationsSelected, setSelectedApplications] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseShow = () => {
        getApplicationsRequest();
        setShowView(false);
        setApplicationId('');
    }
    const handleShowView = (event, value, application) => {
        setShowView(true);
        setApplicationId(value);
        setViewApplication(application);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleShowDelete = () => {
        setSelectedApplications(selectApplications());
        setShowDelete(true);
    };
    
    const doDelete = async () => {
        const data = applicationsSelected.map((ele) => ({ applicationNumber: ele }));
        const variables = {
            applicationNumbers: data,
        };
        const response = await client.request(DELETE_APPLICATION_MUTATION, variables);
        console.log(response);
        setShowDelete(false);
        getApplicationsRequest();
    };
    
      
    

    const getApplicationsRequest = async e => {
        try {
            const application = await client.request(GET_ALL_APPLICATIONS_QUERY);

            setApplication(application.getAllApplicationsRequest);
            console.log(application);
            setLoading('');
        } catch (err) {
            console.log(err);
            setLoading('');
        }
    };
    const Get = () => {
    if (isLoading == 'loading') getApplicationsRequest();
    };
    const Details = () => {

    const searcher = new FuzzySearch(
        application,
        ["personalDetails.firstName", "personalDetails.lastName", "applicationNumber", "loanDetails.loanAmount", "bankName", "reviewStatus", "type"],
        {
            caseSensitive: false,
        }
    );

    const result = searcher.search(search);

    const card = [];
    
    for (let i = 0; i < result.length; i++) {
        var theDate = new Date(result[i].appliedAt/1);
        var dateString = theDate.toGMTString();

        var data = {};
        data['id'] = i;

        applications.push(data);

        card.push(
        <tr>
            <td>
            <input 
            data-id={result[i].applicationNumber}
            className="checkboxApplications"
            type="checkbox" />
            </td>
            <td scope="row">
            {' '}
            {i + 1}
            </td>
            <td>
            {' '}
            {dateString}
            </td>
            <td>
            {' '}
            {dateString}
            </td>
            <td>
            {' '}
            {result[i].applicationNumber}{' '}
            </td>
            <td>
            {' '}
            {result[i].type}
            </td>
            <td>
            {' '}
            {result[i].personalDetails.firstName}{' '}{result[i].personalDetails.lastName}{' '}
            </td>
            <td>
            {' '}
            {i+1000}
            </td>
            <td>
            {' '}
            {result[i].loanDetails.loanAmount}{' '}
            </td>
            <td>
            {' '}
            {result[i].bankName}{' '}
            </td>
            <td>
            {' '}
            {result[i].reviewStatus}
            </td>
            <td>
            {' '}
            FBrep {i}
            </td>
            <td>
            {' '}
            <Button onClick={(event) => handleShowView(event, i, result[i])}>View</Button>
            </td>
        </tr>
        );
    }
    return card;
    };
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                            
                                <Card.Title as="h5">Application Management</Card.Title>
                                <span className="d-block m-t-5">Easily manage applications here.</span>
                                <ReactHTMLTableToExcel
                                className="float-right btn btn-success"
                                table="table-to-xls"
                                filename="fundboon-applications"
                                sheet="fundboon-applications"
                                buttonText="Download as Excel"/>
                                <Col md={4} className="float-right">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Search" 
                                    className="mb-3"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)} />
                                </Col>
                            </Card.Header>
                            <Card.Body>

                            <Modal show={showView} onHide={handleCloseShow} size="xl">
                                <Modal.Header closeButton>
                                <Modal.Title>View Application</Modal.Title>
                                </Modal.Header>
                                
                                <Modal.Body>
                                <ViewApplication getApplicationsRequest={getApplicationsRequest} viewApplication={viewApplication} {...applications[applicationId]} />
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseShow}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={showDelete} onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                <Modal.Title>Confirm Deletion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                Are you sure you want to delete the selected applications ?
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDelete}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={doDelete}>
                                    Confirm
                                </Button>
                                </Modal.Footer>
                            </Modal>

                                <Table responsive hover id="table-to-xls">
                                    <thead>
                                    <tr>
                                        <th>Select</th>
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
                                    {isLoading == 'loading' ? Get() : <Details />}
                                    </tbody>
                                </Table>
                                <br />
                                <Button className="float-right" variant="danger" onClick={handleShowDelete}>Delete</Button>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

export default Application;