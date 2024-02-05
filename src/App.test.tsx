import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import HabitList from './components/HabitList';
import demoData from './test_helpers/demo_data';
import CreateHabitForm from './components/CreateHabitForm';
import { DateHelper } from './helpers/date_helper';
import { HabitModel, habitModelToString, stringToHabitModel } from './models/models';

test('renders home page of the app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Streakify Habits/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders habits list', () => {
  const habits = demoData;
  const { getByText } = render(<HabitList habits={habits} updateHabits={() => { }} />);
  habits.forEach(habit => {
    const element = getByText(habit.name);
    expect(element).toBeInTheDocument();
  });
});


describe('isEpochDateYesterday function', () => {
  test('returns true if the epoch date is yesterday', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1728182400000);
    expect(DateHelper.isEpochDateYesterday(1707067117000)).toBe(true);
    global.Date.now = realDateNow;
  });

  test('returns false if the epoch date is not yesterday', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1728182400000);
    expect(DateHelper.isEpochDateYesterday(1728009600000)).toBe(false);
    global.Date.now = realDateNow;
  });

  test('returns true if no epoch date is provided', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1728182400000);

    expect(DateHelper.isEpochDateYesterday()).toBe(true);

    global.Date.now = realDateNow;
  });


});



describe('isEpochDateToday function', () => {
  test('returns true if the epoch date is today', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => realDateNow());
    expect(DateHelper.isEpochDateToday(realDateNow())).toBe(true);
    global.Date.now = realDateNow;
  });

  test('returns false if the epoch date is not today', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1728268800000);
    expect(DateHelper.isEpochDateToday(1728182400000)).toBe(false);
    global.Date.now = realDateNow;
  });

  test('returns false if no epoch date is provided', () => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1728268800000);
    expect(DateHelper.isEpochDateToday()).toBe(false);
    global.Date.now = realDateNow;
  });
});




describe('HabitModel interface', () => {
  test('should have correct properties', () => {
    const habit: HabitModel = {
      id: '1',
      name: 'Exercise',
      streak: 3,
      frequency: 5,
      lastDone: 1644000000000 // February 5, 2022
    };

    expect(habit.id).toBe('1');
    expect(habit.name).toBe('Exercise');
    expect(habit.streak).toBe(3);
    expect(habit.frequency).toBe(5);
    expect(habit.lastDone).toBe(1644000000000);
  });
});

describe('habitModelToString function', () => {
  test('should convert HabitModel array to string', () => {
    const habits: HabitModel[] = [
      {
        id: '1',
        name: 'Exercise',
        streak: 3,
        frequency: 5,
        lastDone: 1644000000000
      },
      {
        id: '2',
        name: 'Read',
        streak: 7,
        frequency: 7,
        lastDone: 1644000000000
      }
    ];

    const result = habitModelToString(habits);
    const expected = JSON.stringify(habits);

    expect(result).toBe(expected);
  });
});

describe('stringToHabitModel function', () => {
  test('should parse string to HabitModel array', () => {
    const data = '[{"id":"1","name":"Exercise","streak":3,"frequency":5,"lastDone":1644000000000},{"id":"2","name":"Read","streak":7,"frequency":7,"lastDone":1644000000000}]';

    const result = stringToHabitModel(data);
    const expected: HabitModel[] = [
      {
        id: '1',
        name: 'Exercise',
        streak: 3,
        frequency: 5,
        lastDone: 1644000000000
      },
      {
        id: '2',
        name: 'Read',
        streak: 7,
        frequency: 7,
        lastDone: 1644000000000
      }
    ];

    expect(result).toEqual(expected);
  });

  test('should return empty array if parsing fails', () => {
    const data = 'invalid JSON string';

    const result = stringToHabitModel(data);

    expect(result).toEqual([]);
  });
});
