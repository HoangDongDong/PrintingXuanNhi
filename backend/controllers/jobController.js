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

const nodemailer = require('nodemailer');

// Handle customer interactive quote requests and notify via email
exports.sendQuoteRequest = async (req, res, next) => {
  try {
    const { name, phone, productTitle, quantity, size, pages, isRoundedCorners, unitPrice, totalPrice, unit } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and Phone are required' });
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER || 'inanxuannhi@gmail.com';

    const mailOptions = {
      from: `"Xuân Nhĩ Website" <${process.env.EMAIL_USER || 'inanxuannhi@gmail.com'}>`,
      to: emailTo,
      subject: `[Yêu Cầu Đặt In] Khách hàng: ${name} - ${phone}`,
      html: `
        <h2>Yêu Cầu Báo Giá & Đặt In Mới</h2>
        <p><strong>Thông tin khách hàng:</strong></p>
        <ul>
          <li><strong>Họ tên:</strong> ${name}</li>
          <li><strong>Số điện thoại:</strong> ${phone}</li>
        </ul>
        <p><strong>Thông tin sản phẩm cấu hình:</strong></p>
        <ul>
          <li><strong>Sản phẩm:</strong> ${productTitle}</li>
          <li><strong>Số lượng:</strong> ${quantity} ${unit || ''}</li>
          ${size ? `<li><strong>Kích thước:</strong> ${size}</li>` : ''}
          ${pages ? `<li><strong>Số trang:</strong> ${pages} trang</li>` : ''}
          ${isRoundedCorners ? `<li><strong>Gia công:</strong> Bo tròn góc</li>` : ''}
        </ul>
        <p><strong>Báo giá tạm tính:</strong></p>
        <ul>
          <li><strong>Đơn giá:</strong> ${unitPrice.toLocaleString('vi-VN')}đ / ${unit || ''}</li>
          <li><strong>Tổng cộng (Tạm tính):</strong> <strong style="color: #ff5722; font-size: 1.2em;">${totalPrice.toLocaleString('vi-VN')}đ</strong></li>
        </ul>
        <br/>
        <p>Đây là email tự động gửi từ hệ thống website In Ấn Xuân Nhĩ.</p>
      `
    };

    // If SMTP credentials are configured, send the mail
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Gửi yêu cầu đặt in thành công qua email!' });
    } else {
      console.warn("WARNING: SMTP credentials not set. Request logged:", req.body);
      return res.status(200).json({ 
        message: 'Yêu cầu được ghi nhận thành công (SMTP chưa được cấu hình).',
        preview: mailOptions.html
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const { title, type, category, location, salary, icon, description, requirements, benefits, status } = req.body;
    await job.update({
      title: title !== undefined ? title : job.title,
      type: type !== undefined ? type : job.type,
      category: category !== undefined ? category : job.category,
      location: location !== undefined ? location : job.location,
      salary: salary !== undefined ? salary : job.salary,
      icon: icon !== undefined ? icon : job.icon,
      description: description !== undefined ? description : job.description,
      requirements: requirements !== undefined ? requirements : job.requirements,
      benefits: benefits !== undefined ? benefits : job.benefits,
      status: status !== undefined ? status : job.status
    });

    return res.status(200).json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.destroy();
    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
