'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Workout } from '@/lib/data';

interface Props {
  workouts: Workout[];
  exercise: string;
}

export default function ProgressChart({ workouts, exercise }: Props) {
  // Filtrujemy tylko wybrane ćwiczenie i sortujemy wg daty rosnąco
  const filtered = workouts
    .filter(w => w.exercise === exercise)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Mapujemy na dane do wykresu — data, objętość treningu (sets * reps * weight)
  const chartData = filtered.map(w => ({
    name: w.date,
    volume: w.sets * w.reps * w.weight,
  }));

  return (
    <div className="bg-zinc-900/80 p-6 rounded-2xl shadow-md backdrop-blur-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="name" 
            stroke="#ccc" 
            tick={{ fontSize: 12 }} 
            angle={-45} 
            textAnchor="end" 
            height={60} 
          />
          <YAxis 
            stroke="#ccc" 
            tick={{ fontSize: 12 }} 
            allowDecimals={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: 8, borderColor: '#7c3aed' }} 
            labelStyle={{ color: '#a78bfa' }}
            formatter={(value: number) => [`${value}`, 'Objętość']} 
          />
          <Bar dataKey="volume" fill="#a78bfa" barSize={40} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
