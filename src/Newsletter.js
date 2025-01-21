import React, { useEffect, useState } from 'react';
import './Newsletter.css';

// Using Sheets2API API OK
function Newsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const url = 'https://sheet2api.com/v1/YW0AA7DGRpKC/newsletter-database/Sheet1?';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setNewsletters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading newsletters...</p>;
  }

  if (error) {
    return <p>Error loading newsletters: {error.message}</p>;
  }

  if(newsletters.length == 0)
  {
    return<p>No newsletters available.</p>;
  }

  const latestNewsletter = newsletters[newsletters.length - 1];
  const previousNewsletters = newsletters.slice(0, newsletters.length - 1).reverse();

  return (
    <main className='newsletter-container'>
      <h1 className='header-section'>Newsletters</h1>
      <div className='latest-newsletter'>
        <iframe
          src={latestNewsletter.Link}
          width="50%"
          height="800px"
          style={{ border: 'none' }}
          title=  {'Newsletter # {latestNewsletter.Number}'}
        ></iframe>
      </div>
      <div className='previous-newsletters'>
        <h2>Previous Newsletters:</h2>
        <ul>
          {previousNewsletters.map((newsletter, index) => (
            <li key={index}>
              <a href={newsletter.Link} download> Newsletter #{newsletter.Number}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Newsletter;