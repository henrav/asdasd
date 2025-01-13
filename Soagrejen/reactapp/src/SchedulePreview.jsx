import React from 'react';

function SchedulePreview({ schedule, changeLocation, changeActivity, changeEmployee, changeCourse, changeStart, changeEnd }) {
    if (!schedule || schedule.length === 0) {
        return <p>No lessons to display.</p>;
    }

    const editLocation = (ID) => (event) => {
        const newLocation = event.target.value;
        changeLocation(ID, newLocation);
    };

    const editActivity = (ID) => (event) => {
        const newActivity = event.target.value;
        changeActivity(ID, newActivity);
    };

    const editEmployee = (ID) => (event) => {
        const newEmployee = event.target.value;
        changeEmployee(ID, newEmployee);
    };

    const editCourse = (ID) => (event) => {
        const newCourse = event.target.value;
        changeCourse(ID, newCourse);
    };

    const editStart = (ID, field) => (event) => {
        const newValue = event.target.value;
        changeStart(ID, field, newValue);
    };

    const editEnd = (ID, field) => (event) => {
        const newValue = event.target.value;
        changeEnd(ID, field, newValue);
    };

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
                            <td>
                                <input
                                    type="text"
                                    value={lesson.Aktivitet}
                                    onChange={editActivity(lesson.Id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={lesson.Startdatum}
                                    onChange={editStart(lesson.Id, "Startdatum")}
                                />
                                <input
                                    type="time"
                                    value={lesson.Starttid}
                                    onChange={editStart(lesson.Id, "Starttid")}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={lesson.Slutdatum}
                                    onChange={editEnd(lesson.Id, "Slutdatum")}
                                />
                                <input
                                    type="time"
                                    value={lesson.Sluttid}
                                    onChange={editEnd(lesson.Id, "Sluttid")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={lesson.Plats}
                                    onChange={editLocation(lesson.Id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={lesson.Anställd}
                                    onChange={editEmployee(lesson.Id)}
                                />
                            </td>
                            <td>
                                {lesson.Möteslänk.startsWith("http") ? (
                                    <a
                                        href={lesson.Möteslänk}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Link
                                    </a>
                                ) : (
                                    "No Link"
                                )}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={lesson.KurskodNamn}
                                    onChange={editCourse(lesson.Id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SchedulePreview;
