import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Developer() {
  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="bg-primary text-white position-relative overflow-hidden py-5">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-grid-white opacity-10" />
        <Container className="position-relative py-5">
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-4">Meet the Developer</h1>
                <p className="lead mb-4 opacity-90">
                  Hi, I'm Alex Chen! I'm the founder and developer behind FinanceAI. With over 5 years of experience in
                  fintech, I'm passionate about making financial management accessible to everyone.
                </p>
                <div className="d-flex gap-3">
                  {[
                    { icon: Github, label: "GitHub" },
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Mail, label: "Email" },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="light"
                      className="rounded-circle p-2"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <social.icon size={20} />
                    </Button>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div
                  className="position-absolute top-50 start-50 translate-middle rounded-circle bg-white bg-opacity-10"
                  style={{ width: "300px", height: "300px", filter: "blur(60px)" }}
                />
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Developer Portrait"
                  className="img-fluid rounded-circle border border-5 border-white shadow-lg position-relative"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Journey Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold mb-4">The Journey</h2>
              <p className="lead text-muted">
                FinanceAI started from a personal need to better manage finances. Here's how it evolved from an idea to
                a platform helping thousands.
              </p>
            </div>

            <div className="position-relative">
              <div className="position-absolute top-0 start-50 translate-middle-x w-1 h-100 bg-primary bg-opacity-10" />
              {[
                {
                  year: "2023",
                  title: "FinanceAI Launch",
                  description: "Launched the first version of FinanceAI with core features.",
                },
                {
                  year: "2023",
                  title: "AI Integration",
                  description: "Implemented advanced AI algorithms for smart financial insights.",
                },
                {
                  year: "2024",
                  title: "Major Update",
                  description: "Released version 2.0 with improved UI and new features.",
                },
                {
                  year: "2024",
                  title: "Growing Community",
                  description: "Reached 1,000+ active users milestone.",
                },
              ].map((milestone, index) => (
                <div key={index} className="position-relative mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 position-relative">
                      <div className="bg-white rounded-circle" style={{ width: "12px", height: "12px" }} />
                    </div>
                    <div className="ms-3">
                      <div className="small text-muted">{milestone.year}</div>
                      <h3 className="h5 fw-bold mb-0">{milestone.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted ms-5 ps-2">{milestone.description}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Latest Updates Section */}
      <div className="bg-white py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5">Latest Updates</h2>
          <Row className="g-4">
            {[
              {
                date: "March 2024",
                title: "AI-Powered Insights",
                description:
                  "Launched smart financial recommendations system to help users make better financial decisions.",
              },
              {
                date: "February 2024",
                title: "New Dashboard",
                description: "Completely redesigned the user interface for better visualization and easier navigation.",
              },
              {
                date: "January 2024",
                title: "Smart Budgeting",
                description: "Introduced AI-powered budget suggestions based on spending patterns and goals.",
              },
            ].map((update, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-muted small mb-2">{update.date}</div>
                    <h3 className="h5 fw-bold mb-3">{update.title}</h3>
                    <p className="text-muted mb-0">{update.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  )
}

