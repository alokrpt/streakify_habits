import { useRef } from 'react';
import './styles.css'
import { HabitModel } from '../models/models';

interface Props {
    habit: HabitModel;
    add: React.Dispatch<React.SetStateAction<HabitModel>>
    handleAdd: (e: React.FormEvent) => void;
}

const CreateHabitForm: React.FC<Props> = ({ habit, add, handleAdd }: Props) => {
    const formRef = useRef<HTMLFormElement>(null)  // react hooks

    return <form className="input" action="Add"
        onSubmit={(habit) => {
            handleAdd(habit);
            formRef.current?.blur();
        }}
        ref={formRef}>
        <input type="input" placeholder={`Enter a Habit`} className="habit_input"
            value={habit.name}
            onChange={
                (h) => add({ ...habit, name: h.target.value })
            }
        />
        <div className='spacer' />
        <label htmlFor='dropdown'>Frequency (days/week): </label>
        <select id="dropdown" onChange={
            (h) => add({ ...habit, frequency: parseInt(h.target.value) })
        }>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select>
        <button className="habit_submit"> + Add </button>
    </form>
}

export default CreateHabitForm;