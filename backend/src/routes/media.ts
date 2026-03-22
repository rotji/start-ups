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
    console.log('[media/upload] Incoming upload request:', req.file?.originalname, req.file?.mimetype, req.file?.size);
    if (!req.file) {
      console.error('[media/upload] No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const isVideo = req.file.mimetype.startsWith('video/');
    console.log('[media/upload] Detected type:', isVideo ? 'video' : 'image');
    let responded = false;
    const timeoutMs = 60000; // 60 seconds
    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        console.error('[media/upload] ERROR: Cloudinary upload timed out after', timeoutMs, 'ms');
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
          console.warn('[media/upload] Callback called after response sent.');
          return;
        }
        clearTimeout(timeout);
        if (error || !result) {
          console.error('[media/upload] Cloudinary error:', error);
          responded = true;
          return res.status(500).json({ error: error?.message || 'Upload failed' });
        }
        console.log('[media/upload] Cloudinary upload success:', result.secure_url);
        responded = true;
        res.json({ url: result.secure_url, public_id: result.public_id });
      }
    );
    uploadStream.on('error', (err) => {
      if (!responded) {
        responded = true;
        clearTimeout(timeout);
        console.error('[media/upload] Cloudinary stream error:', err);
        res.status(500).json({ error: 'Cloudinary stream error: ' + err.message });
      }
    });
    uploadStream.on('finish', () => {
      console.log('[media/upload] Cloudinary stream finished sending data.');
    });
    console.log('[media/upload] Piping file buffer to Cloudinary...');
    uploadStream.end(req.file.buffer);
    console.log('[media/upload] File buffer sent.');
  } catch (err: any) {
    console.error('[media/upload] Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
