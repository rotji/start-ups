import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max for videos
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/webp', 'image/jpg',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type: ' + file.mimetype));
  },
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const isVideo = req.file.mimetype.startsWith('video/');
    let responded = false;
    const timeoutMs = 60000; // 60 seconds
    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        res.status(504).json({ error: 'Cloudinary upload timed out' });
      }
    }, timeoutMs);
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: isVideo ? 'video' : 'image',
        folder: isVideo ? 'startups/videos' : 'startups/images',
        // transformation: { width: 800, crop: 'limit' }, // optional
      },
      (error, result) => {
        if (responded) {
          return;
        }
        clearTimeout(timeout);
        if (error || !result) {
          responded = true;
          return res.status(500).json({ error: error?.message || 'Upload failed' });
        }
        responded = true;
        res.json({ url: result.secure_url, public_id: result.public_id });
      }
    );
    uploadStream.on('error', (err) => {
      if (!responded) {
        responded = true;
        clearTimeout(timeout);
        res.status(500).json({ error: 'Cloudinary stream error: ' + err.message });
      }
    });
    uploadStream.on('finish', () => {
    });
    uploadStream.end(req.file.buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
