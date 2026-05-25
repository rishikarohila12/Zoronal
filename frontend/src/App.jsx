import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import CompanyDetail from './pages/CompanyDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <Router>

      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
        />

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Company Detail */}
          <Route
            path="/company/:id"
            element={<CompanyDetail />}
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

      </div>

    </Router>

  );

}

export default App;