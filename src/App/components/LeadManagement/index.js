import React, { useState } from 'react';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classNames from 'classnames';

import Swal from 'sweetalert2';
import FuzzySearch from 'fuzzy-search';
import { useClient } from '../../../client';
import { useCookies } from 'react-cookie';
import { GET_ALL_LEADS_QUERY } from '../../../graphql/queries';
import { DELETE_LEAD_MUTATION } from "../../../graphql/mutation";
import ViewLeads from "./ViewLeads";
import AddLeads from "./AddLeads";

import Aux from "../../../Admin/hoc/_Aux";
import { ContactSupportOutlined } from '@material-ui/icons';
import { get } from 'jquery';

var leads = [];

const selectLeads = () => {
    const checkboxes = document.querySelectorAll(".checkboxLeads");

    const response = [];
    checkboxes.forEach((ele) => {
        const leadId = ele.getAttribute("data-id");
        if (ele.checked) {
            response.push(leadId);
        }
    });
    return response;
};


const BankLeads = () =>  {
    const client = useClient();
    const [cookies, removeCookie] = useCookies(['user']);
    const [lead, setLead] = useState([]);
    const [isLoading, setLoading] = useState('loading');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [leadId, setLeadId] = useState('');

    const [search, setSearch] = useState("");
    const [leadsSelected, setSelectedLeads] = useState([]);
    const [showDelete, setShowDelete] = useState(false);


    const handleCloseShow = () => {
        setShowView(false);
        setLeadId('');
    }
    const handleShowView = (event, value) => {
        setShowView(true);
        setLeadId(value);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleShowDelete = () => {
        setSelectedLeads(selectLeads());
        setShowDelete(true);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const doDelete = async () => {
        const data = leadsSelected.map((ele) => ({ leadId: ele }));
        const variables = {
            leadIds: data,
        };
        const response = await client.request(DELETE_LEAD_MUTATION, variables);
        console.log(response);
        setShowDelete(false);
        getLeadsRequest();
    };
    

    const getLeadsRequest = async e => {
    try {
        const getAllLeads = await client.request(GET_ALL_LEADS_QUERY);
        setLead(getAllLeads.getAllLeads);
        setLoading('');
    } catch (err) {
        console.log(err);
        setLoading('');
    }
    };
    const Get = () => {
    if (isLoading == 'loading') getLeadsRequest();
    };
    const Details = () => {
    const card = [];

    const searcher = new FuzzySearch(
        lead,
        ["leadId", "refererId", "name", "loanType"],
        {
            caseSensitive: true,
        }
    );

    const result = searcher.search(search);

    for (let i = 0; i < result.length; i++) {
        var data = {};
        data['id'] = i;
        

        leads.push(data);

        card.push(
        <tr>
            <td>
            <input
            data-id={result[i].leadId}
            className="checkboxLeads"
            type="checkbox" />
            </td>
            <td scope="row">
            {' '}
            {i + 1}
            </td>
            <td>
            {' '}
            {result[i].leadId}{' '}
            </td>
            <td>
            {' '}
            {result[i].date}{' '}
            </td>
            <td>
            {' '}
            {result[i].dateOfApply}{' '}
            </td>
            <td>
            {' '}
            {result[i].updateDate}{' '}
            </td>
            <td>
            {' '}
            {result[i].refererId}{' '}
            </td>
            <td>
            {' '}
            {result[i].name}{' '}
            </td>
            <td>
            {' '}
            {result[i].loanType}{' '}
            </td>
            <td>
            {' '}
            {result[i].amount}{' '}
            </td>
            <td>
            {' '}
            <Button onClick={(event) => handleShowView(event, i)}>View</Button>
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
                            
                                <Card.Title as="h5">Leads Management</Card.Title>
                                <span className="d-block m-t-5">Easily manage leads here.</span>
                                <ReactHTMLTableToExcel
                                className="float-right btn btn-success"
                                table="table-to-xls"
                                filename="fundboon-leads"
                                sheet="fundboon-leads"
                                buttonText="Download as Excel"/>
                                <Button
                                    className="float-right"
                                    variant="secondary"
                                    onClick={handleShow}
                                >
                                    New Lead
                                </Button>
                                <Col md={4} className="float-right">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Search" 
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="mb-3" />
                                </Col>
                            </Card.Header>
                            <Card.Body>

                            <Modal show={showView} onHide={handleCloseShow} size="lg">
                                <Modal.Header closeButton>
                                <Modal.Title>View Leads Details</Modal.Title>
                                </Modal.Header>
                                
                                <Modal.Body>
                                <ViewLeads {...leads[leadId]} />
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
                                Are you sure you want to delete the selected products ?
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

                            <Modal show={show} onHide={handleClose} size="lg">
                                <Modal.Header closeButton>
                                <Modal.Title>Add Lead</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <AddLeads />
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>

                                <Table responsive hover id="table-to-xls">
                                    <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Sr.No.</th>
                                        <th>Lead ID</th>
                                        <th>Created Date</th>
                                        <th>Date of Apply</th>
                                        <th>Updated Dated</th>
                                        <th>Referer ID</th>
                                        <th>Name of the Lead</th>
                                        <th>Product Name of interest</th>
                                        <th>Loan Amount</th>
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

export default BankLeads;