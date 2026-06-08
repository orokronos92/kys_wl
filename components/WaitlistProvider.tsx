"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { QuestionId } from "@/lib/questions";

type Answers = Partial<Record<QuestionId, string>>;

interface WaitlistState {
  email: string;
  setEmail: (email: string) => void;
  answers: Answers;
  setAnswer: (id: QuestionId, code: string) => void;
}

const WaitlistContext = createContext<WaitlistState | null>(null);

// État partagé du parcours d'inscription : email (saisi au Hero) + réponses au
// questionnaire, lus par le formulaire final pour une soumission unique en base.
export default function WaitlistProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = useCallback((id: QuestionId, code: string) => {
    setAnswers((prev) => ({ ...prev, [id]: code }));
  }, []);

  const value = useMemo(
    () => ({ email, setEmail, answers, setAnswer }),
    [email, answers, setAnswer],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist doit être utilisé dans <WaitlistProvider>.");
  }
  return ctx;
}
