import { Container, Nav, NavDropdown, NavbarBrand } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavLink } from "react-router-dom";

export const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="main-color">
      <Container fluid>
        <Navbar.Brand>Blaze Blacke 2 Redux Wiki</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <NavDropdown title="Pokedex" id="basic-nav-dropdown" >
              <NavDropdown.Item as={NavLink} to="/pokemon">Pokemon</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/abilities">Abilities</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/moves">Moves</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
