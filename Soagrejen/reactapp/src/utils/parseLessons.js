const parseLessons = (timeEditData) => {
    if (!timeEditData || !timeEditData.reservations) return [];

    return timeEditData.reservations
        .filter((res) => res.columns[0] && res.columns[1]) // Ensure valid activity and title
        .map((res) => ({
            Id: res.id,
            Starttid: res.starttime,
            Sluttid: res.endtime,
            Startdatum: res.startdate,
            Slutdatum: res.enddate,
            Aktivitet: res.columns[0] || "Unknown Activity",
            Plats: res.columns[1] || "Unknown Location",
            Anställd: res.columns[2] || "No Employee Assigned",
            Möteslänk: res.columns[5] || "No Link",
            KurskodNamn: res.columns[6]?.split(',')[0] || "Unknown Course",
            Campus: res.columns[8] || "Unknown Campus",
        }));
};

export default parseLessons;
