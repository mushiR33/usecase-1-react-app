// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import './App.scss';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import { SecureRoute } from "@asgardeo/auth-react";
import { Link } from 'react-router-dom';

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

// Component to render the login/signup/logout menu
const RightLoginSignupMenu = () => {

  const { state, signIn, signOut } = useAuthContext();
  // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu
  const isLoggedIn = state.isAuthenticated;

  // Host the menu content and return it at the end of the function
  let menu;

  // Conditionally render the following two links based on whether the user is logged in or not
  if (isLoggedIn) {
    menu = <>
      <Nav>
        <button onClick={() => signOut()}>Logout</button>
        <Nav.Link href="#deets"><FontAwesomeIcon icon={faUser} /> {state.username} </Nav.Link>
      </Nav>
    </>
  } else {
    menu = <>
      <Nav>
        <button onClick={() => signIn()}>Login</button>
        <Nav.Link href="#deets">Sign Up</Nav.Link></Nav>
    </>
  }
  return menu;
}

// Main app component
const App = () => {
  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  
  const { state, getBasicUserInfo } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState();
  getBasicUserInfo().then((response) => {
    setIsAdmin(response.groups.includes("admin"));
    console.log("========================Group: " + response.groups);
}).catch((error) => {
    //console.error(error);
});

  return (
    <>
      <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">PetStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="menu-bar">
              <Link to="/">Catalog</Link>
              {state.isAuthenticated === true && (
                <>
              <Link to="/mycart">My Cart</Link>
              {isAdmin === true &&
                <>
              <Link to="/admin">Admin</Link>
                </>
              }
                </>
              )}
              </div>
          </Navbar.Collapse>
          <RightLoginSignupMenu />
        </Container>
      </Navbar>
        <Switch>
          <Route exact path="/" component={Catalog} />
          <SecureRoute path="/mycart" component={MyCart} />
          <SecureRoute path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;