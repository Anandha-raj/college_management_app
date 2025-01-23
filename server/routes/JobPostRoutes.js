const express = require("express");
const {createJob,readJobs,getOneJob,updateJob,deleteJob,updateJobStatus,} = require("../controllers/JobPostController");
const router = express.Router();

router.post("/jobs",createJob);
router.get("/jobs",readJobs);
router.get("/job/:id",getOneJob);
router.put("/jobs/:id",updateJob);
router.delete("/jobs/:id",deleteJob);
router.patch("/jobs/:id/toggle-active",updateJobStatus);

module.exports = router;