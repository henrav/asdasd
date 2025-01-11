const fs = require('fs');
const path = require('path');

const os = require('os');
require('dotenv').config();

const API_TOKEN = process.env.CANVAS_API_TOKEN;
const deskPath= process.env.DESKTOP_PATH;
const CANVAS_DOMAIN = 'https://canvas.ltu.se';


fs.readFile(deskPath, 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    let kalenderIDlist;
    if (data.length === 0) {
        return;
    }else{
        kalenderIDlist = JSON.parse(data)
    }
    for (const id of kalenderIDlist) {
        try {
            const response = await fetch(`${CANVAS_DOMAIN}/api/v1/calendar_events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            console.log(`Event with ID ${id} deleted`);


            kalenderIDlist = kalenderIDlist.filter((kalenderID) => kalenderID !== id);

        } catch (error) {
            console.log("Error deleting event:", error);
        }
    }
    const updatedData = JSON.stringify(kalenderIDlist);
    fs.writeFile(deskPath, updatedData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File updated");
    });

});
