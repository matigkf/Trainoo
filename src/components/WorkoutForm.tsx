'use client';
import { useState, useEffect } from 'react';
import { Workout as WorkoutType, workouts as initialWorkouts } from '@/lib/data';
import ProgressChart from './ProgressChart';

const LOCAL_STORAGE_KEY = 'trainoo_workouts';

export default function WorkoutForm() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [form, setForm] = useState<WorkoutType>({
    id: '',
    date: '',
    exercise: '',
    sets: 0,
    reps: 0,
    weight: 0,
  });
  const [selectedExercise, setSelectedExercise] = useState('');

  // Załaduj dane z localStorage lub ustaw initialWorkouts
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setWorkouts(JSON.parse(stored));
    } else {
      setWorkouts(initialWorkouts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialWorkouts));
    }
  }, []);

  // Ustaw selectedExercise na pierwsze ćwiczenie, gdy workouts się załadują
  useEffect(() => {
    if (workouts.length > 0 && !selectedExercise) {
      setSelectedExercise(workouts[0].exercise);
    }
  }, [workouts, selectedExercise]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['sets', 'reps', 'weight'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.exercise) {
      alert('Uzupełnij datę i ćwiczenie');
      return;
    }
    const newWorkout = {
      ...form,
      id: Date.now().toString(),
    };
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWorkouts));
    setForm({
      id: '',
      date: '',
      exercise: '',
      sets: 0,
      reps: 0,
      weight: 0,
    });
    setSelectedExercise(newWorkout.exercise);
  };

  // Lista unikalnych ćwiczeń z aktualnych danych
  const exercises = Array.from(new Set(workouts.map(w => w.exercise)));

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/80 p-6 rounded-2xl shadow-lg space-y-4 backdrop-blur-md"
      >
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white border border-zinc-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="exercise"
          placeholder="Ćwiczenie"
          value={form.exercise}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white border border-zinc-700 p-2 rounded-md"
        />
        <input
          name="sets"
          type="number"
          placeholder="Serie"
          value={form.sets || ''}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white border border-zinc-700 p-2 rounded-md"
        />
        <input
          name="reps"
          type="number"
          placeholder="Powtórzenia"
          value={form.reps || ''}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white border border-zinc-700 p-2 rounded-md"
        />
        <input
          name="weight"
          type="number"
          placeholder="Ciężar (kg)"
          value={form.weight || ''}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white border border-zinc-700 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-md"
        >
          Zapisz trening
        </button>
      </form>

      <div>
        <label className="block mb-2 font-semibold" htmlFor="exercise-select">
          Wybierz ćwiczenie do wykresu:
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={e => setSelectedExercise(e.target.value)}
          className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white w-full max-w-xs"
        >
          {exercises.map(ex => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Progres ćwiczenia: {selectedExercise}</h2>
        <ProgressChart workouts={workouts} exercise={selectedExercise} />
      </div>
    </div>
  );
}
