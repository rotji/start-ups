
import React, { useState } from 'react';
import styles from '../styles/StartupSearch.module.css';

const FILTER_OPTIONS = [
  { label: 'Category', name: 'category', type: 'text', placeholder: 'Category' },
  { label: 'Problem', name: 'problem', type: 'text', placeholder: 'Problem' },
  { label: 'Stage', name: 'stage', type: 'text', placeholder: 'Stage' },
  { label: 'Location', name: 'location', type: 'text', placeholder: 'Location' },
  { label: 'Size', name: 'size', type: 'text', placeholder: 'Size' },
  { label: 'Min Revenue', name: 'revenueMin', type: 'number', placeholder: 'Min Revenue' },
  { label: 'Max Revenue', name: 'revenueMax', type: 'number', placeholder: 'Max Revenue' },
];

interface StartupSearchProps {
  onSearch: (filters: Record<string, any>) => void;
}

const StartupSearch: React.FC<StartupSearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({ name: search, ...filters });
    setDropdownOpen(false);
  }

  function handleDropdownToggle() {
    setDropdownOpen((open) => !open);
  }

  return (
    <form className={styles.searchDropdownForm} onSubmit={handleSubmit}>
      <div className={styles.searchBoxRow}>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search startups..."
          value={search}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className={styles.dropdownToggle}
          aria-label="Show filters"
          onClick={handleDropdownToggle}
        >
          <span className={dropdownOpen ? styles.arrowUp : styles.arrowDown}></span>
        </button>
        <button type="submit" className={styles.searchBtn}>Search</button>
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownPanel}>
          {FILTER_OPTIONS.map(opt => (
            <div key={opt.name} className={styles.filterRow}>
              <label>{opt.label}</label>
              <input
                name={opt.name}
                type={opt.type}
                placeholder={opt.placeholder}
                value={filters[opt.name] || ''}
                onChange={handleFilterChange}
              />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default StartupSearch;
