const express = require("express");
const uploadFile = require("../middlewares/fileUpload");
const { createApplication, getApplicationsByStudent, getApplications, scheduleInterview, createZoomMeeting, updateApplicationStatus } = require("../controllers/JobApplication");

const router = express.Router();

// Route for creating an application (with file upload middleware)
router.post("/apply", uploadFile, createApplication);
router.get("/getApplications", getApplications);

router.post("/schedule-interview/:id", scheduleInterview);
router.post("/create-zoom-meeting", createZoomMeeting);
router.put("/applications/:id/:newStatus", updateApplicationStatus);

// Route for fetching all applications (ensure controller function exists)
if (getApplicationsByStudent) {
  router.get("/applications/:studentId", getApplicationsByStudent);
} else {
  console.warn("getApplicationsByStudent is not implemented.");
}

module.exports = router;
