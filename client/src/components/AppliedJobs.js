import React, { useState, useEffect, useContext } from "react";
import api from "../apicall/api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const AppliedJobs = () => {
  const { studentID } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authState } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleStatusChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const newStatus = value;
    const applicationId = e.target.options[e.target.selectedIndex].getAttribute("data-id");

    try {
      const response = await api.put(
        `/student/applications/${applicationId}/${newStatus}`, // Adjust the endpoint as needed
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error updating status:", error.response?.data?.message || error.message);
      // Optionally revert the local state if the API call fails
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if(studentID){
            const response = await api.get(`/student/applications/${studentID}`);
            setApplications(response.data);
        }else{
            const response = await api.get(`/student/getApplications`);
            setApplications(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [studentID]);

  return (
    <div className="container mt-5">
      <h2 className="text-center my-3">{ authState.role !== 'admin' ?"My":""} Applied Jobs</h2>

      {loading && <div className="alert alert-info">Loading applications...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          {applications.length > 0 ? (
            <div className="table-responsive">
                <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Company Name</th>
                    { authState.role === 'admin' ?<><th>Student Name</th><th>Student Email</th></>: "" }
                    <th>Status</th>
                    <th>Applied On</th>
                    { authState.role === 'admin' ?<th></th>: "" }
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application, index) => (
                        <tr key={application._id}>
                            <td>{index + 1}</td>
                            <td>{application.jobId?.jobTitle || "N/A"}</td>
                            <td>{application.jobId?.companyName || "N/A"}</td>
                            { authState.role === 'admin' ?<><td>{application.studentId?.name || "N/A"}</td><td>{application.studentId?.email || "N/A"}</td> </>: "" }
                            <td>{authState.role === 'admin' ? 
                                <select
                                    className="form-select"
                                    id="status"
                                    name={"status"+application._id}
                                    value={formData["status"+application._id]||application.status}
                                    onChange={handleStatusChange}
                                    required
                                >
                                    <option value="Submitted" data-id={application._id}>Submitted</option>
                                    <option value="Reviewed" data-id={application._id}>Reviewed</option>
                                    <option value="Shortlisted" data-id={application._id}>Shortlisted</option>
                                    <option value="Rejected" data-id={application._id}>Rejected</option>
                                </select> : application.status || "N/A"}</td>
                            <td>{application.createdAt ? new Date(application.createdAt).toISOString().split("T")[0] : "N/A"}</td>
                            { authState.role === 'admin' ?<td><FontAwesomeIcon style={{ cursor: "pointer" }} className="text-danger mx-2" icon={faEdit} onClick={() => navigate(`/schedule/${application._id}`)} /></td>: "" }
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
          ) : (
            <div className="alert alert-warning">No applications found.</div>
          )}
          <button type="button" className="btn btn-danger mx-2" onClick={() => navigate("/joblist")}>
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
