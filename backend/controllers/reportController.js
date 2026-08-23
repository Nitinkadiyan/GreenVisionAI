const Report = require("../models/Report.js");
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs");
const { analyzeImage } = require("../services/VisionService.js");
const { report } = require("process");
const createReport = async (req, res) => {
  try {
    const { description, longitude, latitude } = req.body;
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required!",
      });
    }
    // console.log(req.file);
    // console.log("nikku");
    // console.log(req.files.image);
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    // console.log(req.files);
    // console.log(req.files.image);
    console.log("nikku");
    const image = req.files?.image?.[0];
    console.log(image);
    const result = await analyzeImage(image);
    const uploadedImage = await cloudinary.uploader.upload(image.path);
    console.log("before result");
    console.log(result);
    const report = await Report.create({
      userId: req.user.id,
      description: description,
      location: {
        latitude,
        longitude,
      },
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      aiAnalysis: result,
      status: "Pending Review",
    });
    // if (req.file && fs.existsSync(req.file.path)) {
    //   fs.unlinkSync(req.file.path);
    // }
    return res.status(200).json({
      success: true,
      message: "Report created successfully!",
      data: report,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Invalid report",
      });
    }
    return res.status(200).json({
      success: true,
      report,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, latitude, longitude } = req.body;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }
    if (report.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }

    if (description) {
      report.description = description;
    }

    if (latitude) {
      report.location.latitude = latitude;
    }

    if (longitude) {
      report.location.longitude = longitude;
    }

    if (req.file) {
      if (report.imagePublicId) {
        await cloudinary.uploader.destroy(report.imagePublicId);
      }
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);

      report.imageUrl = uploadedImage.secure_url;
      report.imagePublicId = uploadedImage.public_id;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    await report.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }
    if (report.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }
    await cloudinary.uploader.destroy(report.imagePublicId);
    await Report.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Report deleted successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteAllReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id });
    for (const report of reports) {
      if (report.imagePublicId) {
        await cloudinary.uploader.destroy(report.imagePublicId);
      }
    }
    await Report.deleteMany({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      message: "Reports deleted successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "All reports deleted successfully",
    });
  }
};
module.exports = {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
  deleteAllReports,
};
