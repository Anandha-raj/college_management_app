import React, { useState, useEffect } from "react";
import api from "../apicall/api";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJobForm = () => {
  const { jobID, studentID } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobId: jobID,
    studentId: studentID,
    coverLetter: "",
    resume: null,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/company/job/${jobID}`);
        setJobDetails(response.data);
      } catch (error) {
        setMessage("Error fetching job details. Please try again later.");
      }
    };

    fetchJobDetails();
  }, [jobID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (file && !allowedExtensions.includes(file.type)) {
      setMessage("Invalid file type. Only PDF, DOC, or DOCX are allowed.");
      setFormData({ ...formData, resume: null });
      return;
    }
    setFormData({ ...formData, resume: file });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      setMessage("Please upload a valid resume.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("studentId", formData.studentId);
    data.append("jobId", formData.jobId);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", formData.resume);

    try {
      const response = await api.post("/student/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Application submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting application.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/joblist");
      }, 1000);
    }
  };

  return (
    <div className="container mt-5">
      {jobDetails ? (
        <div className="alert alert-info">
          <h4>{jobDetails.title}</h4>
          <p><strong>Company:</strong> {jobDetails.companyName}</p>
          <p><strong>Location:</strong> {jobDetails.location}</p>
          <p><strong>Description:</strong> {jobDetails.description}</p>
          <p><strong>Salary:</strong> {jobDetails.salary}</p>
        </div>
      ) : (
        <div className="alert alert-warning">Loading job details...</div>
      )}

      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3" style={{ display: "none" }}>
          <label htmlFor="studentId" className="form-label">
            Student ID
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3" style={{ display: "none" }}>
          <label htmlFor="jobId" className="form-label">
            Job ID
          </label>
          <input
            type="text"
            className="form-control"
            id="jobId"
            name="jobId"
            value={formData.jobId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="coverLetter" className="form-label">
            Cover Letter
          </label>
          <textarea
            className="form-control"
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="resume" className="form-label">
            Upload Resume
          </label>
          <input
            type="file"
            className="form-control"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        <button type="button" className="btn btn-danger mx-2" onClick={() => navigate("/joblist")}>
          Back
        </button>
      </form>

      {message && <div className={`mt-3 alert ${loading ? "alert-warning" : "alert-info"}`}>{message}</div>}
    </div>
  );
};

export default ApplyJobForm;
