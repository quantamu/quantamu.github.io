import React, { useEffect, useState } from 'react';
import './Newsletter.css';
import Papa from 'papaparse'

// Using Sheets2API API OK
function Newsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTtFw20B5ZMj8wTMnhwlCN-Jn3K2PMcU8Vlmvt3-OyISvXhBPoid9XD_6uHFfmC_2QE-h6NHqM2qPI/pub?gid=0&single=true&output=csv';

    fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(csv => {
          const { data } = Papa.parse(csv, {
            header: true,          // first row becomes the keys: Number, Link, Date
            skipEmptyLines: true,
            transformHeader: h => h.trim(),
          });
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


  const valid = newsletters.filter(n => n.Link && n.Number);

  if (valid.length === 0) {
    return <p>No newsletters available.</p>;
  }

  const latest = valid[valid.length - 1];          // last row = newest
  const previous = valid.slice(0, -1).reverse();

  /* Added dates now so it is easier for people to keep track of the chronology of Quant A&M */

  return (
    <main className='newsletter-container'>
      <h1 className='header-section'><strong>Newsletters</strong></h1>
      <section className='latest-newsletter'>
        <span className='latest-badge'>Latest</span>
        <h2>Newsletter #{latest.Number}</h2>
        <p className='latest-date'>{latest.Date}</p>
        <a className='latest-button' href={latest.Link} target='_blank' rel='noopener noreferrer'>
          Read now
        </a>
      </section>

      {previous.length > 0 && (
          <div className='previous-newsletters'>
            <h3>Previous issues</h3>
            <ul>
              {previous.map(n => (
                  <li key={n.Number}>
                    <a href={n.Link} target='_blank' rel='noopener noreferrer'>
                      Newsletter #{n.Number}
                    </a>
                    {n.Date && <span className='newsletter-date'>{n.Date}</span>}
                  </li>
              ))}
            </ul>
          </div>
      )}
    </main>
  );
}

export default Newsletter;