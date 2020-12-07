import React, { useState } from 'react';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classNames from 'classnames';

import Swal from 'sweetalert2';
import FuzzySearch from 'fuzzy-search';
import { useClient } from '../../../client';
import { useCookies } from 'react-cookie';
import { GET_ALL_PRODUCTS_QUERY } from '../../../graphql/queries';
import ViewBank from "./ViewBank";

import Aux from "../../../Admin/hoc/_Aux";
import { ContactSupportOutlined } from '@material-ui/icons';
import { get } from 'jquery';

var products = [];

const Bank = () =>  {
    const client = useClient();
    const [cookies, removeCookie] = useCookies(['user']);
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState('loading');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [productId, setProductId] = useState('');


    const handleCloseShow = () => {
        setShowView(false);
        setProductId('');
    }
    const handleShowView = (event, value) => {
        setShowView(true);
        setProductId(value);
    }
    

    const getProductsRequest = async e => {
    try {
        const getAllProducts = await client.request(GET_ALL_PRODUCTS_QUERY);
        setProduct(getAllProducts.getAllProducts);
        console.log(product);
        setLoading('');
    } catch (err) {
        console.log(err);
        setLoading('');
    }
    };
    const Get = () => {
    if (isLoading == 'loading') getProductsRequest();
    };
    const Details = () => {
    const card = [];

    for (let i = 0; i < product.length; i++) {
        var data = {};
        data['id'] = i;
        

        products.push(data);

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
            {product[i].fbBankCode}{' '}
            </td>
            <td>
            {' '}
            {product[i].bankName}{' '}
            </td>
            <td>
            {' '}
            {product[i].bankCode}{' '}
            </td>
            <td>
            {' '}
            {product[i].fbProductCode}{' '}
            </td>
            <td>
            {' '}
            {product[i].productName}{' '}
            </td>
            <td>
            {' '}
            {product[i].productCode}{' '}
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
                            
                                <Card.Title as="h5">Banks & Services Management</Card.Title>
                                <span className="d-block m-t-5">Easily manage banks & services here.</span>
                                <ReactHTMLTableToExcel
                                className="float-right btn btn-success"
                                table="table-to-xls"
                                filename="fundboon-products"
                                sheet="fundboon-products"
                                buttonText="Download as Excel"/>
                                <Col md={4} className="float-right">
                                    <Form.Control type="text" placeholder="Search" className="mb-3" />
                                </Col>
                            </Card.Header>
                            <Card.Body>

                            <Modal show={showView} onHide={handleCloseShow} size="lg">
                                <Modal.Header closeButton>
                                <Modal.Title>View Bank</Modal.Title>
                                </Modal.Header>
                                
                                <Modal.Body>
                                <ViewBank {...products[productId]} />
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
                                        <th>Bank ID</th>
                                        <th>Bank Name</th>
                                        <th>Bank Code</th>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Product Code</th>
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

export default Bank;