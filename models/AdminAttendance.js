const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema(
  {
    timeLimit: {
      type: Number,
      required: true,
      max: 30,
      min: 1,
      default: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["RUNNING", "COMPLETE"],
      default: "RUNNING",
    },
  },
  {
    timestamps: true,
  }
);

const AdminAttendance = model("AdminAttendanceSchema", adminAttendanceSchema);

module.exports = AdminAttendance;
