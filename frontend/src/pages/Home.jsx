import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { ArrowRight, Code2, DollarSign, Github, Laptop, Sparkles, Target, User2, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="flex-grow-1">
      {/* Hero Section */}
      <section className="position-relative py-5 overflow-hidden bg-light">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-grid-light" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary-light" />
        <Container className="position-relative py-5">
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="mb-5">
                <div className="d-inline-flex align-items-center rounded-3 bg-primary bg-opacity-10 px-3 py-1 text-primary mb-4">
                  <Sparkles className="me-2" size={16} />
                  Personal Finance, Reimagined
                </div>
                <h1 className="display-4 fw-bold mb-4">
                  Your Money, <span className="text-gradient-primary">Your Control</span>
                </h1>
                <p className="lead text-muted mb-5">
                  A passion project built by a developer who understands your financial journey. Smart budgeting meets
                  beautiful design.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                  <Button as={Link} to="/signup" size="lg" className="d-inline-flex align-items-center">
                    Start Your Journey
                    <ArrowRight className="ms-2" size={16} />
                  </Button>
                  <Button as={Link} to="#workflow" variant="outline-primary" size="lg">
                    See How It Works
                  </Button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-circle bg-primary bg-opacity-10"
                        style={{ width: "32px", height: "32px", marginLeft: i > 1 ? "-8px" : "0" }}
                      />
                    ))}
                  </div>
                  <p className="text-muted mb-0">Join 1,000+ users already managing their finances smarter</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div
                  className="position-absolute top-50 end-0 translate-middle-y rounded-circle bg-primary bg-opacity-10 blur"
                  style={{ width: "288px", height: "288px" }}
                />
                <div className="position-relative">
                  <img
                    alt="Dashboard Preview"
                    className="img-fluid rounded-4 border shadow-lg"
                    src="/placeholder.svg?height=600&width=800"
                  />
                  <Card className="position-absolute top-0 end-0 translate-middle shadow-lg" style={{ width: "200px" }}>
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success bg-opacity-10 p-2">
                          <ArrowRight size={16} className="text-success" />
                        </div>
                        <p className="small fw-medium mb-0">Latest Transaction</p>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    className="position-absolute bottom-0 start-0 translate-middle shadow-lg"
                    style={{ width: "200px" }}
                  >
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-2">
                          <DollarSign size={16} className="text-primary" />
                        </div>
                        <p className="small fw-medium mb-0">Smart Savings Active</p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">How It Works</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
              A simple, intuitive workflow designed to help you manage your finances effortlessly
            </p>
          </div>
          <div className="position-relative workflow-timeline">
            {[
              {
                step: 1,
                title: "Sign Up & Connect",
                description: "Create your account and set your financial goals",
                icon: User2,
              },
              {
                step: 2,
                title: "Track Your Spending",
                description: "Automatically categorize and monitor your expenses",
                icon: Wallet,
              },
              {
                step: 3,
                title: "Set Smart Goals",
                description: "Create personalized savings goals with AI assistance",
                icon: Target,
              },
              {
                step: 4,
                title: "Track Progress",
                description: "Monitor your progress with beautiful visualizations",
                icon: DollarSign,
              },
            ].map((item, index) => (
              <Row key={item.step} className={`align-items-center mb-5 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <Col md={5} className={index % 2 === 0 ? "text-end" : "text-start"}>
                  <div>
                    <div className="text-primary small mb-2">Step {item.step}</div>
                    <h3 className="h4 fw-bold">{item.title}</h3>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </Col>
                <Col md={2} className="text-center">
                  <div className="workflow-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center">
                    <item.icon size={24} />
                  </div>
                </Col>
                <Col md={5} />
              </Row>
            ))}
          </div>
        </Container>
      </section>

      {/* Developer Section */}
      <section className="py-5">
        <Container>
          <Row className="gy-5">
            <Col lg={6}>
              <div className="mb-4">
                <div className="d-inline-flex align-items-center rounded-3 bg-primary bg-opacity-10 px-3 py-1 text-primary mb-4">
                  <Code2 className="me-2" size={16} />
                  Meet the Developer
                </div>
                <h2 className="display-6 fw-bold mb-4">Built with Passion</h2>
                <p className="lead text-muted">
                  Hi, I'm Alex! As both a developer and someone who struggled with personal finance, I built FinanceAI
                  to solve real problems. Every feature is crafted with care, focusing on what truly matters for your
                  financial journey.
                </p>
              </div>
              <div className="mb-5">
                {[
                  {
                    icon: Laptop,
                    text: "Full-stack developer with 5+ years experience",
                  },
                  {
                    icon: DollarSign,
                    text: "Passionate about personal finance",
                  },
                  {
                    icon: User2,
                    text: "Built based on real user feedback",
                  },
                ].map((item, index) => (
                  <div key={index} className="d-flex align-items-center gap-3 mb-3">
                    <item.icon size={20} className="text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex gap-3">
                <Button variant="outline-primary" className="d-inline-flex align-items-center">
                  <Github size={16} className="me-2" />
                  View on GitHub
                </Button>
                <Button variant="outline-primary">Contact Me</Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h3 className="fw-bold h5 mb-4">Latest Updates</h3>
                  {[
                    {
                      date: "March 2024",
                      title: "AI-Powered Insights",
                      description: "Launched smart financial recommendations",
                    },
                    {
                      date: "February 2024",
                      title: "New Dashboard",
                      description: "Completely redesigned user interface",
                    },
                    {
                      date: "January 2024",
                      title: "Smart Budgeting",
                      description: "Added automated budget suggestions",
                    },
                  ].map((update, index) => (
                    <div key={index} className="d-flex gap-4 mb-4">
                      <div className="text-muted small" style={{ width: "100px" }}>
                        {update.date}
                      </div>
                      <div>
                        <div className="fw-medium">{update.title}</div>
                        <div className="text-muted small">{update.description}</div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">Everything You Need</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Carefully crafted features to help you achieve your financial goals
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                title: "Smart Expense Tracking",
                description: "Automatically categorize your expenses with AI",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Goal-Based Savings",
                description: "Set and track your savings goals effortlessly",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Beautiful Analytics",
                description: "Visualize your finances with intuitive charts",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((feature, index) => (
              <Col key={index} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm feature-card">
                  <div className="ratio ratio-4x3">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="card-img-top object-fit-cover"
                    />
                  </div>
                  <Card.Body className="p-4">
                    <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-grid-light opacity-10" />
        <Container className="position-relative">
          <div className="text-center">
            <h2 className="display-5 fw-bold mb-4">Start Your Financial Journey Today</h2>
            <p className="lead mb-5 opacity-90 mx-auto" style={{ maxWidth: "600px" }}>
              Join me in building a better financial future. No complex features, just what you need to succeed.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button as={Link} to="/signup" variant="light" size="lg">
                Get Started Free
              </Button>
              <Button as={Link} to="/about" variant="outline-light" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

