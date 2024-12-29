const express = require('express');
const multer = require('multer');
const PastPaper = require('../models/PastPaper');
const router = express.Router();
const AWS = require('aws-sdk');

const storage = multer.memoryStorage();
const upload = multer({ storage });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // Replace with your bucket name
    Key: `${Date.now()}_${file.originalname}`, // Unique filename with timestamp
    Body: file.buffer, // File buffer from multer
    ContentType: file.mimetype, 
  };

  const data = await s3.upload(params).promise(); 
  return data.Location; 
};

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    // Extract metadata from the request
    const { name, subjectCode, session, paperType, paperNumber, level } = req.body;

    // Validate the required fields
    if ( !name ||!subjectCode || !session || !paperType || !paperNumber || !req.file || !level) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Upload the file to S3 and get the URL
    const pdfUrl = await uploadToS3(req.file);

    // Create and save the new past paper
    const newPastPaper = new PastPaper({
      name,
      subjectCode,
      session,
      paperType,
      paperNumber,
      pdfUrl, 
      level,
    });

    await newPastPaper.save();

    res.status(201).json({ message: 'Past paper uploaded successfully', pastPaper: newPastPaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload past paper', error });
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
