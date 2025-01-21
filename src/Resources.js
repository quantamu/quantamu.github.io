import React, { useEffect, useState } from 'react';
import './Resources.css';

function Resources() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/resources.json')
      .then(response => response.json())
      .then(data => {
        // Sort resources by date (most recent first)
        data.forEach(category => {
          category.resources.sort((a, b) => new Date(b.date) - new Date(a.date));
        });
        setCategories(data);
      })
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className='resources-container'>
      <h1 className='header-section'>Resources</h1>
      {categories.map((category, index) => (
        <div key={index} className='resource-category'>
          <h2 className='category-title'>{category.category}</h2>
          <div className='resource-list'>
            <ul>
              {category.resources.map((resource, index) => (
                <li key={index}>
                  {resource.type === 'pdf' ? (
                    <a href={`/resources/${resource.file}`} target="_blank" rel="noopener noreferrer">
                      {resource.title}
                    </a>
                  ) : (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.title}
                    </a>
                  )}
                  <span className='resource-date'>{formatDate(resource.date)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Resources;