const { Schema, model } = require("mongoose");

const StudentAttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "AdminAttendance",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model("StudentAttendance", StudentAttendanceSchema);
module.exports = StudentAttendance;
