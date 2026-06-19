"use client";

import { whyStats } from "@/lib/whyStats";
import CardShell from "@/components/why/CardShell";
import GaugeRing from "@/components/why/GaugeRing";
import CountUp from "@/components/why/CountUp";
import { ToothIcon } from "@/components/icons/PillarIcons";

const data = whyStats.caries;

// Carte 1 — viz : jauge circulaire qui se remplit + chiffre en count-up.
export default function CarteCaries({ index = 0 }: { index?: number }) {
  return (
    <CardShell index={index}>
      <header className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ciel text-azur ring-1 ring-inset ring-ciel-deep">
          <ToothIcon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-bold leading-tight text-marine">{data.titre}</h3>
          <p className="text-sm font-medium text-azur">{data.soustitre}</p>
        </div>
      </header>

      <div className="mt-5 flex items-center gap-4">
        <GaugeRing value={data.valeur ?? 0}>
          <CountUp
            to={data.valeur ?? 0}
            suffix="%"
            className="text-2xl font-extrabold text-marine"
          />
        </GaugeRing>
        <p className="text-sm leading-relaxed text-marine/70">{data.accroche}</p>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-azur">
        Pourquoi agir tôt
      </p>
      <p className="mt-2 text-sm leading-relaxed text-marine/80">
        {data.pourquoi}
      </p>

      <ul className="mt-3 space-y-2">
        {data.points.map((pt) => (
          <li key={pt} className="flex gap-2 text-sm text-marine/80">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azur"
              aria-hidden
            />
            {pt}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-4 text-xs text-marine/45">{data.source}</p>
    </CardShell>
  );
}
