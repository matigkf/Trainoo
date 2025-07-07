// src/lib/data.ts
export type Workout = {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

export const workouts: Workout[] = [
  {
    id: 'abc123',
    date: '2025-07-07',
    exercise: 'Martwy ciąg',
    sets: 4,
    reps: 6,
    weight: 120,
  },
  {
    id: 'def456',
    date: '2025-07-06',
    exercise: 'Przysiady',
    sets: 5,
    reps: 5,
    weight: 100,
  },
];
