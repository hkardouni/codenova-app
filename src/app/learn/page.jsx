'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LearnPage() {
    const [learningPaths, setLearningPaths] = useState([])

    useEffect(() => {
        fetch('/data/learning-paths.json')
        .then(res => res.json())
        .then(data => setLearningPaths(data))
    }, [])
    return (
        <main className="p-6 max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
    
          <h1 className="text-3xl font-bold mb-6">🚀 Choose a Learning Path</h1>
    
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {learningPaths.map(path => (
              <div key={path.id} className="border rounded-xl p-4 shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-2">{path.title}</h2>
                <p className="text-gray-600 mb-4">{path.description}</p>
                {path.link === '#' ? (
                  <Button disabled variant="secondary">Coming Soon</Button>
                ) : (
                  <Link href={path.link}>
                    <Button className='cursor-pointer'>Start Learning</Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </main>
      );
}
