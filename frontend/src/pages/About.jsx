import { Container, Row, Col } from "react-bootstrap"

export default function About() {
  return (
    <div className="min-vh-100 bg-light py-5">
      <Container>
        <section className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4">About FinanceAI</h1>
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <p className="lead text-muted mb-4">
              FinanceAI is a cutting-edge financial management platform that combines the power of artificial
              intelligence with intuitive design to help you make better financial decisions.
            </p>
            <p className="lead text-muted">
              Our mission is to make financial management accessible to everyone, regardless of their financial
              knowledge or background.
            </p>
          </div>
        </section>

        <section className="py-5">
          <h2 className="h1 fw-bold text-center mb-5">Key Features</h2>
          <Row className="gy-4">
            {["User Authentication & Profile Management", "Dashboard (Main Overview Page)", "Income & Expense Tracking", "Budget Planning & Limits", "AI-Powered Financial Insights & Recommendations", "Data Visualization & Reports", "Smart Savings Plan", "Bill Payment & Reminders", "Expense Splitting (For Groups or Families)", "Educational Resources & Financial Literacy"].map((feature, index) => (
              <Col key={index} md={6} lg={4}>
                <div className="p-4 h-100 bg-white rounded-4 shadow-sm text-center">
                  <h3 className="h5 fw-bold mb-2">{feature}</h3>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <section className="py-5 text-center">
          <h2 className="display-6 fw-bold mb-4">Meet the Developer</h2>
          <div className="d-flex flex-column align-items-center">
            <img
              src="/developer-profile.jpg"
              alt="Developer"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h3 className="h5 fw-bold">Dikshit</h3>
            <p className="text-muted">Full-Stack Software Engineer | MERN Stack Developer</p>
            <p className="text-muted" style={{ maxWidth: "600px" }}>
              Passionate about building scalable and user-friendly web applications. Experienced in working with modern web technologies and always eager to learn new skills.
            </p>
          </div>
        </section>
      </Container>
    </div>
  )
}
