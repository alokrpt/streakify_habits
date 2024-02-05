import React, { useEffect, useState } from 'react';
import './App.css';
import CreateHabitForm from './components/CreateHabitForm';
import { HabitModel, habitModelToString } from './models/models';
import HabitList from './components/HabitList';
import { v4 as uuid } from 'uuid';
import { localGetData, localSaveData } from './helpers/local_storage_helper';

const App: React.FC = () => {
  const [habit, add] = useState<HabitModel>({ id: uuid(), name: '', frequency: 7, streak: 0 })
  const [habits, updateHabits] = useState<HabitModel[]>(
    () => {
      const savedData = localGetData();
      return savedData || [];
    }
  )
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (habit.name) {
      updateHabits([...habits, { id: uuid(), name: habit.name, frequency: habit.frequency, streak: 0 }]);
      add({ ...habit, name: '' })
      console.log(habits);
    }
  };

  useEffect(() => {
    updateHabits(localGetData());
  }, []);
  useEffect(() => {
    localSaveData({ habits: habits });
  }, [habits]);
  return <div className='App'>
    <center>
      <h2 className="heading">
        Streakify Habits
      </h2>
      <CreateHabitForm habit={habit} add={add} handleAdd={handleAdd}></CreateHabitForm>
      <HabitList habits={habits} updateHabits={updateHabits}></HabitList>
    </center>
  </div>;
}

export default App;
