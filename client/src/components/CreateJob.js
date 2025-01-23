import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicall/api";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "Full-time",
    vacancyCount: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };
      await api.post("/company/jobs", payload);
      alert("Job created successfully!");
      navigate("/joblist"); // Redirect to Job List
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Create Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
            <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
                type="text"
                name="companyName"
                className="form-control"
                value={formData.companyName}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input
                type="text"
                name="jobTitle"
                className="form-control"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
            />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6">
            <label className="form-label">Job Type</label>
            <select
                name="jobType"
                className="form-select"
                value={formData.jobType}
                onChange={handleInputChange}
            >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
            </select>
            </div>
            <div className="col-md-6">
            <label className="form-label">Vacancy Count</label>
            <input
                type="number"
                name="vacancyCount"
                className="form-control"
                value={formData.vacancyCount}
                onChange={handleInputChange}
                required
            />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="col-md-6">
            <label className="form-label">Salary</label>
            <input
                type="number"
                name="salary"
                className="form-control"
                value={formData.salary}
                onChange={handleInputChange}
            />
            </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Requirements (comma-separated)</label>
          <textarea
            name="requirements"
            className="form-control"
            value={formData.requirements}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Submit Job
        </button>
        <button type="button" onClick={() => navigate("/jobList")} className="btn btn-danger mx-2">
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
