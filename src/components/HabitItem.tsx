import { HabitModel } from "../models/Models";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import './styles.css'
import { useState } from "react";
import { DateHelper } from "../helpers/DateHelper";
import { toast } from "react-toastify";


interface Props {
    habit: HabitModel;
    habitList: HabitModel[];
    updateHabits: React.Dispatch<React.SetStateAction<HabitModel[]>>
}

const HabitItem: React.FC<Props> = ({ habit, habitList, updateHabits }: Props) => {
    // Done
    const markDone = (id: string) => {
        let temp = habitList.map((habit) => habit.id === id ? { ...habit, streak: DateHelper.isEpochDateYesterday() ? ++habit.streak : 0, lastDone: Date.now() } : habit);
        updateHabits(temp);
    }
    // Delete
    const markDelete = (id: string) => {
        let temp = habitList.filter((habit) => habit.id !== id);
        updateHabits(temp);
    }
    // Update
    const [editedHabit, setEditedHabit] = useState<HabitModel>();

    const updateHabit = (updatedHabit: HabitModel) => {
        let temp = habitList.map((habit) => habit.id === updatedHabit.id ? updatedHabit : habit);
        console.log(updatedHabit);
        updateHabits(temp);
    }

    function submitEdit(event?: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        if (editedHabit) {
            updateHabit(editedHabit);
            setEditedHabit(undefined);
        }
    }
    return <form className="habit_item"
        action="Update" onSubmit={(event) => {
            submitEdit(event);
        }}
    >
        {editedHabit?.id ? <span>
            <input type="text" name="Name" id="edit_habit" value={editedHabit.name}
                onChange={(text) => {
                    setEditedHabit({ id: editedHabit.id, frequency: editedHabit.frequency, streak: editedHabit.streak, lastDone: editedHabit.lastDone, name: text.target.value })
                }} />
        </span> : <span> <b>{habit.name}</b> (frequency 🔁: {habit.frequency} || streak 🔥:{habit.streak})</span>}
        {editedHabit?.id ?
            <div>
                <MdDone className="icon" onClick={() => submitEdit()} />
            </div>
            : <div>
                <AiTwotoneEdit className="icon" onClick={() => setEditedHabit(habit)} />
                <AiTwotoneDelete className="icon" onClick={() => markDelete(habit.id)} />
                {DateHelper.isEpochDateToday(habit.lastDone) ? <MdOutlineDoneAll className="icon" onClick={() =>
                    toast('Already done for today')} /> : <MdDone className="icon" onClick={() => markDone(habit.id)} />}
            </div>}

    </form>;
}
export default HabitItem;