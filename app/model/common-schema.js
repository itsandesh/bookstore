const { mongoose } = require("mongoose")

const CommonSchema = {
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "incative",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
}

module.exports = CommonSchema