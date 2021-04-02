import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import edit from "../../icons/edit 1.png";
import manage from "../../icons/grid 1.png";
import add from "../../icons/plus 1.png";
import AddBookForm from "./AddBookForm/AddBookForm";
import "./Admin.css";
import EditBooks from "./EditBooks/EditBooks";
import ManageBooks from "./ManageBooks/ManageBooks";

const Admin = () => {
  return (
    <Router>
      <div className="addBook-container">
        <div className="aside">
          <aside>
            <nav className="aside-navbar">
              <ul>
                <li>
                  <Link to="/admin/manageBooks">
                    <img style={{ width: "40px" }} src={manage} alt="" /> Manage
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/admin/addBookForm">
                    <img style={{ width: "40px" }} src={add} alt="" /> Add New
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/admin/editBooks">
                    <img style={{ width: "40px" }} src={edit} alt="" /> Edit
                    Books
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        <div className="admin-components">
          <Switch>
            <Route path="/admin/addBookForm">
              <AddBookForm></AddBookForm>
            </Route>
            <Route path="/admin/manageBooks">
              <ManageBooks></ManageBooks>
            </Route>
            <Route path="/admin/editBooks">
              <EditBooks></EditBooks>
            </Route>
            <Route path="/admin">
              <ManageBooks></ManageBooks>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
