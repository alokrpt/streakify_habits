import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputFeild from './components/InputFeild';

const App: React.FC = () => {
  const [habitName, add] = useState<string>('')
  console.log(habitName)
  return <div className='App'>
    <center>
      <h2 className="heading">
        Streakify
      </h2>
      <InputFeild habitName={habitName} add={add}></InputFeild>
    </center>
  </div>;
}

export default App;
