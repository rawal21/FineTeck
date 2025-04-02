import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Aboutpage from "./pages/About"

import Developer from "./pages/Developer"
import TransactionsPage from "./pages/Transaction/TransactionPage"
import BudgetPage from "./pages/budget/BudgetPage"
import FinancialInsights from "./pages/Analytics/Analytics"

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetPage />} />
          <Route path="/budgets" element={<BudgetPage />} /> 
          <Route path= "/analytics" element={<FinancialInsights/>} />
        
 
        </Routes>
      </div>
    </Router>
  )
}

export default App

