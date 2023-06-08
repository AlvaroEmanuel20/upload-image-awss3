const express = require('express');
const cors = require('cors');
const uploadFile = require('./upload.middleware');
const { uploadToS3, getPresignedUrls } = require('./s3.config');
require('dotenv/config');

const app = express();
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Upload API');
});

app.post('/', uploadFile, async (req, res) => {
  try {
    if (!req.file)
      res.status(400).json({ message: 'Image is required', status: 400 });

    const { key, error } = await uploadToS3(req.file);
    if (error)
      res.status(500).json({ message: 'Error to upload image', status: 500 });

    res.status(201).json({ uploaded: true, imageName: key });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', status: 500 });
  }
});

app.get('/images', async (req, res) => {
  try {
    const { presignedUrls, error } = await getPresignedUrls();
    if (error)
      res.status(500).json({ message: 'Error to get images', status: 500 });

    res.status(201).json(presignedUrls);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', status: 500 });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
