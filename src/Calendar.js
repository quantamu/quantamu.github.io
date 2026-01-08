import React from 'react';
import './Officers.css'

function Calendar() {
    return (
        <main style={{ minHeight: 'calc(100vh - 300px)' }}>
            <h1 className ='header-section'><strong>Calendar</strong></h1>
            <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', marginTop: '50px'}}>
                <iframe 
                src = "https://calendar.google.com/calendar/embed?src=tamu.quantum%40gmail.com&ctz=America%2FChicago"
                style = {{border: 0, marginBottom:'-50px'}}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                title ="Calendar"
                ></iframe>
            </div>
        </main>
        
    );
}

export default Calendar;
