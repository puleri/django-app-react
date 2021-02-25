import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { css } from 'glamor'

const style = {
  Header: {
    backgroundColor: 'rgb(117, 97, 75, .8)',
    ':hover': {
      textDecoration: 'none'
    }
  }
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="header" href="#change-password">Profile</Nav.Link>
    <Nav.Link className="header" href="#projects">Projects</Nav.Link>
    <Nav.Link className="header" href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="header" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="header" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className="header" href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar {...css(style.Header)} variant="dark" expand="md">
    <Navbar.Brand className="logo" id="brand" href="#">
      Zone
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav href="#change-password" className="header">
        { user && <span className="header navbar-text mr-2">{user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
