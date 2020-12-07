import React, { useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import PersonalInformation from "./PersonalInformationView";
import ContactInformation from "./ContactInformationView";
import EducationInformation from "./EducationInformationView";
import EmployeeInformation from "./EmploymentInformationView";
import Applications from "./ApplicationView";
import { useClient } from "../../../client";
import {
  GET_USER_QUERY,
  GET_USER_APPLICATION_QUERY,
} from "../../../graphql/queries";

const ViewUser = (props) => {
  const client = useClient();
  const { id } = props;
  const [currentForm, updateCurrentForm] = useState(1);
  const handleSelect = (eventKey) => updateCurrentForm(parseInt(eventKey));
  const [data, setData] = useState([]);
  const [application, setApplication] = useState([]);

  const fetchData = async () => {
    const variables = {
      id: id,
    };
    const response = await client.request(GET_USER_QUERY, variables);
    const applicationResponse = await client.request(
      GET_USER_APPLICATION_QUERY,
      variables
    );
    setData(response.getUser);
    setApplication(applicationResponse.getUserApplications);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Nav.Item>
          <Nav.Link eventKey="6" href="#">
            Applications
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {currentForm === 1 && <PersonalInformation data={data} />}
      {currentForm === 2 && <ContactInformation data={data} />}
      {currentForm === 3 && <EducationInformation data={data} />}
      {currentForm === 4 && <EmployeeInformation data={data} />}
      {currentForm === 6 && (
        <Applications data={data} application={application} />
      )}
    </>
  );
};

export default ViewUser;
