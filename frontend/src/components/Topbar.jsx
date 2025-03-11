import { Navbar, Container, Button, Form, InputGroup } from "react-bootstrap";
import { Search, Bell, Menu } from "lucide-react";

export default function TopNav({ onMenuClick }) {
  return (
    <Navbar className="border-bottom bg-white">
      <Container fluid className="px-4">
        <Button variant="link" className="d-lg-none p-0 text-dark me-3" onClick={onMenuClick}>
          <Menu size={24} />
        </Button>

        <div className="d-none d-md-block">
          <h5 className="mb-0">Welcome back, Sarah!</h5>
          <p className="text-muted small mb-0">Here's what's happening with your finances</p>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <Form className="d-none d-md-block">
            <InputGroup>
              <Form.Control placeholder="Search..." aria-label="Search" className="border-end-0" />
              <Button variant="outline-secondary" className="border-start-0 bg-white">
                <Search size={18} />
              </Button>
            </InputGroup>
          </Form>

          <Button variant="link" className="p-0 text-dark position-relative">
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </Button>

          <div className="d-flex align-items-center">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="User"
              className="rounded-circle"
              width={32}
              height={32}
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
