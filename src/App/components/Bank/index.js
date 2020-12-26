import React, { useState } from 'react';
import {Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import classNames from 'classnames';

import Swal from 'sweetalert2';
import FuzzySearch from 'fuzzy-search';
import { useClient } from '../../../client';
import { useCookies } from 'react-cookie';
import { GET_ALL_PRODUCTS_QUERY } from '../../../graphql/queries';
import { DELETE_PRODUCT_MUTATION } from "../../../graphql/mutation";
import ViewBank from "./ViewBank";
import AddBank from "./AddBank";

import Aux from "../../../Admin/hoc/_Aux";
import { ContactSupportOutlined } from '@material-ui/icons';
import { get } from 'jquery';

const selectProducts = () => {
    const checkboxes = document.querySelectorAll(".checkboxProducts");

    const response = [];
    checkboxes.forEach((ele) => {
        const fbProductCode = ele.getAttribute("data-id");
        if (ele.checked) {
            response.push(fbProductCode);
        }
    });
    return response;
};

var products = [];

const Bank = () =>  {
    const client = useClient();
    const [cookies, removeCookie] = useCookies(['user']);
    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState('loading');
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [productId, setProductId] = useState('');


    const [search, setSearch] = useState("");
    const [productsSelected, setSelectedProducts] = useState([]);
    const [showDelete, setShowDelete] = useState(false);


    const handleCloseShow = () => {
        setShowView(false);
        setProductId('');
    }
    const handleShowView = (event, value) => {
        setShowView(true);
        setProductId(value);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleShowDelete = () => {
        setSelectedProducts(selectProducts());
        setShowDelete(true);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const doDelete = async () => {
        const data = productsSelected.map((ele) => ({ fbProductCode: ele }));
        const variables = {
            productCodes: data,
        };
        const response = await client.request(DELETE_PRODUCT_MUTATION, variables);
        console.log(response);
        setShowDelete(false);
        getProductsRequest();
    };
    

    const getProductsRequest = async e => {
    try {
        const getAllProducts = await client.request(GET_ALL_PRODUCTS_QUERY);
        setProduct(getAllProducts.getAllProducts);
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

    const searcher = new FuzzySearch(
        product,
        ["fbBankCode", "bankName", "bankCode", "fbProductCode", "productName", "productCode"],
        {
            caseSensitive: true,
        }
    );

    const result = searcher.search(search);

    for (let i = 0; i < result.length; i++) {
        var data = {};
        data['id'] = i;
        

        products.push(data);

        card.push(
        <tr>
            <td>
            <input 
            data-id={result[i]._id}
            className="checkboxProducts"
            type="checkbox" />
            </td>
            <td scope="row">
            {' '}
            {i + 1}
            </td>
            <td>
            {' '}
            {result[i].fbBankCode}{' '}
            </td>
            <td>
            {' '}
            {result[i].bankName}{' '}
            </td>
            <td>
            {' '}
            {result[i].bankCode}{' '}
            </td>
            <td>
            {' '}
            {result[i].fbProductCode}{' '}
            </td>
            <td>
            {' '}
            {result[i].productName}{' '}
            </td>
            <td>
            {' '}
            {result[i].productCode}{' '}
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
                                <Button
                                    className="float-right"
                                    variant="secondary"
                                    onClick={handleShow}
                                >
                                    New Product
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
                                <Modal.Title>Add Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <AddBank />
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
                                <Button className="float-right" variant="danger" onClick={handleShowDelete}>Delete</Button>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

export default Bank;