const parseLessons = (timeEditData) => {
    if (!timeEditData || !timeEditData.reservations) return [];

    return timeEditData.reservations
        .filter((res) => res.columns[0] && res.columns[1]) // Ensure valid activity and title
        .map((res) => ({
            Id: res.id,
            Starttid: `${res.starttime}:00`,
            Sluttid: `${res.endtime}:00`,
            Startdatum: res.startdate,
            Slutdatum: res.enddate,
            Aktivitet: res.columns[0] || "Unknown Activity", // Correctly map activity
            Plats: res.columns[1] || "Unknown Location", // Correctly map location
            Anställd: res.columns[2] || "No Employee Assigned", // Correctly map employee
            Möteslänk: res.columns[5] || "No Link", // Correctly map link (e.g., Zoom link)
            KurskodNamn: res.columns[6]?.split(',')[0] || "Unknown Course", // Display course name once
        }));
};

export default parseLessons;
