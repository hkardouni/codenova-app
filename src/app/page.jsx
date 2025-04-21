'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">👋 Welcome to CodeNova</h1>
      <p className="text-gray-600 mb-8">
        Your personalized learning platform to master programming step by step.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link href="/learn">
          <Button className="w-full md:w-auto">🎯 Choose a Learning Path</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="w-full md:w-auto">📊 View Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
