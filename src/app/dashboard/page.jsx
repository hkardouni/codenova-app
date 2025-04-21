'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PROGRESS_KEY = 'codenova-python-progress';

export default function DashboardPage() {
  const [progress, setProgress] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);

  useEffect(() => {
    // Fetch exercise count from static JSON file
    fetch('/data/exercises.json')
      .then(res => res.json())
      .then(data => {
        setExerciseCount(data.length);
        const savedStep = parseInt(localStorage.getItem(PROGRESS_KEY), 10) || 0;
        setProgress(savedStep);
      });
  }, []);

  const handleReset = () => {
    localStorage.setItem(PROGRESS_KEY, '0');
    setProgress(0);
  };

  const progressPercent = exerciseCount ? Math.floor((progress / exerciseCount) * 100) : 0;

  return (
    <main className="p-6 max-w-xl mx-auto">
        <div className="mb-4">
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>

      <h1 className="text-2xl font-bold mb-6">📊 Your Learning Dashboard</h1>

      <div className="mb-4">
        <p className="text-gray-700 mb-1">Progress:</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          You’ve completed {progress} of {exerciseCount} exercises ({progressPercent}%)
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <a href="/python-exercise">
          <Button>Continue Learning</Button>
        </a>
        <Button variant="destructive" onClick={handleReset}>
          Reset Progress
        </Button>
      </div>
    </main>
  );
}
