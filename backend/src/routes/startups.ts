import { Router } from 'express';
import { MongoStartupRepository } from '../repositories/MongoStartupRepository';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ObjectId } from 'mongodb';

const router = Router();
const repo = new MongoStartupRepository();
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// POST /api/startups - create a new startup (accept any input, including image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('[POST /api/startups] Incoming request:', req.body);
    const data = req.body;
    let imageUrl = '';
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newPath = path.join(req.file.destination, req.file.filename + ext);
      fs.renameSync(req.file.path, newPath);
      imageUrl = `/uploads/${req.file.filename + ext}`;
      console.log('[POST /api/startups] Image saved at:', imageUrl);
    }
    const now = new Date();
    const startup = {
      id: new ObjectId().toString(),
      name: data.name || '',
      description: data.description || '',
      categories: data.category ? [data.category] : [],
      problems: data.problems ? (Array.isArray(data.problems) ? data.problems : [data.problems]) : [],
      stage: data.stage || '',
      team: data.team ? (Array.isArray(data.team) ? data.team : [data.team]) : [],
      fundingNeeds: data.fundingNeeds || '',
      pitchDeckUrl: data.pitchDeckUrl || '',
      pitchVideoUrl: data.pitchVideoUrl || '',
      demoUrl: data.demoUrl || '',
      revenue: data.revenue || '',
      phone: data.phone || '',
      email: data.email || '',
      socialMedia: data.socialMedia || '',
      imageUrl,
      createdAt: now,
      updatedAt: now,
      createdBy: '',
    };
    console.log('[POST /api/startups] Startup object to create:', startup);
    await repo.create(startup);
    console.log('[POST /api/startups] Startup created successfully');
    res.status(201).json({ success: true, startup });
  } catch (err) {
    console.error('[POST /api/startups] Error:', err);
    res.status(500).json({ error: 'Failed to create startup' });
  }
});

// GET /api/startups - list all startups (for now, all as featured)
router.get('/', async (req, res) => {
  try {
    console.log('[GET /api/startups] Fetching all startups');
    const startups = await repo.findAll();
    console.log('[GET /api/startups] Returning startups:', startups.length);
    res.json({ startups });
  } catch (err) {
    console.error('[GET /api/startups] Error:', err);
    res.status(500).json({ error: 'Failed to fetch startups' });
  }
});

export default router;
