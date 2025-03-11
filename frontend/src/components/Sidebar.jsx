"use client"

import { useState } from "react"
import { Nav, Button } from "react-bootstrap"
import { LayoutDashboard, Wallet, LineChart, Clock, Settings, HelpCircle, X, LogOut } from "lucide-react"

export default function Sidebar({ show, onHide }) {
  const [active, setActive] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "transactions", icon: Wallet, label: "Transactions" },
    { id: "analytics", icon: LineChart, label: "Analytics" },
    { id: "history", icon: Clock, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help & Support" },
  ]

  return (
    <>
      <div className={`sidebar ${show ? "show" : ""}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center">
            <Wallet className="text-primary" size={24} />
            <span className="ms-2 fw-bold">FinanceAI</span>
          </div>
          <Button variant="link" className="d-lg-none p-0 text-dark" onClick={onHide}>
            <X size={24} />
          </Button>
        </div>

        <Nav className="flex-column p-3">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.id}
              className={`sidebar-link mb-2 ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <item.icon size={20} />
              <span className="ms-3">{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>

        <div className="sidebar-footer p-3 mt-auto">
          <Button variant="outline-danger" className="w-100 d-flex align-items-center justify-content-center">
            <LogOut size={20} />
            <span className="ms-2">Logout</span>
          </Button>
        </div>
      </div>

      {show && <div className="sidebar-backdrop d-lg-none" onClick={onHide}></div>}
    </>
  )
}
