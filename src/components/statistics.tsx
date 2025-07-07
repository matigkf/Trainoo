'use client';
import { useEffect, useState } from 'react';
import { Workout as WorkoutType } from '@/lib/data';
import ProgressChart from './ProgressChart';

export default function Statistics() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workouts');
      const parsed: WorkoutType[] = saved ? JSON.parse(saved) : [];
      setWorkouts(parsed);
      if (parsed.length > 0) setSelectedExercise(parsed[0].exercise);
    }
  }, []);

  // Statystyki ogólne
  const totalWorkouts = workouts.length;
  const uniqueExercises = [...new Set(workouts.map(w => w.exercise))];
  const totalSets = workouts.reduce((sum, w) => sum + w.sets, 0);
  const avgWeightPerExercise = (exercise: string) => {
    const filtered = workouts.filter(w => w.exercise === exercise);
    if (filtered.length === 0) return 0;
    const totalWeight = filtered.reduce((sum, w) => sum + w.weight, 0);
    return (totalWeight / filtered.length).toFixed(2);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl max-w-3xl mx-auto text-white space-y-8">
      <h1 className="text-3xl font-bold mb-6">Statystyki treningów</h1>

      <div className="grid grid-cols-2 gap-6 text-center">
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Liczba treningów</h2>
          <p className="text-3xl">{totalWorkouts}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Unikalne ćwiczenia</h2>
          <p className="text-3xl">{uniqueExercises.length}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Łączna liczba serii</h2>
          <p className="text-3xl">{totalSets}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Średni ciężar (wybrane ćwiczenie)</h2>
          <p className="text-3xl">{selectedExercise ? avgWeightPerExercise(selectedExercise) : '0'}</p>
        </div>
      </div>

      <div>
        <label htmlFor="exercise-select" className="block mb-2 font-semibold">
          Wybierz ćwiczenie do wykresu:
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={e => setSelectedExercise(e.target.value)}
          className="p-2 border border-zinc-700 rounded bg-zinc-800 text-white w-full max-w-xs mb-6"
        >
          {uniqueExercises.map(ex => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        {selectedExercise && (
          <>
            <h3 className="text-2xl font-semibold mb-4">Progres ćwiczenia: {selectedExercise}</h3>
            <ProgressChart workouts={workouts} exercise={selectedExercise} />
          </>
        )}
      </div>
    </div>
  );
}
