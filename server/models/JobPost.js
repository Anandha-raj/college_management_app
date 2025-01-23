const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
	companyName: { type: String, required: true },
	jobTitle: { type: String, required: true },
	jobType: { type: String, enum: ['Full-time', 'Part-time', 'Internship'], required: true },
	vacancyCount: { type: Number, required: true },
	location: { type: String, required: true },
	salary: { type: Number },
	description: { type: String },
	requirements: [String],
	createdAt: { type: Date, default: Date.now },
	isActive: { type: Boolean, default: true },
	isDeleted: { type: Boolean, default: false },
});

const JobPost = mongoose.model('JobPost', JobPostSchema);
module.exports = JobPost;