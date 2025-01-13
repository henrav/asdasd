import React, { useState } from 'react';

function CanvasUploader({ schedule , appendSchedule}) {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');


    const uploadToCanvas = async () => {
        if (!schedule || schedule.length === 0) {
            setMessage('No schedule data to upload.');
            return;
        }

        try {
            for (const lesson of schedule) {
                const response = await fetch('/calendarEvents', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, //
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lesson }),
                });
                console.log(JSON.stringify({ lesson, token }));
                if (!response.ok) throw new Error('Failed to upload a lesson.');
            }
            setMessage('All lessons uploaded successfully!');
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2>Canvas Uploader</h2>
            <input
                type="text"
                placeholder="Enter Canvas API Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
            />
            <button onClick={uploadToCanvas}>Upload to Canvas</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CanvasUploader;
