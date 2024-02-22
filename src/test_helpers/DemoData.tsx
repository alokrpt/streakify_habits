import { HabitModel } from "../models/Models";


const demoData: HabitModel[] = [
    {
        id: '1',
        name: 'Exercise',
        streak: 3,
        frequency: 5,
        lastDone: new Date('2024-02-03').getTime()
    },
    {
        id: '2',
        name: 'Read',
        streak: 7,
        frequency: 7,
        lastDone: new Date('2024-02-04').getTime()
    },
    {
        id: '3',
        name: 'Meditate',
        streak: 10,
        frequency: 7
    }
];

export default demoData;