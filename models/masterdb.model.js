const mongoose = require("mongoose");
const { Schema } = mongoose;

const MastedDB = Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    initialConnection: { type: Date, required: true, default: Date.now() },
    sessionId: { type: String, required: true },
    disconnectedTime: { type: Date, required: false },
    noOfConnections: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("masterdb", MastedDB);
