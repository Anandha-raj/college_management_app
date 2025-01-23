import React, { useState } from "react";
import api from "../apicall/api";
import { useParams, useNavigate } from "react-router-dom";

const ScheduleMeet = () => {
    const { appID } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to schedule interview
      const response = await api.post(`/student/schedule-interview/${appID}`, formData);

      setMessage(response.data.message || "Interview scheduled successfully!");

      // Optionally handle response details
      if (response.data.application) {
        const { date, time } = formData;

        // Create Zoom meeting
        const zoomResponse = await api.post("/student/create-zoom-meeting", { date, time });
        setMessage(
          `Interview scheduled successfully! Zoom Meeting Link: ${zoomResponse.data.join_url}`
        );
        navigate("/applied-jobs");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Error scheduling interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Schedule Interview</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            placeholder="Enter location or 'Zoom'"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Interview"}
        </button>
      </form>

      {message && <div className={`mt-3 alert ${loading ? "alert-warning" : "alert-info"}`}>{message}</div>}
    </div>
  );
};

export default ScheduleMeet;
