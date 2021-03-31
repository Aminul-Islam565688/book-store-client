import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
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
            <nav>
              <ul>
                <li>
                  <Link to="/admin/manageBooks">Manage Books</Link>
                </li>
                <li>
                  <Link to="/admin/addBookForm">Add New Books</Link>
                </li>
                <li>
                  <Link to="/admin/editBooks">Edit Books</Link>
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
