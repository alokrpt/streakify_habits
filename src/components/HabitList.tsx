import { SetStateAction } from "react";
import { HabitModel } from "../models/models";
import HabitItem from "./HabitItem";
import './styles.css'

interface Props {
    habits: HabitModel[];
    updateHabits: React.Dispatch<React.SetStateAction<HabitModel[]>>;
}

const HabitList: React.FC<Props> = ({ habits, updateHabits }: Props) => {
    return (
        <div className="habit_list">
            {
                habits.map((habit) =>
                    <HabitItem key={habit.id} habit={habit} habitList={habits} updateHabits={updateHabits} />
                )
            }
        </div>);
}

export default HabitList;