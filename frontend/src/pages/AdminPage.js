import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Items from "../views/Items";
import Bills from "../views/Bills";
import Users from "../views/Users";
import Roles from "../views/Roles";
import AuditTrails from "../views/AuditTrails";

import "../styles/adminpage.css";

const AdminPage = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("data"));
  const [selectedMenu, setSelectedMenu] = useState("items");

  useEffect(() => {
    if (!token) {
      console.log(token);
      props.setIsSignedIn(false);
    }

    if (userData.roleName !== "Admin") {
      console.log("Not admin, redirect to /checkout");
      navigate("/checkout");
    }
  }, []);

  const handleMenuClick = (menuOption) => {
    setSelectedMenu(menuOption);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "items":
        return <Items />;
      case "bills":
        return <Bills />;
      case "users":
        return <Users />;
      case "roles":
        return <Roles />;
      case "auditTrails":
        return <AuditTrails />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar heading="Admin Page" setIsSignedIn={props.setIsSignedIn} />
      <div className="admin-page">
      <div className="sidebar">
        <ul>
          <li
            onClick={() => handleMenuClick("items")}
            className={selectedMenu === "items" ? "active" : ""}
          >
            Items
          </li>
          <li
            onClick={() => handleMenuClick("bills")}
            className={selectedMenu === "bills" ? "active" : ""}
          >
            Bills
          </li>
          <li
            onClick={() => handleMenuClick("users")}
            className={selectedMenu === "users" ? "active" : ""}
          >
            Users
          </li>
          <li
            onClick={() => handleMenuClick("roles")}
            className={selectedMenu === "roles" ? "active" : ""}
          >
            Roles
          </li>
          <li
            onClick={() => handleMenuClick("auditTrails")}
            className={selectedMenu === "auditTrails" ? "active" : ""}
          >
            Audit Trails
          </li>
        </ul>
      </div>

        <div className="content">{renderContent()}</div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
