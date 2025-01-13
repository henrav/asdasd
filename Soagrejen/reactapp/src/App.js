import React, { useState } from 'react';
import './App.css';

import TimeEditFetcher from './TimeEditFetcher';
import SchedulePreview from './SchedulePreview';
import CanvasUploader from './CanvasUploader';

function App() {
    const [schedule, setSchedule] = useState(null);

    const changeLocation = (ID, newLocation) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, Plats: newLocation } : lesson
            )
        );
    };

    const changeActivity = (ID, newActivity) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, Aktivitet: newActivity } : lesson
            )
        );
    };

    const changeEmployee = (ID, newEmployee) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, Anställd: newEmployee } : lesson
            )
        );
    };

    const changeCourse = (ID, newCourse) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, KurskodNamn: newCourse } : lesson
            )
        );
    };

    const changeStart = (ID, field, newValue) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, [field]: newValue } : lesson
            )
        );
    };

    const changeEnd = (ID, field, newValue) => {
        setSchedule((prevSchedule) =>
            prevSchedule.map((lesson) =>
                lesson.Id === ID ? { ...lesson, [field]: newValue } : lesson
            )
        );
    };

    return (
        <div className="App">
            <header>
                <h1>TimeEdit to Canvas Integration</h1>
            </header>
            <main>
                <TimeEditFetcher onFetchComplete={(data) => setSchedule(data)} />
                {schedule && (
                    <SchedulePreview
                        schedule={schedule}
                        changeLocation={changeLocation}
                        changeActivity={changeActivity}
                        changeEmployee={changeEmployee}
                        changeCourse={changeCourse}
                        changeStart={changeStart}
                        changeEnd={changeEnd}
                    />
                )}
                {schedule && <CanvasUploader schedule={schedule} />}
            </main>
        </div>
    );
}

export default App;
