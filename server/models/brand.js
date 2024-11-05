const mongoose = require("mongoose");
const schema = mongoose.Schema;

const brandSchema = new schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Brand", brandSchema);
