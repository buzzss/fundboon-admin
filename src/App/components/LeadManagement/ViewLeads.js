import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import LeadDetails from "./LeadDetailsView";

const ViewLeads = props => {
  const [currentForm, updateCurrentForm] = useState(1);
  const handleSelect = (eventKey) => updateCurrentForm(parseInt(eventKey));
  
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
            Leads Details
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {currentForm === 1 && <LeadDetails {...props} />}
    </>
  );
};

export default ViewLeads;
