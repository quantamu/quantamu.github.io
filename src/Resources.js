import React, { useEffect, useState } from 'react';
import './Resources.css';

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/resources.json')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  return (
    <main className='resources-container'>
      <h1 className='header-section'>Resources</h1>
      <div className='resource-list'>
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              <a href={`/resources/${resource.file}`} target="_blank" rel="noopener noreferrer">
                {resource.title} ({resource.date})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Resources;