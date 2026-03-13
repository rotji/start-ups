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
// GET /api/startups - list all startups with advanced filtering
router.get('/', async (req, res) => {
  try {
    // Build filter from query params
    const filter: any = {};
    const { category, problem, stage, revenueMin, revenueMax, location, size, name } = req.query;
    if (category) filter.categories = { $in: Array.isArray(category) ? category : [category] };
    if (problem) filter.problems = { $in: Array.isArray(problem) ? problem : [problem] };
    if (stage) filter.stage = stage;
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (size) filter.size = size;
    if (revenueMin || revenueMax) {
      filter.revenue = {};
      if (revenueMin) filter.revenue.$gte = revenueMin;
      if (revenueMax) filter.revenue.$lte = revenueMax;
    }
    // Add more filters as needed
    console.log('[GET /api/startups] Fetching startups with filter:', filter);
    const startups = await repo.findAll(filter);
    console.log('[GET /api/startups] Returning startups:', startups.length);
    res.json({ startups });
  } catch (err) {
    console.error('[GET /api/startups] Error:', err);
    res.status(500).json({ error: 'Failed to fetch startups' });
  }
});

export default router;
