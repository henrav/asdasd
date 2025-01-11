import React, { useState } from 'react';
import parseLessons from './utils/parseLessons'; // Importing parseLessons from utils

function TimeEditFetcher({ onFetchComplete }) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);

    const fetchTimeEditData = async () => {
        if (!url) {
            setError('Please enter a valid URL.');
            return;
        }

        try {
            setError(null); // Clear previous errors
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data. Please check the URL.');

            const data = await response.json();
            const lessons = parseLessons(data); // Parse lessons from fetched data
            onFetchComplete(lessons); // Pass lessons to parent component
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Fetch TimeEdit Data</h2>
            <input
                type="text"
                placeholder="Enter the .json URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
            />
            <button onClick={fetchTimeEditData}>Fetch</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default TimeEditFetcher;
