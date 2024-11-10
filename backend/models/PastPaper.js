const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  code: { type: String, required: true },          
  year: { type: String, required: true },          
  session: {type: String, required: true},        
  what: { type: String, required: true },       
  paper: { type: String, required: true },       
  level: {type: String, required: true},
  pdfFile: { type: Buffer, required: true },     
  contentType: { type: String, required: true }   
});

module.exports = mongoose.model('PastPaper', pastPaperSchema);
