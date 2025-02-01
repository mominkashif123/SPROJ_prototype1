const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  subjectCode: { type: String, required: true }, 
  year: {type: String, required: true },
  session: { type: String, required: true },    
  paperType: { type: String, required: true },  
  paperNumber: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  level: { type: String, required: true },      
});

module.exports = mongoose.model('PastPaper', pastPaperSchema);
