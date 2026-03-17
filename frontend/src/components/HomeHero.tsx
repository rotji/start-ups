// ...existing code...

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2 className={styles.title}>Discover Start-ups</h2>
        <p className={styles.subtitle}>
          Explore innovative start-ups, connect with founders, and find solutions that matter. 
          Join the start-ups community and be part of the next big thing.
        </p>
        <div className={styles.actions}>
          {/* 'Explore Start-ups' button removed as requested */}
          <a href="/create-startup" className={styles.createCta}>Create Start-up</a>
        </div>
      </div>
    </section>
  );
}
