import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { DollarSign, Sun, Moon } from "lucide-react";


export default function Navigation() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Navbar expand="lg" className={`sticky-top shadow-sm ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-primary">
          <DollarSign className="me-2" size={28} />
          FinanceAI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/about" className="fw-medium text-secondary">About</Nav.Link>
            <Nav.Link as={Link} to="/developer" className="fw-medium text-secondary">Developer</Nav.Link>
            <Nav.Link as={Link} to="/login" className="fw-medium text-secondary">Login</Nav.Link>
            <Button as={Link} to="/signup" variant="primary" className="fw-bold px-4 rounded-pill">Sign Up</Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={toggleTheme} className="d-flex align-items-center rounded-pill px-3">
              {darkMode ? <Sun size={20} className="me-2" /> : <Moon size={20} className="me-2" />} {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
