"use client";

import { whyStats } from "@/lib/whyStats";
import TileShell from "@/components/why/TileShell";
import GaugeRing from "@/components/why/GaugeRing";
import CountUp from "@/components/why/CountUp";
import { ToothIcon } from "@/components/icons/PillarIcons";

const data = whyStats.caries;

// Viz : jauge circulaire + chiffre en count-up.
function Viz({ active }: { active: boolean }) {
  const v = data.valeur ?? 0;
  return (
    <GaugeRing value={v} active={active}>
      <CountUp
        to={v}
        suffix="%"
        active={active}
        className="text-xl font-extrabold text-marine"
      />
    </GaugeRing>
  );
}

export default function CarteCaries({ index = 0 }: { index?: number }) {
  return (
    <TileShell
      data={data}
      index={index}
      period={4200}
      phase={0}
      icon={<ToothIcon className="h-5 w-5" />}
      renderViz={(tick, active) => <Viz key={tick} active={active} />}
    />
  );
}
