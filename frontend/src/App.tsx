import { useState, useEffect } from 'react';
import styles from './styles/globals.module.css';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import CreateStartup from './pages/CreateStartup';

import Startups from './pages/Startups';


export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/startups`);
        if (!res.ok) throw new Error('Failed to fetch startups');
        const data = await res.json();
        console.log('[App] Fetched data from backend:', data);
        // Support both { startups: [...] } and [...] for flexibility
        if (Array.isArray(data)) {
          setStartups(data);
        } else if (data && Array.isArray(data.startups)) {
          setStartups(data.startups);
        } else {
          setStartups([]);
        }
      } catch (err) {
        setError('Could not load startups.');
        setStartups([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, [refreshKey]);

  const handleCreated = () => setRefreshKey(k => k + 1);

  return (
    <div className={styles.fullWidth}>
      <Header />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomeHero />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/create-startup" element={<CreateStartup onCreated={handleCreated} />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerLogo}>start-ups</span>
          <nav className={styles.footerNav}>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </nav>
          <div style={{ marginTop: '0.7em', fontSize: '1em' }}>
            <span>Contact: </span>
            <a href="mailto:starrotji@gmail.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>starrotji@gmail.com</a>
            <span style={{ margin: '0 0.7em' }}>|</span>
            <a href="https://wa.me/2348082205654" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>WhatsApp: +23408082205654</a>
          </div>
          <small>&copy; {new Date().getFullYear()} start-ups. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
