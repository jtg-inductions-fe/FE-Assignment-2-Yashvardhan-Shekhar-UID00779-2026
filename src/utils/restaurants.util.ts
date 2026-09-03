/**
 * Converts a 24-hour time string into a 12-hour AM/PM format.
 *
 * @param {string} time - Time in `HH:mm` format.
 * @returns {string} Formatted time in `h:mm AM/PM` format.
 */

export const formatTime = (time: string) => {
    // console.log(time)
    // let date = Date.now();

    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};
