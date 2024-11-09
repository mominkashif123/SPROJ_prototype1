const express = require('express');
const multer = require('multer');
const PastPaper = require('../models/PastPaper');
const router = express.Router();

// Configure multer for in-memory storage (no file saved to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { name, code, year, paper } = req.body; // Add paper field
    const newPastPaper = new PastPaper({
      name,
      code,
      year,
      paper, // Save paper variant (e.g., "Paper 1")
      pdfFile: req.file.buffer,  // Save file data as Buffer
      contentType: req.file.mimetype
    });

    await newPastPaper.save();
    res.status(201).json({ message: 'File uploaded successfully', pastPaper: newPastPaper });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload file', error });
  }
});


router.get('/subject/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const pastPapers = await PastPaper.find({ code: code });
    // console.log("Retrieved past papers:", pastPapers); 

    res.status(200).json(pastPapers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve past papers', error });
  }
});

// Endpoint to download a specific past paper PDF by ID
router.get('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paper = await PastPaper.findById(id);

    if (!paper) {
      return res.status(404).json({ message: 'Past paper not found' });
    }

    // Set the content type and send the binary data
    res.contentType(paper.contentType);
    res.send(paper.pdfFile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to download past paper', error });
  }
});

module.exports = router;
