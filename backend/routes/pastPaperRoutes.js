const express = require('express');
const multer = require('multer');
const PastPaper = require('../models/PastPaper');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { name, code, year, what, paper, level } = req.body;
    const newPastPaper = new PastPaper({
      name,
      code,
      year,
      what,
      paper,
      level,
      pdfFile: req.file.buffer,
      contentType: req.file.mimetype
    });
    await newPastPaper.save();
    res.status(201).json({ message: 'File uploaded successfully', pastPaper: newPastPaper });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload file', error });
  }
});

router.get('/subjects/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const subjects = await PastPaper.distinct('name', { level: level }); 
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve subjects', error });
  }
});

router.get('/past-papers', async (req, res) => {
  const { level, subject } = req.query; 
  try {
    const papers = await PastPaper.find({ level: level, name: subject });
    res.status(200).json(papers);         
  } catch (error) {
    console.error("Error fetching past papers:", error);
    res.status(500).json({ message: "Failed to fetch past papers", error });
  }
});

// router.get('/subject/:code', async (req, res) => {
//   try {
//     const { code } = req.params;
//     const pastPapers = await PastPaper.find({ code: code });
//     res.status(200).json(pastPapers);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve past papers', error });
//   }
// });

// router.get('/level/:level', async (req, res) => {
//   try {
//     const { level } = req.params;
//     console.log(level)
//     const pastPapers = await PastPaper.find({ level: level });
//     res.status(200).json(pastPapers);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve past papers by level', error });
//   }
// });

router.get('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paper = await PastPaper.findById(id);
    if (!paper) {
      return res.status(404).json({ message: 'Past paper not found' });
    }
    res.contentType(paper.contentType);
    res.send(paper.pdfFile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to download past paper', error });
  }
});

module.exports = router;
