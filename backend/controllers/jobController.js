const db = require('../models');
const Job = db.Job;
const Application = db.Application;

// Get all active jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      where: { status: 'active' },
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Get job details by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Create a new job listing
exports.createJob = async (req, res, next) => {
  try {
    const { title, type, category, location, salary, icon, description, requirements, benefits } = req.body;
    
    if (!title || !category || !location) {
      return res.status(400).json({ message: 'Title, category, and location are required' });
    }

    const job = await Job.create({
      title,
      type: type || 'Full-time',
      category,
      location,
      salary: salary || 'Thỏa thuận',
      icon: icon || 'work',
      description,
      requirements,
      benefits
    });

    return res.status(201).json({
      message: 'Job listing created successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

// Submit an application for a job
exports.applyJob = async (req, res, next) => {
  try {
    const { fullName, email, phone, cvUrl, coverLetter, jobId } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Full name, email, and phone are required' });
    }

    if (jobId) {
      const jobExists = await Job.findByPk(jobId);
      if (!jobExists) {
        return res.status(404).json({ message: 'Job listing not found' });
      }
    }

    const application = await Application.create({
      fullName,
      email,
      phone,
      cvUrl,
      coverLetter,
      jobId
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    next(error);
  }
};
