import React, { useState } from 'react';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classNames from 'classnames';

import Swal from 'sweetalert2';
import FuzzySearch from 'fuzzy-search';
import { useClient } from '../../../client';
import { useCookies } from 'react-cookie';
import { GET_ALL_LEADS_QUERY } from '../../../graphql/queries';
import ViewLeads from "./ViewLeads";

import Aux from "../../../Admin/hoc/_Aux";
import { ContactSupportOutlined } from '@material-ui/icons';
import { get } from 'jquery';

var leads = [];

const BankLeads = () =>  {
    const client = useClient();
    const [cookies, removeCookie] = useCookies(['user']);
    const [lead, setLead] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState('loading');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [leadId, setLeadId] = useState('');


    const handleCloseShow = () => {
        setShowView(false);
        setLeadId('');
    }
    const handleShowView = (event, value) => {
        setShowView(true);
        setLeadId(value);
    }
    

    const getLeadsRequest = async e => {
    try {
        const getAllLeads = await client.request(GET_ALL_LEADS_QUERY);
        console.log(getAllLeads);
        setLead(getAllLeads.getAllLeads);
        console.log(lead+"test");
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

    for (let i = 0; i < lead.length; i++) {
        var data = {};
        data['id'] = i;
        

        leads.push(data);

        card.push(
        <tr>
            <td>
            <input className="form-control" type="checkbox" />
            </td>
            <td scope="row">
            {' '}
            {i + 1}
            </td>
            <td>
            {' '}
            {lead[i].leadId}{' '}
            </td>
            <td>
            {' '}
            {lead[i].date}{' '}
            </td>
            <td>
            {' '}
            {lead[i].dateOfApply}{' '}
            </td>
            <td>
            {' '}
            {lead[i].updateDate}{' '}
            </td>
            <td>
            {' '}
            {lead[i].refererId}{' '}
            </td>
            <td>
            {' '}
            {lead[i].name}{' '}
            </td>
            <td>
            {' '}
            {lead[i].loanType}{' '}
            </td>
            <td>
            {' '}
            {lead[i].amount}{' '}
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
                                <Col md={4} className="float-right">
                                    <Form.Control type="text" placeholder="Search" className="mb-3" />
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
                                <Button className="float-right" variant="danger" onClick={() => {alert('To be added.')}}>Delete</Button>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

export default BankLeads;