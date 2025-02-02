const mongoose = require('mongoose');

const topicalPaperSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  subjectCode: { type: String, required: true }, 
  topic: { type: String, required: true },  // Added topic-specific field
  pdfUrl: { type: String, required: true },
  level: { type: String, required: true },      
});

module.exports = mongoose.model('TopicalPaper', topicalPaperSchema);
