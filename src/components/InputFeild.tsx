import './styles.css'

interface Props {
    habitName: string;
    add: React.Dispatch<React.SetStateAction<string>>
}

const InputFeild = ({ habitName, add }: Props) => {
    return <form className="input" action="Add">
        <input type="input" placeholder={`Enter a Habit` + habitName} className="habit_input"
            value={habitName} onChange={
                (h) => add(h.target.value)
            }

        />
        <button className="habit_submit"> + Add </button>
    </form>
}

export default InputFeild;