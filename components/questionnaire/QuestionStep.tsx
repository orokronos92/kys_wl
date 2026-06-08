"use client";

import AnswerButton from "./AnswerButton";
import type { Question } from "@/lib/questions";

interface QuestionStepProps {
  question: Question;
  index: number;
  total: number;
  selected?: string;
  onAnswer: (code: string) => void;
}

// Une question + ses réponses. Pas de clavier : choix au pouce uniquement.
export default function QuestionStep({
  question,
  index,
  total,
  selected,
  onAnswer,
}: QuestionStepProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-azur">
        Question {index + 1} / {total}
      </p>
      <h2 className="mt-3 text-xl font-bold leading-snug text-marine sm:text-2xl">
        {question.title}
      </h2>

      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option) => (
          <AnswerButton
            key={option.code}
            label={option.label}
            selected={selected === option.code}
            onSelect={() => onAnswer(option.code)}
          />
        ))}
      </div>
    </div>
  );
}
