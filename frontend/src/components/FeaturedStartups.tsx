import React from "react";
import styles from "../styles/FeaturedStartups.module.css";

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
  return (
    <div className={styles.gridWrap}>
      {startups.map((startup) => (
        <div className={styles.cardGrid} key={startup.id}>
          {startup.imageUrl && (
            <div className={styles.logoWrap}>
              <img
                src={startup.imageUrl}
                alt={startup.name + " logo"}
                className={styles.logoImg}
              />
            </div>
          )}
          <div className={styles.titleCenter}>{startup.name}</div>
          <div className={styles.fieldsTable}>
            <div className={styles.row}><span className={styles.label}>Description:</span><span className={styles.value}>{startup.description || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Category:</span><span className={styles.value}>{Array.isArray(startup.categories) ? startup.categories.join(', ') : startup.category || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Problems:</span><span className={styles.value}>{Array.isArray(startup.problems) ? startup.problems.join(', ') : startup.problems || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Stage:</span><span className={styles.value}>{startup.stage || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Team:</span><span className={styles.value}>{Array.isArray(startup.team) ? startup.team.join(', ') : startup.team || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Funding Needs:</span><span className={styles.value}>{startup.fundingNeeds || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Pitch Deck URL:</span><span className={styles.value}>{startup.pitchDeckUrl || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Pitch Video URL:</span><span className={styles.value}>{startup.pitchVideoUrl || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Demo URL:</span><span className={styles.value}>{startup.demoUrl || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Revenue:</span><span className={styles.value}>{startup.revenue || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Phone:</span><span className={styles.value}>{startup.phone || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Email:</span><span className={styles.value}>{startup.email || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Social Media:</span><span className={styles.value}>{startup.socialMedia || '-'}</span></div>
            <div className={styles.row}><span className={styles.label}>Created At:</span><span className={styles.value}>{startup.createdAt ? new Date(startup.createdAt).toLocaleString() : '-'}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedStartups;
