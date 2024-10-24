export function getDate(isoDate) {
    const dateObj = new Date(isoDate);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
}

export function getTime(isoDate) {
    const dateObj = new Date(isoDate);

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
