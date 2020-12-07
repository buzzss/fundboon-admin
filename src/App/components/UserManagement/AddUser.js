import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import PersonalInformation from "./PersonalInformationAdd";
import ContactInformation from "./ContactInformationAdd";
import EducationInformation from "./EducationInformationAdd";
import EmployeeInformation from "./EmploymentInformationAdd";

const AddUser = (props) => {
  const [currentForm, updateCurrentForm] = useState(1);
  const handleSelect = (eventKey) => updateCurrentForm(parseInt(eventKey));
  const { data, setData, error } = props;

  return (
    <>
      <Nav
        variant="pills"
        activeKey={currentForm}
        onSelect={handleSelect}
        style={{ marginBottom: "1.5rem" }}
      >
        <Nav.Item>
          <Nav.Link eventKey="1" href="#">
            Personal
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" href="#">
            Contact
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" href="#">
            Education
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="4" href="#">
            Employment
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {currentForm === 1 && (
        <PersonalInformation data={data} setData={setData} />
      )}
      {currentForm === 2 && (
        <ContactInformation data={data} setData={setData} />
      )}
      {currentForm === 3 && (
        <EducationInformation data={data} setData={setData} />
      )}
      {currentForm === 4 && (
        <EmployeeInformation data={data} setData={setData} />
      )}
    </>
  );
};

export default AddUser;
