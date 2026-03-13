import React, { useState } from "react";
import styles from "../styles/FeaturedStartups.module.css";
import Modal from "./Modal";
import StartupDetails from "./StartupDetails";

interface Startup {
  id: string;
  name: string;
  description: string;
  founder: string;
  industry: string;
  website: string;
  logoUrl?: string;
  [key: string]: any;
}

interface FeaturedStartupsProps {
  startups: Startup[];
}

const FeaturedStartups: React.FC<FeaturedStartupsProps> = ({ startups }) => {
  // Modal state for showing startup details or video
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Runtime check for duplicate IDs
  const [duplicateIds, setDuplicateIds] = useState<string[]>([]);
  React.useEffect(() => {
    const idCounts: Record<string, number> = {};
    startups.forEach(s => {
      if (s.id) {
        idCounts[s.id] = (idCounts[s.id] || 0) + 1;
      }
    });
    const duplicates = Object.entries(idCounts).filter(([_, count]) => count > 1).map(([id]) => id);
    setDuplicateIds(duplicates);
    if (duplicates.length > 0) {
      console.warn('[FeaturedStartups] Duplicate startup IDs detected:', duplicates);
    }
  }, [startups]);

  // Show newest startups first
  const startupsReversed = [...startups].reverse();
  return (
    <>
      <Modal isOpen={modalOpen || !!videoUrl} onClose={() => { setModalOpen(false); setVideoUrl(null); }}>
        {modalOpen && selectedStartup && <StartupDetails startup={selectedStartup} />}
        {videoUrl && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video src={videoUrl} controls autoPlay style={{ width: '100%', maxWidth: 420, borderRadius: 12, background: '#000', aspectRatio: '16/9', maxHeight: '320px' }} />
          </div>
        )}
      </Modal>
      <div className={styles.featuredGrid}>
        {startupsReversed.map((startup, idx) => (
          <div className={styles.startupCard} key={startup.id || idx}>
            <div className={styles.startupTitle}>{startup.name}</div>
            <div className={styles.startupMediaRow}>
              {startup.imageUrl && (
                <div className={styles.startupImgWrapLarge}>
                  <img
                    src={startup.imageUrl}
                    alt={startup.name + " logo"}
                    className={styles.startupImg}
                  />
                </div>
              )}
            </div>
            <div className={styles.startupDetailsRow}>
              <button className={styles.detailsBtn} onClick={() => { setSelectedStartup(startup); setModalOpen(true); }}>
                Details
              </button>
              {startup.videoUrl && (
                <button className={styles.playBtn} onClick={() => setVideoUrl(startup.videoUrl)}>
                  ▶ Play
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedStartups;
