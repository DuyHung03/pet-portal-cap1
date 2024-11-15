export function generateTimeSlots(openingTime, closingTime) {
    const timeSlots = [];
    let currentTime = new Date(`1970-01-01T${openingTime}`);

    const endTime = new Date(`1970-01-01T${closingTime}`);
    while (currentTime <= endTime) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');

        timeSlots.push(`${hours}:${minutes}:${seconds}`);

        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timeSlots;
}
