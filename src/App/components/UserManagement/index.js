import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import classNames from "classnames";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";

import Swal from "sweetalert2";
import FuzzySearch from "fuzzy-search";
import { useClient } from "../../../client";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useCookies } from "react-cookie";
import { getAllUsersForAdmin } from "../../../graphql/queries";
import {
  DELETE_MUTATION,
  DEACTIVATE_MUTATION,
  ADD_USER_DATA,
} from "../../../graphql/mutation";

import Aux from "../../../Admin/hoc/_Aux";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const selectUsers = () => {
  const checkboxes = document.querySelectorAll(".checkboxUsers");

  const response = [];
  checkboxes.forEach((ele) => {
    const id = ele.getAttribute("data-id");
    if (ele.checked) {
      response.push(id);
    }
  });
  return response;
};

const UserManagement = () => {
  const client = useClient();
  const [cookies, removeCookie] = useCookies(["user"]);
  const [usersAdmin, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState("loading");
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [usersSelected, setSelectedUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);

  const initialState = {
    personalDetails: {
      userType: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      nationality: "",
      dob: "",
      pan: "",
      aadhar: "",
      password: "",
    },
    contactDetails: {
      houseNumber: "",
      locality: "",
      city: "",
      state: "",
      pinCode: "",
      accomodationType: "",
      residenceYear: "",
      addressCheck: "",
    },
    qualificationDetails: {
      qualification: "",
    },
    employmentDetails: {
      company: "",
      income: "",
      employmentType: "",
    },
  };
  const [data, setData] = useState(initialState);

  const getMutationData = () => {
    const variable = {};
    variable["email"] = data.personalDetails.email;
    variable["role"] = data.personalDetails.userType;
    variable["password"] = data.personalDetails.password;

    variable["company"] = data.employmentDetails.company;
    variable["income"] = data.employmentDetails.income;
    variable["employmentType"] = data.employmentDetails.employmentType;

    variable["qualification"] = data.qualificationDetails.qualification;

    variable["houseNumber"] = data.contactDetails.houseNumber;
    variable["locality"] = data.contactDetails.locality;
    variable["city"] = data.contactDetails.city;
    variable["state"] = data.contactDetails.state;
    variable["pinCode"] = data.contactDetails.pinCode;
    variable["accomodationType"] = data.contactDetails.accomodationType;
    variable["residenceYear"] = data.contactDetails.residenceYear;
    variable["addressCheck"] = data.contactDetails.addressCheck;

    variable["firstName"] = data.personalDetails.firstName;
    variable["lastName"] = data.personalDetails.lastName;
    variable["gender"] = data.personalDetails.gender;
    variable["dob"] = data.personalDetails.dob;
    variable["mobileNumber"] = data.personalDetails.phoneNumber;

    variable["pan"] = data.personalDetails.pan;
    variable["aadhaar"] = data.personalDetails.aadhar;
    variable["nationality"] = data.personalDetails.nationality;

    return variable;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseShow = () => setShowView(false);
  const handleShowView = (id) => {
    setSelectedId(id);
    setShowView(true);
  };
  const getUsersRequest = async (e) => {
    try {
      const users = await client.request(getAllUsersForAdmin);
      const response = users.getUsersAdmin;
      for (let i = 0; i < response.length; i++) {
        response[i].checked = false;
      }
      setUsers(response);
      setLoading("");
      console.log(users);
    } catch (err) {
      console.log(err);
      setLoading("");
    }
  };

  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState("");

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const doDelete = async () => {
    const data = usersSelected.map((ele) => ({ id: ele }));
    const variables = {
      ids: data,
    };
    await client.request(DELETE_MUTATION, variables);
    setShowDelete(false);
    getUsersRequest();
  };

  const handleShowDelete = () => {
    setSelectedUsers(selectUsers());
    setShowDelete(true);
  };

  const [showDeactivate, setShowDeactivate] = useState(false);

  const handleCloseDeactivate = () => {
    setShowDeactivate(false);
  };

  const doDeativate = async () => {
    const data = usersSelected.map((ele) => ({ id: ele }));
    const variables = {
      ids: data,
    };
    await client.request(DEACTIVATE_MUTATION, variables);
    setShowDeactivate(false);
    getUsersRequest();
  };

  const handleShowDeactivate = () => {
    setSelectedUsers(selectUsers());
    setShowDeactivate(true);
  };

  const handleCreate = async () => {
    const fields = Object.values(data);
    // for (let i = 0; i < fields.length; i++) {
    //   const current = fields[i];
    //   const response = Object.entries(current).filter((ele) => {
    //     return ele[1].length === 0;
    //   });
    //   if (response.length !== 0) {
    //     setError(`${response[0][0]} cannot be blank`);
    //     return;
    //   }
    // }
    const variable = getMutationData();
    console.log(variable);
    const response = await client.request(ADD_USER_DATA, variable);
    const { addUser } = response;
    if (!addUser) {
      setError("Email needs to be unique");
      return;
    }
    setError("");
    setData(initialState);
    getUsersRequest();
    handleClose();
  };

  const Get = () => {
    if (isLoading == "loading") getUsersRequest();
  };

  const Details = () => {
    const card = [];
    const searcher = new FuzzySearch(
      usersAdmin,
      ["personalDetails.firstName", "personalDetails.lastName", "id"],
      {
        caseSensitive: true,
      }
    );

    const result = searcher.search(search);

    for (let i = 0; i < result.length; i++) {
      let createDate, updatedDate, lastLoginDate;
      if (result[i].createdDate) {
        createDate = new Date(result[i].createdDate / 1).toGMTString();
      } else {
        createDate = "Not Available";
      }
      if (result[i].updatedDate) {
        updatedDate = new Date(result[i].updatedDate / 1).toGMTString();
      } else {
        updatedDate = "Not Available";
      }
      if (result[i].lastLoginDate) {
        lastLoginDate = new Date(result[i].lastLoginDate / 1).toGMTString();
      } else {
        lastLoginDate = "Not Available";
      }
      let name = "";
      if (result[i].personalDetails.firstName) {
        name = result[i].personalDetails.firstName;
      }
      if (result[i].personalDetails.lastName) {
        if (name) {
          name += " " + result[i].personalDetails.lastName;
        } else {
          name = result[i].lastName;
        }
      }
      if (!name) {
        name = "Not Available";
      }

      card.push(
        <tr key={i}>
          <td>
            <input
              data-id={result[i].id}
              className="checkboxUsers"
              type="checkbox"
            />
          </td>
          <td scope="row"> {i + 1}</td>
          <td> {createDate}</td>
          <td> {updatedDate} </td>
          <td> {lastLoginDate}</td>
          <td> {result[i].id} </td>
          <td>{capitalize(result[i].role)}</td>
          <td>{name}</td>
          <td> {result[i].adminViewID}</td>
          <td> {result[i].deactivate ? "Deactivated" : "Active"}</td>
          <td>
            {" "}
            <Button onClick={() => handleShowView(result[i].id)}>View</Button>
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
              <Card.Title as="h5">User Management</Card.Title>
              <span className="d-block m-t-5">Easily manage users here.</span>
              <ReactHTMLTableToExcel
              className="float-right btn btn-success"
              table="table-to-xls"
              filename="fundboon-users"
              sheet="fundboon-users"
              buttonText="Download as Excel"/>
              <Button
                className="float-right"
                variant="secondary"
                onClick={handleShow}
              >
                New User
              </Button>
              <Modal show={showView} onHide={handleCloseShow} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ViewUser id={selectedId} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseShow}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddUser data={data} setData={setData} error={error} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCreate}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete the users ?
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

              <Modal show={showDeactivate} onHide={handleCloseDeactivate}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deactivation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to deactivate the users ?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDeactivate}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={doDeativate}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>

              <Col md={4} className="float-right">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mb-3"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Col>
            </Card.Header>
            <Card.Body>
              <Table responsive hover id="table-to-xls">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Sr.No.</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Last Login Date</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Associate ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{isLoading == "loading" ? Get() : <Details />}</tbody>
              </Table>
              <br />
              <Button
                className="float-right"
                variant="danger"
                onClick={handleShowDelete}
              >
                Delete User
              </Button>
              <Button
                className="float-right"
                variant="warning"
                onClick={handleShowDeactivate}
              >
                Deactivate User
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default UserManagement;
