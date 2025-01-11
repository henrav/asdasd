import React from 'react';

function SchedulePreview({ schedule }) {
    if (!schedule || schedule.length === 0) {
        return <p>No lessons to display.</p>;
    }

    return (
        <div>
            <h2>Schedule Preview</h2>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Activity</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Location</th>
                        <th>Employee</th>
                        <th>Link</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((lesson, index) => (
                        <tr key={index}>
                            <td>{lesson.Id}</td>
                            <td>{lesson.Aktivitet}</td>
                            <td>{`${lesson.Startdatum} ${lesson.Starttid}`}</td>
                            <td>{`${lesson.Slutdatum} ${lesson.Sluttid}`}</td>
                            <td>{lesson.Plats}</td>
                            <td>{lesson.Anställd}</td>
                            <td>
                                {lesson.Möteslänk.startsWith("http") ? (
                                    <a href={lesson.Möteslänk} target="_blank" rel="noopener noreferrer">
                                        Link
                                    </a>
                                ) : (
                                    "No Link"
                                )}
                            </td>
                            <td>{lesson.KurskodNamn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SchedulePreview;
