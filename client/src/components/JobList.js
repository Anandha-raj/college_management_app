import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicall/api";
import { AuthContext } from "../context/AuthContext"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext); 

  const fetchJobs = async () => {
    try {
      const response = await api.get("/company/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const deleteUser = async (id) => {
    try {
      await api.delete(`/company/jobs/${id}`);
      // Refetch the jobs list after deletion
      const response = await api.get("/company/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-center">Job Listings</h1>
      { authState.role !== 'student' ?
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/create-job")}
        > Create Job </button> : ""
      }
      { authState.role === 'admin' ?
        <button
          className="btn btn-primary mb-3 mx-2"
          onClick={() => navigate(`/applied-jobs`)}
        > Job Applications </button> : ""
      }
      { authState.role === 'student' ?
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate(`/applied-jobs/${authState.id}`)}
        > Applied Jobs </button> : ""
      }
      {jobs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
              { authState.role !== 'student' ?
                <th></th> : "" }
                <th>#</th>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Vacancy</th>
                <th>Location</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  { authState.role !== 'student' ? <td className="text-center">
                    <FontAwesomeIcon style={{ cursor: "pointer" }} className="text-primary mx-2" icon={faEdit} />
                    <FontAwesomeIcon style={{ cursor: "pointer" }} className="text-primary mx-2" icon={faCheck} />
                    <FontAwesomeIcon style={{ cursor: "pointer" }} className="text-danger mx-2" icon={faTrash} onClick={() => deleteUser(job._id)} />
                  </td> : "" }
                  <td>{index + 1}</td>
                  <td>{job.companyName}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobType}</td>
                  <td>{job.vacancyCount}</td>
                  <td>{job.location}</td>
                  <td>{job.isActive ? "Yes" : "No"}</td>
                  <td>{job.isActive ? <button type="button" onClick={() => navigate("/apply-job/"+job._id+"/"+authState.id)} className="btn btn-success">Apply</button> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
