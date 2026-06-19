"use client";

import { whyStats } from "@/lib/whyStats";
import TileShell from "@/components/why/TileShell";
import GaugeRing from "@/components/why/GaugeRing";
import CountUp from "@/components/why/CountUp";
import { ToothIcon } from "@/components/icons/PillarIcons";

const data = whyStats.caries;

// Viz : jauge circulaire semi-transparente + chiffre count-up translucide par-dessus.
function Viz({ active }: { active: boolean }) {
  const v = data.valeur ?? 0;
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="opacity-40">
        <GaugeRing value={v} active={active} size={80} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <CountUp
          to={v}
          suffix="%"
          active={active}
          className="text-base font-extrabold text-marine/80"
        />
      </div>
    </div>
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
