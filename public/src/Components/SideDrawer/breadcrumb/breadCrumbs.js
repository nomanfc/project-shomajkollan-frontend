import * as React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BreadCrumbsCustom() {
  const history = useNavigate();
    const paths = "/adminpanel";
    const path = paths.charAt(1).toUpperCase() + paths.slice(2);

  return (
    <Breadcrumb style={{ fontSize: "18px" }}>
      <Breadcrumb.Item href="/">
        <FaHome style={{ fontSize: "18px" }} />
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{path}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
