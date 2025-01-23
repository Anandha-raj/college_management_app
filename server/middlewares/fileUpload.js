const fs = require("fs");
const path = require("path");

const uploadFile = (req, res, next) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const resume = req.files.resume;

  // Validate file type
  const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(resume.mimetype)) {
    return res.status(400).json({ message: "Invalid file type. Only PDF, DOC, or DOCX are allowed." });
  }

  const uploadDir = path.join(__dirname, "../uploads/resumes");

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, `${Date.now()}-${resume.name}`);

  // Move the file to the uploads directory
  resume.mv(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload file", error: err });
    }

    req.filePath = filePath; // Attach file path to the request object
    next();
  });
};

module.exports = uploadFile;
