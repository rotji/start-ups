import React, { useState } from "react";
import FeaturedStartups from "../components/FeaturedStartups";
import StartupSearch from "../components/StartupSearch";

const API_URL = import.meta.env.VITE_API_URL;

const Startups: React.FC = () => {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchStartups(filters: Record<string, any> = {}) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const url = `${API_URL}/api/startups${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch startups');
      const data = await res.json();
      const startupsArr = Array.isArray(data) ? data : data.startups || [];
      setStartups(startupsArr);
    } catch (err) {
      setError('Could not load startups.');
      setStartups([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchStartups();
  }, []);

  return (
    <div>
      <h1>All Startups</h1>
      <StartupSearch onSearch={fetchStartups} />
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
