'use client';
import { useState } from 'react';

interface Props {
  exercise: string;
}

export default function AIRecommendations({ exercise }: Props) {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string>('');

  const fetchRecommendation = async () => {
    setLoading(true);
    setRecommendation('');
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise }),
      });
      const data = await res.json();
      setRecommendation(data.message);
    } catch {
      setRecommendation('Coś poszło nie tak...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 bg-zinc-900/80 rounded-xl shadow-md backdrop-blur-md">
      <button
        onClick={fetchRecommendation}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition"
      >
        {loading ? 'Ładuję...' : `Pobierz rekomendację AI dla ${exercise}`}
      </button>
      {recommendation && <p className="mt-4">{recommendation}</p>}
    </div>
  );
}
