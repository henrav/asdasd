import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';




function App() {
  const [courses, setCourses] = useState([]); // [state, setState


  const lektioner = [
    {
      Id: "1010710",
      Starttid: "09:15:00",
      Sluttid: "10:45:00",
      Startdatum: "2025-01-07",
      Slutdatum: "2025-01-07",
      Aktivitet: "seminarium",
      Plats: "zoom",
      Anställd: "nazi diana",
      Möteslänk: "zoom länk perhaps",
      KurskodNamn: "d0023E, nazi dianas kurs",
      Campus: "luleå?"
    },
    {
      Id: "1023298",
      Starttid: "09:15:00",
      Sluttid: "10:45:00",
      Startdatum: "2025-01-07",
      Slutdatum: "2025-01-07",
      Aktivitet: "lektion",
      Plats: "zoom",
      Anställd: "nazi diana kompis",
      Möteslänk: "zoom länk perhaps",
      KurskodNamn: "d0023E, nazi dianas kompis kurs",
      Campus: "piteå?"
    }
  ];







  useEffect(() => {
      getCourses();
  },[]);
  const getCourses = async () => {
    try {
      const response = await fetch("/tjena");
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }



  const redirect = () => {
    window.open("https://cloud.timeedit.net/ltu/web/schedule1/ri1Q7.html", "_blank")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Course zoom</th>
            <th>StartDate</th>
            <th>EndDate</th>
          </tr>
        </thead>
          <tbody>
          {lektioner.length > 0 ? (
              lektioner.map((lektion) => (
                  <tr key={lektion.Id}>
                    <td>{lektion.KurskodNamn}</td>
                    <td>{lektion.Aktivitet}</td>
                    <td>{lektion.Plats}</td>
                    <td>{lektion.Startdatum + "T" + lektion.Sluttid + ":00Z"}</td>
                    <td>{lektion.Slutdatum + "T" + lektion.Sluttid + ":00Z"}</td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="3">No grades available</td>
              </tr>
          )
          }
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
