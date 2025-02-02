const express = require('express');
const multer = require('multer');
const Topical = require('../models/Topical.js');
const router = express.Router();
const AWS = require('aws-sdk');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parseTopicFromFileName = (fileName) => {
  return fileName.replace(/_/g, ' ').replace(/\.\w+$/, ''); // Replace underscores and remove file extension
};

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

router.post('/upload', upload.array('pdfs', 20), async (req, res) => {
  try {
    const { name, subjectCode, level, paperNumber } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(async (file) => {
      const pdfUrl = await uploadToS3(file);
      const topic = parseTopicFromFileName(file.originalname);

      return new Topical({
        name,
        subjectCode,
        topic,
        pdfUrl,
        level,
        paperNumber,
      }).save();
    });

    const savedPapers = await Promise.all(uploadPromises);

    res.status(201).json({ message: 'Topical papers uploaded successfully', papers: savedPapers });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload topical papers', error });
  }
});

router.get('/subjects/:level', async (req, res) => {
  try {
    const { level } = req.params;
    
    const subjects = await Topical.find({ level }).distinct('name');
    const subjectDetails = await Promise.all(
      subjects.map(async (subjectName) => {
        const subjectCode = (await Topical.findOne({ name: subjectName, level }).select('subjectCode -_id'))?.subjectCode;
        return { name: subjectName, subjectCode };
      })
    );

    res.json(subjectDetails); 
  } catch (error) {
    console.error('Failed to fetch subjects', error);
    res.status(500).json({ message: 'Failed to fetch subjects', error });
  }
});


router.get('/topics/:level/:subject', async (req, res) => {
  try {
    const { level, subject } = req.params;
    const topics = await Topical.find({ level, name: subject }).select("topic pdfUrl paperNumber -_id");
    res.json(topics.map((t) => ({
      topic: t.topic, 
      pdfUrl: t.pdfUrl, 
      paperNumber: t.paperNumber 
    }))); 

  } catch (error) {
    console.error("Failed to fetch topics", error);
    res.status(500).json({ message: "Failed to fetch topics", error });
  }
});



module.exports = router;