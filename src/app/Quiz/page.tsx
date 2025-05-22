"use client";
import { useEffect, useState } from "react";
import QuizQuestion from "@/components/Quiz/QuizQuestion";
import QuizResult from "@/components/Quiz/QuizResult";
import QuizStart from "@/components/Quiz/QuizSart";
import QuizNote from "@/components/Quiz/QuizNote";

const questions: string[] = [
  "¿Qué tan feliz te sentiste hoy?",
  "¿Cuánto estrés experimentaste hoy?",
  "¿Qué tan motivado estuviste durante el día?",
  "¿Cuánto cansancio sentiste hoy?",
  "¿Te sentiste acompañado o solo hoy?",
  "¿Qué tan ansioso(a) te sentiste hoy?",
  "¿Tuviste momentos de enojo o irritabilidad?",
  "¿Te sentiste triste en algún momento del día?",
  "¿Qué tan satisfecho(a) estás con lo que lograste hoy?",
  "¿Te sentiste agradecido(a) por algo hoy?",
  "¿Experimentaste preocupación por el futuro?",
  "¿Te sentiste en calma y relajado(a)?",
  "¿Tuviste pensamientos negativos recurrentes?",
  "¿Te sentiste capaz de manejar tus emociones hoy?",
  "¿Te sorprendió algo de manera positiva o negativa hoy?",
];

function getMainEmotion(answers: number[]) {
  const labels = [
    "Felicidad",
    "Tristeza",
    "Ansiedad",
    "Preocupación",
    "Sorpresa",
    "Enojo",
  ];
  const maxIndex = answers.reduce(
    (maxIdx, val, idx, arr) => (val > arr[maxIdx] ? idx : maxIdx),
    0
  );
  return labels[maxIndex];
}

export default function QuizPage() {
  const [step, setStep] = useState<
    "loading" | "start" | number | "note" | "result"
  >("loading");
  const [answers, setAnswers] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [quizData, setQuizData] = useState<any>(null);

  // Al cargar, consulta si ya hay quiz hoy
  useEffect(() => {
    fetch("/api/quiz", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.quiz) {
          setQuizData(data.quiz);
          setStep("result");
        } else {
          setStep("start");
        }
      });
  }, []);

  // Guardar quiz al finalizar
  const handleFinish = async () => {
    const mainEmotion = getMainEmotion(answers);
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers, note, mainEmotion }),
    });
    const data = await res.json();
    setQuizData(data.quiz);
    setStep("result");
  };

  if (step === "loading")
    return <div className="text-center py-20">Cargando...</div>;
  if (step === "start") return <QuizStart onStart={() => setStep(1)} />;
  if (step === "note")
    return (
      <QuizNote
        note={note}
        setNote={setNote}
        onNext={handleFinish}
        onBack={() => setStep(questions.length)}
      />
    );
  if (step === "result" && quizData)
    return <QuizResult answers={quizData.answers} note={quizData.note} />;

  // Preguntas
  const questionIndex = typeof step === "number" ? step - 1 : 0;
  return (
    <QuizQuestion
      question={questions[questionIndex]}
      step={step as number}
      total={questions.length}
      value={answers[questionIndex]}
      onSelect={(val) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = val;
        setAnswers(newAnswers);
      }}
      onNext={() => {
        if ((step as number) < questions.length) {
          setStep((step as number) + 1);
        } else {
          setStep("note");
        }
      }}
      onBack={() => {
        if ((step as number) > 1) setStep((step as number) - 1);
        else setStep("start");
      }}
    />
  );
}
