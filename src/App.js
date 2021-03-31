import { createContext, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import CheckOut from "./Components/CheckOut/CheckOut";
import Deals from "./Components/Deals/Deals";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn/LogIn";
import Orders from "./Components/Orders/Orders";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import logo from "./icons/Logo.png";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
          <nav className="navbar">
            <div className="brand-img">
              <Link to="/home">
                <img src={logo} alt="" />
              </Link>
              <Link to="#" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </Link>
            </div>
            <div className="navbar-links">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                <li>
                  <Link to="/deals">Deals</Link>
                </li>
                <li>
                  <Link to="/login">LogIn</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/orders">
              <Orders></Orders>
            </Route>
            <PrivateRoute path="/admin">
              <Admin></Admin>
            </PrivateRoute>
            <PrivateRoute path="/checkout">
              <CheckOut></CheckOut>
            </PrivateRoute>
            <Route path="/deals">
              <Deals></Deals>
            </Route>
            <Route path="/login">
              <LogIn></LogIn>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
