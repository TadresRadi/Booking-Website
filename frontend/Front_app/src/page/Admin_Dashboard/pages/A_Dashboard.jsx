import React from "react";
import StatsCards from "../components/StatsCards.jsx";
import { Card, Row, Col, Table, ProgressBar } from "react-bootstrap";
import { FaChartLine, FaMapMarkerAlt } from "react-icons/fa";

// Dummy data for stats cards
const dummyStats = {
  customers: { count: 3782, diff: 12 },
  orders: { count: 5359, diff: -6 },
  target: { percent: 75.55, note: "You earned $13,287 today, it's higher than last month." }
};

// Dummy data for monthly sales
const monthlySales = [
  { month: "Jan", sales: 3400 },
  { month: "Feb", sales: 4200 },
  { month: "Mar", sales: 3500 },
  { month: "Apr", sales: 5100 },
  { month: "May", sales: 4800 }
];

// Dummy data for customers demographic
const customerCountries = [
  { country: "Egypt", percent: 50 },
  { country: "KSA", percent: 25 },
  { country: "UAE", percent: 15 },
  { country: "Kuwait", percent: 10 }
];

// Dummy data for recent orders
const recentOrders = [
  { id: 1, name: "Order #123", customer: "Ahmed Ali", amount: "$200", date: "2025-05-28" },
  { id: 2, name: "Order #124", customer: "Sara Mohamed", amount: "$350", date: "2025-05-27" },
  { id: 3, name: "Order #125", customer: "Ali Youssef", amount: "$150", date: "2025-05-26" }
];

const A_Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <StatsCards stats={dummyStats} />

      <Row className="mt-4">
        {/* Monthly Sales Chart */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaChartLine className="me-2 text-primary" />
                <h5 className="mb-0">Monthly Sales</h5>
              </div>
              <div style={{height: 200, display: "flex", alignItems: "flex-end", gap: 16}}>
                {monthlySales.map((item) => (
                  <div key={item.month} style={{flex: 1, textAlign: "center"}}>
                    <div style={{
                      background: "#0d6efd",
                      height: `${item.sales / 60}px`,
                      borderRadius: 6,
                      marginBottom: 6
                    }} />
                    <small>{item.month}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Monthly Target */}
        <Col md={4}>
          <Card className="mb-4 h-100">
            <Card.Body>
              <div className="text-center mb-3">
                <h6>Monthly Target</h6>
                <div
                  style={{
                    margin: "auto",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "#f6f8fc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#0d6efd",
                    border: "4px solid #0d6efd"
                  }}
                >
                  {dummyStats.target.percent}%
                </div>
                <small className="text-success">{dummyStats.target.note}</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Customers Demographic */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <h6 className="mb-0">Customers Demographic</h6>
              </div>
              {customerCountries.map((item) => (
                <div key={item.country} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>{item.country}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <ProgressBar now={item.percent} max={100} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        {/* Recent Orders Table */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h6 className="mb-3">Recent Orders</h6>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default A_Dashboard;