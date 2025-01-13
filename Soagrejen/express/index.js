const express = require('express');
const app = express();
const PORT = 5001;
const fs = require('fs');
const path = require('path');
const {parse} = require("dotenv");
app.use(express.json());
require('dotenv').config();
const API_TOKEN = process.env.CANVAS_API_TOKEN;
const CANVAS_DOMAIN = 'https://canvas.ltu.se';
const deskPath= process.env.DESKTOP_PATH;
// Basic route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//post calender grej
// curl localhost:5001/oh

//asd


//okej ska vara en fucking post till canvas
//ska ta emot en json och skapa en kalender event
/*
Kalender event
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
        }
    ];
    ska vara i bodyn av posten
    extrahera alla lektioner för att skapa en lista med nya kalender event
    för varje lektion skicka api request till canvas för att skapa en kalender event
 */


//curl -X POST -H "Content-Type: application/json" -d '{"lektioner": [{"Id": "1010710","Starttid": "09:15:00","Sluttid": "10:45:00","Startdatum": "2025-01-07","Slutdatum": "2025-01-07","Aktivitet": "seminarium","Plats": "zoom","An
app.post('/calendarEvents', async (req, res) => {
    try {

        const token = req.headers.authorization;                                                //hämtar token från headers
        if (!req.body || !req.body.lesson) {                                                          //kollar om bodyn är tom eller om lektioner inte finns
            return res.status(400).json({ error: 'Missing or invalid request body' });
        }

        const calendarEvent = {
            calendar_event:{
                context_code: "user_146040",                                                    // "user_146040", eftersom vi inte får skapa events för kurser
                title: req.body.lesson.Aktivitet,                                              // "Tutoring",`
                start_at: `${req.body.lesson.Startdatum}T${req.body.lesson.Starttid}:00`,    // "2025-01-07T10:15:00Z", måste vara i detta format
                end_at: `${req.body.lesson.Slutdatum}T${req.body.lesson.Sluttid}:00`,       // "2025-01-07T11:45:00Z", måste vara i detta format
                description: req.body.lesson.Möteslänk,                                     // "https://ltu-se.zoom.us/j/8592343228",
                location_name: req.body.lesson.Plats,                                      // "Zoom",
                location_address: req.body.lesson.Campus                                  // "online föfan"
            }
        }


        console.log('Constructed calendarEvents array:', calendarEvent);   //debugging


        const response = await fetch(`${CANVAS_DOMAIN}/api/v1/calendar_events`, {     //skicka en post request till canvas
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(calendarEvent),
        });
        if (!response.ok) {    //om det inte gick att skicka requesten
            console.log(`Error sending calendar event (${calendarEvent.calendar_event.title}): ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.error) {   //om det blev ett error spara inte kalender event ID
            writeToFile([data.id]);  //skriv till filen
        }

        res.json(response);                                          //skicka tillbaka resultatet
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to create calendar events' });
    }
});




//curl -X GET localhost:5001/testKalender
//användes under testning för att se, enklare att skicka request till servern än att skicka till canvas
app.get('/testKalender', async (req, res) => {

    //förbestämda kalender event
    const calendarEvents = [
        {
            calendar_event: {
                context_code: "user_146040",    //vi får inte skapa events för kurser så måste vara events för oss själva vi skapar
                title: "Tutoring med nazi diana",
                start_at: "2025-01-07T10:15:00Z",
                end_at: "2025-01-07T11:45:00Z",
                description: "https://ltu-se.zoom.us/j/8592343228",
                location_name: "Zoom",
                location_address: "online föfan"
            }
        },
        {
            calendar_event: {
                context_code: "user_146040",
                title: "lektion med nazi diana",
                start_at: "2025-01-08T10:15:00Z",
                end_at: "2025-01-08T11:45:00Z",
                description: "https://ltu-se.zoom.us/j/8592343228",
                location_name: "Zoom",
                location_address: "online föfan"
            }
        }
    ];

    console.log('Test calendarEvents array:', calendarEvents);

    const resultat = [];
    try {
        for (const calendarEvent of calendarEvents) {   //basicly samma som funktionen över
            console.log('Processing calendarEvent:', calendarEvent);
            const response = await fetch(`${CANVAS_DOMAIN}/api/v1/calendar_events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(calendarEvent),
            });
            if (!response.ok) {
                console.log(`Error sending calendar event (${calendarEvent.calendar_event.title}): ${response.status} ${response.statusText}`);
                resultat.push({ error: `Error sending event: ${calendarEvent.calendar_event.title}` });
                continue;
            }

            const data = await response.json();
            resultat.push(data);
        }
        const kalenderIDList = getNoneFailedResults(resultat);
        writeToFile(kalenderIDList);
        res.json(resultat);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to process calendar events' });
    }
});


function getNoneFailedResults(resultat) {     //sorterar ut alla kalender event som inte failade
    const kalenderIDList = [];
    for (const result of resultat) {
        if (result.error) {
            continue;
        }
        kalenderIDList.push(result.id);
    }
    return kalenderIDList;
}

function writeToFile(data) {            //skriver till filen för att spara alla kalender event ID's
    fs.readFile(deskPath, 'utf8', (err, oldData) => {
        let existingdata = [];
        if (!err){
            try{
                if (oldData) {  //om det finns data i filen så läs in den
                    existingdata = JSON.parse(oldData);
                }
            }catch (parseError) {
                console.error('Error:', parseError);
            }
        }
        existingdata = existingdata.concat(data);  //lägg till nya datan med den gamla datan, enklare än att hålla på och försöka appenda till filen
        fs.writeFile(deskPath, JSON.stringify(existingdata, null, 2), (err) => {  //skriv till filen
            if (err) {
                console.error('Error writing to file:', err);
            }else{
                console.log('Data written to file');
                console.log('kalenderIDList:', data);
                console.log('Existing data:', existingdata);
            }
        });
    })
}





