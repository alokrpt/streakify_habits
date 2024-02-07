import { HabitModel, habitModelToString, stringToHabitModel } from "../models/models";


interface Props {
    habits: HabitModel[]
}

let storageKey: string = 'saved_habits';

export function localSaveData(props: Props): void {
        // Save data to localStorage whenever 'data' changes
        localStorage.setItem(storageKey, habitModelToString(props.habits));

}

export function localGetData(): HabitModel[] {
    let habits: HabitModel[] = [];
    // Load data from localStorage
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        habits = stringToHabitModel(savedData);
    }

    return habits;
}

