"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import QuestionStep from "./QuestionStep";
import { ToothIcon } from "@/components/icons/PillarIcons";
import { useWaitlist } from "@/components/WaitlistProvider";
import { questions } from "@/lib/questions";

const TOTAL = questions.length;

// Orchestre le questionnaire : une question à la fois, progression, transitions.
// À la fin, renvoie vers la section d'inscription (flux PRD §6).
export default function QuestionnaireFlow() {
  const { answers, setAnswer } = useWaitlist();
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const done = index >= TOTAL;
  const completed = questions.filter((q) => answers[q.id]).length;
  const progress = done ? 1 : completed / TOTAL;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleAnswer(code: string) {
    const question = questions[index];
    setAnswer(question.id, code);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setIndex((i) => i + 1), 280);
  }

  function goToInscription() {
    document
      .getElementById("inscription")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  return (
    <div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-marine/10"
        role="progressbar"
        aria-label="Progression du questionnaire"
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-valuenow={done ? TOTAL : completed}
      >
        <motion.div
          className="h-full rounded-full bg-azur"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="relative mt-8 min-h-[24rem] sm:min-h-[22rem]">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              {...slide}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-azur shadow-lg shadow-azur/15 ring-1 ring-inset ring-ciel-deep">
                <ToothIcon className="h-8 w-8" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-marine">
                Merci, c&apos;est noté !
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-marine/70">
                Vos réponses nous aident à construire KYS. Plus qu&apos;une
                étape pour rejoindre la liste d&apos;attente.
              </p>
              <button
                type="button"
                onClick={goToInscription}
                className="mt-8 h-13 rounded-full bg-azur px-8 text-base font-semibold text-white shadow-lg shadow-azur/25 transition-colors hover:bg-azur-soft"
              >
                Finaliser mon inscription
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              {...slide}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuestionStep
                question={questions[index]}
                index={index}
                total={TOTAL}
                selected={answers[questions[index].id]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && index > 0 && (
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="mt-2 text-sm font-medium text-marine/60 transition-colors hover:text-azur"
        >
          ← Précédent
        </button>
      )}
    </div>
  );
}
