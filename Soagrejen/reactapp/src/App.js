import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import TimeEditFetcher from './TimeEditFetcher';
import SchedulePreview from './SchedulePreview';
import CanvasUploader from './CanvasUploader';

function App() {
  const [schedule, setSchedule] = useState(null);



    const addAPIKey = (key) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            APIKey: key,
        }));
    };
  const changeAktivity = (ID, newAktivity) => {
      setSchedule((prevSchedule) =>
      prevSchedule.map((lesson)=>
          lesson.Id === ID ? {...lesson, Aktivitet: newAktivity} : lesson));
  }

  const changeLocation = (ID, newLocation) => {
      setSchedule((prevSchedule) =>
          prevSchedule.map((lesson) =>
              lesson.Id === ID ? {...lesson, Plats: newLocation} : lesson));
  }

const changeStartdatum = (ID) => (event) => {
    const newStartdatum = event.target.value;
    schedule.forEach((lesson) => {
        if (lesson.Id === ID) {
            lesson.Startdatum = newStartdatum;
        }
    });
}

  return (
      <div className="App">
        <header>
          <h1>TimeEdit to Canvas Integration</h1>
        </header>
        <main>
          <TimeEditFetcher onFetchComplete={(data) => setSchedule(data)} />
          {schedule && <SchedulePreview schedule={schedule} changeAktivity={changeAktivity} changeLocation={changeLocation} />}
          {schedule && <CanvasUploader schedule={schedule} appendSchedule={addAPIKey} />}
        </main>
      </div>
  );
}




export default App;
