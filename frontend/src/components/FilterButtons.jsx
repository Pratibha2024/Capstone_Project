import React from 'react';
import '../App.css';

const categories = [
  'All',
  'Tech',
  'Education',
  'Design',
  'Music',
  'Gaming',
  'News',
  'Sports',
  'Movies',
  'Fashion',
  'Comedy',
];

const FilterButtons = ({ activeCategory, onCategorySelect }) => {
  return (
    <div className="filter-buttons">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
