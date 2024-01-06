
const CommonSchema = {
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "incative",
    },
}

module.exports = CommonSchema