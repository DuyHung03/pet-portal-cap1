export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

<<<<<<< HEAD
    const intervals = [
        { label: 'week', vietnameseLabel: 'tuần', seconds: 60 * 60 * 24 * 7 },
        { label: 'day', vietnameseLabel: 'ngày', seconds: 60 * 60 * 24 },
        { label: 'hour', vietnameseLabel: 'giờ', seconds: 60 * 60 },
        { label: 'minute', vietnameseLabel: 'phút', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            const relativeTime = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' }).format(
                -count,
                interval.label
            );
            return relativeTime.replace(interval.label, interval.vietnameseLabel);
        }
=======
  const intervals = [
    { label: 'week', seconds: 60 * 60 * 24 * 7 },
    { label: 'day', seconds: 60 * 60 * 24 },
    { label: 'hour', seconds: 60 * 60 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
        -count,
        interval.label,
      );
>>>>>>> 22787f03128bd5c87206b03e4350024b292b0c52
    }
  }

<<<<<<< HEAD
    return 'vừa xong';
=======
  return 'just now';
>>>>>>> 22787f03128bd5c87206b03e4350024b292b0c52
}
