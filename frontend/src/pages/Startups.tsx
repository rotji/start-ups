import React from "react";
import FeaturedStartups from "../components/FeaturedStartups";

interface StartupsProps {
  startups: any[];
  loading: boolean;
  error: string | null;
}

const Startups: React.FC<StartupsProps> = ({ startups, loading, error }) => {
  return (
    <div>
      <h1>All Startups</h1>
      {loading ? (
        <div>Loading startups...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <FeaturedStartups startups={startups} />
      )}
    </div>
  );
};

export default Startups;
