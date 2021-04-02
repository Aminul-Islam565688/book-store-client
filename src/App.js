import MenuIcon from "@material-ui/icons/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [isActive, setIsActive] = useState(false);

  //Clearing Session Storage With Reaload
  console.log();

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
          <nav className="navbar-main">
            <div className="brand-logo">
              <Link to="/home">
                <img src={logo} alt="" />
              </Link>
              <Link
                onClick={() => setIsActive(!isActive)}
                className="toggle-button"
              >
                <MenuIcon style={{ fontSize: 70, color: "#6946f4" }}></MenuIcon>
              </Link>
            </div>
            <div className={`navbar-links  ${isActive && "active"}`}>
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
                <li style={loggedInUser.email && { background: "none" }}>
                  {loggedInUser.email ? (
                    <img
                      style={{
                        width: "53px",
                        borderRadius: "50px",
                        background: "#BEE3EB",
                      }}
                      src={loggedInUser.photo}
                      alt=""
                    />
                  ) : (
                    <Link style={{ color: "white" }} to="/login">
                      LogIn
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
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
            <Route path="/home">
              <Home></Home>
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
