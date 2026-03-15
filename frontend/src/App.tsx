import styles from './styles/globals.module.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import CreateStartup from './pages/CreateStartup';
import Startups from './pages/Startups';

export default function App() {
  return (
    <div className={styles.fullWidth}>
      <Header />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomeHero />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/create-startup" element={<CreateStartup />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerLogo}>start-ups collection</span>
          <nav className={styles.footerNav}>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </nav>
          <div className={styles.footerContact}>
            <span><span className="icon">📧</span><a href="mailto:starrotji@gmail.com">starrotji@gmail.com</a></span>
            <span><span className="icon">💬</span><a href="https://wa.me/2348082205654" target="_blank" rel="noopener noreferrer">WhatsApp: +23408082205654</a></span>
          </div>
          <div className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} start-ups collection. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
