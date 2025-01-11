import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import TimeEditFetcher from './TimeEditFetcher';
import SchedulePreview from './SchedulePreview';
import CanvasUploader from './CanvasUploader';

function App() {
  const [schedule, setSchedule] = useState(null);

  return (
      <div className="App">
        <header>
          <h1>TimeEdit to Canvas Integration</h1>
        </header>
        <main>
          <TimeEditFetcher onFetchComplete={(data) => setSchedule(data)} />
          {schedule && <SchedulePreview schedule={schedule} />}
          {schedule && <CanvasUploader schedule={schedule} />}
        </main>
      </div>
  );
}

export default App;
