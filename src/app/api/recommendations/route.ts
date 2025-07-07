// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { workouts } from '@/lib/data';

export async function POST(req: NextRequest) {
  const { exercise } = await req.json();

  const filtered = workouts.filter(w => w.exercise === exercise);

  if (filtered.length === 0) {
    return NextResponse.json({ message: `Brak danych dla ćwiczenia: ${exercise}` });
  }

  const lastWorkout = filtered.reduce((prev, curr) =>
    new Date(curr.date) > new Date(prev.date) ? curr : prev
  );

  const recommendation = {
    message: `Twoja ostatnia sesja z ${exercise} miała ${lastWorkout.sets} serie i ${lastWorkout.reps} powtórzeń z ciężarem ${lastWorkout.weight}kg. Spróbuj zwiększyć ciężar o 5% następnym razem!`,
  };

  return NextResponse.json(recommendation);
}
