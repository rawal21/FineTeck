import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { DollarSign } from "lucide-react"

export default function Navigation() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <DollarSign className="me-2" size={24} />
          <span className="fw-bold">FinanceAI</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Button as={Link} to="/signup" variant="primary" className="ms-lg-2">
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

