export interface HabitModel {
    id: string;
    name: string;
    streak: number;
    frequency: number; // days in a week
    lastDone?: number; // Epoch time when last updated
}