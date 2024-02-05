import { HabitModel, habitModelToString, stringToHabitModel } from "../models/models";
import React, { useState, useEffect } from 'react';


interface Props {
    habits: HabitModel[]
    updateHabits: React.Dispatch<React.SetStateAction<HabitModel[]>>
}

let storageKey: string = 'saved_habits';

export function LocalSaveData(props: Props): void {
    useEffect(() => {
        // Save data to localStorage whenever 'data' changes
        localStorage.setItem(storageKey, habitModelToString(props.habits));
    }, [props.habits]);
}

export function LocalGetData(): HabitModel[] {
    let habits: HabitModel[] = [];
    // Load data from localStorage
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        habits = stringToHabitModel(savedData);
    }

    return habits;
}

