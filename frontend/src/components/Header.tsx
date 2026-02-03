import React from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <div style={{ width: '100%', margin: '2em 0 2em 0', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <span style={{ fontWeight: 'bold', fontSize: '2.2em', color: '#38bdf8', letterSpacing: '2px', flex: '0 0 auto' }}>start-ups</span>
      <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2em' }}>
        <a href="/" style={{ color: '#18181b', fontWeight: 'bold', fontSize: '1.3em', textDecoration: 'none' }}>Home</a>
        <a href="/startups" style={{ color: '#18181b', fontWeight: 'bold', fontSize: '1.3em', textDecoration: 'none' }}>Start-ups</a>
        <a href="/dashboard" style={{ color: '#18181b', fontWeight: 'bold', fontSize: '1.3em', textDecoration: 'none' }}>Dashboard</a>
      </nav>
    </div>
  );
}
