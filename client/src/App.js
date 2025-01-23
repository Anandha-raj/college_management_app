import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./components/JobList";
import CreateJob from "./components/CreateJob";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ApplyJobForm from "./components/ApplyJobForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AppliedJobs from "./components/AppliedJobs";
import { AuthProvider } from './context/AuthContext';
import ScheduleMeet from "./components/ScheduleMeet";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Router>
          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route
                path="/register-form"
                element={
                  <ProtectedRoute>
                    <RegisterForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applied-jobs/:studentID"
                element={
                  <ProtectedRoute>
                    <AppliedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applied-jobs"
                element={
                  <ProtectedRoute>
                    <AppliedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apply-job/:jobID/:studentID"
                element={
                  <ProtectedRoute>
                    <ApplyJobForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-job"
                element={
                  <ProtectedRoute>
                    <CreateJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/joblist"
                element={
                  <ProtectedRoute>
                    <JobList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule/:appID"
                element={
                  <ProtectedRoute>
                    <ScheduleMeet />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
