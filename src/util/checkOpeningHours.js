export function isOpen(openingTime, closingTime) {
    const opening = new Date();
    const closing = new Date();

    const [openHour, openMinute, openSecond] = openingTime
        .split(':')
        .map(Number);
    const [closeHour, closeMinute, closeSecond] = closingTime
        .split(':')
        .map(Number);

    opening.setHours(openHour, openMinute, openSecond);
    closing.setHours(closeHour, closeMinute, closeSecond);

    const now = new Date();

    return now >= opening && now <= closing;
}
