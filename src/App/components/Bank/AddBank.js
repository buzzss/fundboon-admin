import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import ProductDetailsAdd from "./ProductDetailsAdd";

const AddBank = () => {
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
            Product Details
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {currentForm === 1 && <ProductDetailsAdd  />}
    </>
  );
};

export default AddBank;
