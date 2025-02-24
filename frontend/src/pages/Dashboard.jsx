import { Card, Row, Col, ProgressBar } from "react-bootstrap"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const Dashboard = () => {
  const data = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 9800 },
    { name: "Apr", income: 2780, expenses: 3908 },
    { name: "May", income: 1890, expenses: 4800 },
    { name: "Jun", income: 2390, expenses: 3800 },
  ]

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <h2 className="text-primary">$5,280</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Monthly Income</Card.Title>
              <h2 className="text-success">$3,500</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Monthly Expenses</Card.Title>
              <h2 className="text-danger">$2,800</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Income vs Expenses</Card.Title>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#7ed321" />
                    <Bar dataKey="expenses" fill="#d0021b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Budget Overview</Card.Title>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Food</span>
                  <span>70%</span>
                </div>
                <ProgressBar now={70} variant="info" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Rent</span>
                  <span>90%</span>
                </div>
                <ProgressBar now={90} variant="warning" />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Entertainment</span>
                  <span>40%</span>
                </div>
                <ProgressBar now={40} variant="success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard

