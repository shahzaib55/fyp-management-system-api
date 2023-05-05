const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company_name: {
    type: String,
    required: true,
    unique: true
  },
  company_contact_person: {
    type: String,
  },
  company_email: {
    type: String,
    required: true,
    unique: true
  },
  company_mobile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("company", CompanySchema);
