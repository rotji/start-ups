import React, { useState } from 'react';
import styles from '../styles/CreateStartup.module.css';

const CATEGORIES = [
  'Fintech', 'Healthtech', 'Edtech', 'Agritech', 'Data', 'AI', 'SaaS', 'E-commerce', 'Logistics', 'Mobility',
  'Proptech', 'Legaltech', 'Insurtech', 'Cleantech', 'Biotech', 'Foodtech', 'Travel', 'Media', 'Gaming', 'HR', 'Security',
  'Marketplace', 'IoT', 'Blockchain', 'Energy', 'Retail', 'Other'
];

export default function CreateStartup({ onCreated }: { onCreated?: () => void } = {}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    problems: '',
    stage: '',
    team: '',
    fundingNeeds: '',
    pitchDeckUrl: '',
    pitchVideoUrl: '',
    demoUrl: '',
    revenue: '',
    phone: '',
    email: '',
    socialMedia: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (e.target.name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value as any);
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/startups`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create start-up');
      setSuccess(true);
      setForm({
        name: '', description: '', category: '', problems: '', stage: '', team: '', fundingNeeds: '', pitchDeckUrl: '', pitchVideoUrl: '', demoUrl: '', revenue: '', phone: '', email: '', socialMedia: '', image: null,
      });
      setImagePreview(null);
      if (onCreated) onCreated();
    } catch {
      setError('Could not create start-up. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.createStartupPage}>
      <h2>Create Start-up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Start-up Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <textarea name="problems" value={form.problems} onChange={handleChange} placeholder="Problems Solved" />
        <select name="stage" value={form.stage} onChange={handleChange} required>
          <option value="">Select Stage</option>
          <option value="Pre-seed">Pre-seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
          <option value="Series C">Series C</option>
        </select>
        <textarea name="team" value={form.team} onChange={handleChange} placeholder="Team Members" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="socialMedia" value={form.socialMedia} onChange={handleChange} placeholder="Social Media Links" required />
        <input name="fundingNeeds" value={form.fundingNeeds} onChange={handleChange} placeholder="Funding Needs" />
        <input name="pitchDeckUrl" value={form.pitchDeckUrl} onChange={handleChange} placeholder="Pitch Deck URL" />
        <input name="pitchVideoUrl" value={form.pitchVideoUrl} onChange={handleChange} placeholder="Pitch Video URL" />
        <input name="demoUrl" value={form.demoUrl} onChange={handleChange} placeholder="Demo URL" />
        <select name="revenue" value={form.revenue} onChange={handleChange} required>
          <option value="">Select Revenue</option>
          <option value="0">0 dollar</option>
          <option value="1k-10k">1k - 10k dollars</option>
          <option value="10k-100k">10k - 100k dollars</option>
          <option value="100k-500k">100k - 500k dollars</option>
          <option value="500k-1m">500k - 1m dollars</option>
          <option value="2m-10m">2m - 10m dollars</option>
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        {imagePreview && (
          <img src={imagePreview} alt="Startup Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, marginBottom: 8 }} />
        )}
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Start-up'}</button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>Start-up created successfully!</div>}
      </form>
    </div>
  );
}
