import { Router } from 'express';
import { MongoStartupRepository } from '../repositories/MongoStartupRepository';
// Removed multer and local file upload logic
import { ObjectId } from 'mongodb';

const router = Router();
const repo = new MongoStartupRepository();


// POST /api/startups - create a new startup (Cloudinary only)
router.post('/', async (req, res) => {
  try {
    // Accept JSON only
    const data = req.body;
    console.log('[POST /api/startups] Incoming request:', data);
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
      imageUrl: data.imageUrl || '',
      videoUrl: data.videoUrl || '',
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
