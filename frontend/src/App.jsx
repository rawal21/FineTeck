import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Aboutpage from "./pages/About"
import "./styles/custom.css"

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<Aboutpage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

