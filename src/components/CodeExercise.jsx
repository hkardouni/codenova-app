"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const PROGRESS_KEY = "codenova-python-progress";

export default function CodeExercise() {
  const [exercises, setExercises] = useState([]);
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/data/exercises.json")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        const savedStep = parseInt(localStorage.getItem(PROGRESS_KEY), 10) || 0;
        setStep(savedStep);
        setCode(data[savedStep].starterCode);
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");
    setCompleted(false);
    try {
      const res = await fetch("/api/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await res.json();
      const expected = exercises[step].expectedOutput.trim();
      const actual = result.output.trim();

      if (actual === expected) {
        setOutput(actual);
        setCompleted(true);
        // Save progress
        localStorage.setItem(PROGRESS_KEY, step.toString());
      } else {
        setOutput(`❌ Output:\n${actual}\n\n✅ Expected:\n${expected}`);
        setCompleted(false);
      }
    } catch (err) {
      setOutput("Error executing code.");
      setCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep < exercises.length) {
      setStep(nextStep);
      setCode(exercises[nextStep].starterCode);
      setOutput("");
      setCompleted(false);
      // Update progress in localStorage
      localStorage.setItem(PROGRESS_KEY, nextStep.toString());
    }
  };

  if (exercises.length === 0) return <p>Loading exercises...</p>;

  const current = exercises[step];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost">← Back to Home</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Python: Step-by-Step Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="font-semibold">{current.title}</h2>
          <p className="text-sm text-gray-600">{current.description}</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">
                View Tutorial
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{current.title} – Tutorial</DialogTitle>
                <DialogDescription>{current.tutorial}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            className="font-mono"
          />
          <Button onClick={handleSubmit} className="mt-2" disabled={loading}>
            {loading ? "Running..." : "Submit"}
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
        {completed ? (
          <>
            <p className="text-green-600 font-medium">✅ Output:\n{output}</p>
            {step < exercises.length - 1 ? (
              <Button onClick={handleNext} className="mt-2">
                Next Exercise
              </Button>
            ) : (
              <p className="text-blue-600">
                🎉 You've completed all exercises!
              </p>
            )}
          </>
        ) : (
          <p className="text-red-600">{output}</p>
        )}
      </div>
    </div>
  );
}
