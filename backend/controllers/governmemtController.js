const Report = require("../models/Report.js");

const getAllGovReports = async (req, res) => {
  try {
    const reports = await Report.find();
    return res.status(200).json({
      success: true,
      message: "Reports fetched successfully.",
      data: reports,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const approveReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }
    if (report.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "report already approved",
      });
    }
    report.status = "Approved";
    report.approvedBy = req.user.id;
    report.approvedAt = new Date();
    await report.save();
    return res.status(200).json({
      success: true,
      message: "Report is approved",
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

const rejectReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }
    if (report.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Report already rejected!",
      });
    }
    report.status = "Rejected";
    report.rejectionReason = reason;
    report.save();
    return res.status(200).json({
      success: true,
      message: "report rejected successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const assignPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const allowedPriorities = ["Low", "Medium", "High", "Critical"];
    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message:
          "Allowed priorites are low, medium, high and critical. Please use accordingly!",
      });
    }
    const report = await Reports.findById(id);
    if (report.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Cant give priority to rejected reports!",
      });
    }
    report.priority = priority;
    await report.save();
    return res.status(200).json({
      success: true,
      message: "Priority assigned successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const assignDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const { deadline } = req.body;
    if (!deadline) {
      return res.status(400).json({
        success: false,
        message: "Deadline is required1",
      });
    }
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }
    const deadlineDate = new Date(deadline);
    if (deadlineDate.getTime() <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Dadline date must be in future",
      });
    }

    if (NaN(deadlineDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid deadline",
      });
    }

    report.deadline = deadlineDate;
    await report.save();
    return res.status(200).json({
      success: true,
      message: "Deadline assigned successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const assignReward = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: "Amount is required!",
      });
    }
    if (amount < 0 || typeof amount !== "number") {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid number",
      });
    }
    const report = await Reports.findById(id);
    if (!reports) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.assignReward = amount;
    await report.save();
    return res.stats(200).json({
      success: true,
      message: "Reward assignmed successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const escalateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { escalatedTo, escalateReason } = req.body;
    if (!escalatedTo) {
      return res.status(400).json({
        success: false,
        message: "Escaltion authority/department is required",
      });
    }
    if (!escalateReason) {
      return res.status(400).json({
        success: false,
        message: "Escalate reason is required!",
      });
    }
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }
    if (report.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Rejected report can't be escalated",
      });
    }

    if (report.status === "Escalated") {
      return res.status(400).json({
        success: false,
        message: "Report already escalated!",
      });
    }
    report.status = "Escalated";
    report.escalated = true;
    report.escalateReason = escalateReason;
    report.escalatedTo = escalatedTo;
    report.escalatedBy = req.user.id;
    report.escalatedAt = Date.now();
    await report.save();
    return res.status(200).json({
      success: true,
      message: "Report escalated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const reportAnalytics = async (req, res) => {
  try {
    const totalReports = Report.countDocuments();
    const approvedReports = Report.countDocuments({ status: "Approved" });
    const pendingReports = Report.countDocuments({ status: "Pending Review" });
    const rejectedReports = Report.countDocuments({ status: "Rejected" });
    const assignedReports = Report.countDocuments({ status: "Assigned" });
    const inProgressReports = await Report.countDocuments({
      status: "In Progress",
    });
    const resolvedReports = await Report.countDocuments({ status: "Resolved" });
    const escalatedReports = await Report.countDocuments({
      status: "Escalated",
    });
    const highPriorityReports = await Report.countDocuments({
      priority: "High",
    });
    const criticalReports = await Report.countDocuments({
      priority: "Critical",
    });

    return res.status(200).json({
      success: true,
      message: "Government analytics fetched successfully!",
      data: {
        totalReports,
        pendingReports,
        approvedReports,
        rejectedReports,
        inProgressReports,
        resolvedReports,
        escalatedReports,
        highPriorityReports,
        criticalReports,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const assignReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { department, officerId } = req.body;

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department is required!",
      });
    }

    if (!officerId) {
      return res.status(400).json({
        success: false,
        message: "Officer ID is required!",
      });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }

    if (report.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Cannot assign a rejected report!",
      });
    }

    const officer = await User.findById(officerId);

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found!",
      });
    }

    report.assignedDepartment = department;
    report.assignedTo = officerId;
    report.assignedAt = new Date();
    report.status = "Assigned";

    await report.save();

    return res.status(200).json({
      success: true,
      message: "Report assigned successfully!",
      data: report,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Assigned",
      "In Progress",
      "Resolved",
      "Escalated",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required!",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report status!",
      });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found!",
      });
    }

    if (report.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Cannot update status of a rejected report!",
      });
    }

    report.status = status;

    await report.save();

    return res.status(200).json({
      success: true,
      message: "Report status updated successfully!",
      data: report,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
module.exports = {
  getAllGovReports,
  approveReport,
  rejectReport,
  assignPriority,
  assignDeadline,
  assignReward,
  escalateReport,
  reportAnalytics,
  assignReport,
  updateReportStatus,
};
