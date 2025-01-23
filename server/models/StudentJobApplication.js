const mongoose = require("mongoose");

const studentJobApplicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Submitted", "Reviewed", "Shortlisted", "Rejected"],
      default: "Submitted",
    },
    interviewSchedule: {
      date: { type: Date },
      time: { type: String },
      location: { type: String },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const StudentJobApplication = mongoose.model(
  "StudentJobApplication",
  studentJobApplicationSchema
);

module.exports = StudentJobApplication;
