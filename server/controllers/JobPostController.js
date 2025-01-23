const express = require('express');
const JobPost = require('../models/JobPost'); 

exports.createJob = async (req, res) => {
	try {
		const job = new JobPost(req.body);
		const savedJob = await job.save();
		res.status(201).json(savedJob);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

exports.readJobs = async (req, res) => {
	try {
		const jobs = await JobPost.find({ isDeleted: false });
		res.json(jobs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getOneJob = async (req, res) => {
  try {
    const job = await JobPost.findOne({ _id: req.params.id, isDeleted: false });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await JobPost.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobPost.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true, isActive: false },
      { new: true }
    );
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await JobPost.findOne({ _id: req.params.id, isDeleted: false });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.isActive = !job.isActive;
    await job.save();
    res.json({ message: `Job ${job.isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
