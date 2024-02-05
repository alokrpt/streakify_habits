export interface HabitModel {
    id: string;
    name: string;
    streak: number;
    frequency: number; // days in a week
    lastDone?: number; // Epoch time when last updated
}

// Function to convert HabitModel to string
export function habitModelToString(habit: HabitModel[]): string {
    return JSON.stringify(habit);
}

// Function to parse string back to HabitModel
export function stringToHabitModel(data: string): HabitModel[] {
    try {
        const parsedData: HabitModel[] = JSON.parse(data);
        return parsedData;
    } catch (error) {
        console.error('Error parsing data:', error);
        return [];
    }
}