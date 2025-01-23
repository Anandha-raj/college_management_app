const StudentJobApplication = require("../models/StudentJobApplication");
const fs = require("fs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


exports.createApplication = async (req, res) => {
  try {
    const { studentId, jobId, coverLetter } = req.body;

    if (!req.filePath) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const application = new StudentJobApplication({
      studentId,
      jobId,
      resume: req.filePath,
      coverLetter,
      status: "Submitted", // Default status
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getApplicationsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const applications = await StudentJobApplication.find({ studentId, isDeleted: false })
        .populate("jobId", "jobTitle companyName")
        .populate("studentId", "name email");

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await StudentJobApplication.find({ isDeleted: false })
        .populate("jobId", "jobTitle companyName")
        .populate("studentId", "name email");

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const application = await StudentJobApplication.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      res.status(200).json({ message: "Application status updated", application });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.scheduleInterview = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, time, location } = req.body;
  
      const application = await StudentJobApplication.findByIdAndUpdate(
        id,
        { interviewSchedule: { date, time, location } },
        { new: true }
      );
  
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      res.status(200).json({
        message: "Interview scheduled successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.createZoomMeeting = async (req, res) => {
  try {
    const { date, time } = req.body;

    // Zoom API credentials
    const API_KEY = process.env.ZOOM_API_KEY;
    const API_SECRET = process.env.ZOOM_API_SECRET;

    // Generate JWT token
    const token = jwt.sign({ iss: API_KEY, exp: Date.now() + 60 * 60 * 1000 }, API_SECRET);

    // Zoom meeting payload
    const meetingDetails = {
      topic: "Scheduled Interview",
      type: 2, // Scheduled meeting
      start_time: new Date(`${date}T${time}`).toISOString(),
      duration: 30, // 30 minutes
      timezone: "UTC",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
      },
    };

    // Make request to Zoom API
    const response = await axios.post("https://api.zoom.us/v2/users/me/meetings", meetingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      message: "Zoom meeting created successfully",
      join_url: response.data.join_url,
      meeting_id: response.data.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
