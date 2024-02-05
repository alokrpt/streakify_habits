export class DateHelper {
    static isEpochDateToday(epochDate?: number): boolean {
        if (!epochDate) return false;
        // Convert epoch date to milliseconds
        const date = new Date(epochDate);

        // Get today's date
        const today = new Date();

        // Check if the year, month, and day of the two dates are the same
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    }
    static isEpochDateYesterday(epochDate?: number): boolean {
        if (!epochDate) return true;
        const date = new Date(epochDate);
        const today = new Date();

        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate() - 1;
    }
}
