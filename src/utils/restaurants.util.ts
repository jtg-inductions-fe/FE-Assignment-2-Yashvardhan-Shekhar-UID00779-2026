/**
 * Converts a 24-hour time string into a 12-hour AM/PM format.
 * @param time - Time in `HH:mm` format.
 * @returns Formatted time in `h:mm AM/PM` format.
 */

export const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};
