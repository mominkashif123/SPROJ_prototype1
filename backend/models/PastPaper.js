const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Subject name
  code: { type: String, required: true },          // Subject code
  year: { type: String, required: true },          // Year of the paper
  paper: { type: String, required: true },         // Paper variant (e.g., "Paper 1", "Paper 2")
  pdfFile: { type: Buffer, required: true },       // PDF file as binary data
  contentType: { type: String, required: true }    // Content type of the PDF (e.g., "application/pdf")
});

module.exports = mongoose.model('PastPaper', pastPaperSchema);
