function getDayOfWeekInVietnamese(dayIndex) {
    const daysOfWeek = [
        'Chủ nhật',
        'Thứ hai',
        'Thứ ba',
        'Thứ tư',
        'Thứ năm',
        'Thứ sáu',
        'Thứ bảy',
    ];
    return daysOfWeek[dayIndex];
}

const currentDate = new Date();
const dayOfWeek = getDayOfWeekInVietnamese(currentDate.getDay());
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

export const vietnameseDate = `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year}`;
