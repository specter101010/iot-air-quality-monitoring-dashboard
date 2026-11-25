import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function ThresholdSummary({ latest, thresholds, condition }) {
  const isSafe = condition.label === "Safe";

  const items = [
    {
      label: "CO₂",
      value: Number(latest.co2 || 0),
      unit: "ppm",
      threshold: thresholds.co2,
    },
    {
      label: "PM2.5",
      value: Number(latest.dust || 0),
      unit: "µg/m³",
      threshold: thresholds.dust,
    },
    {
      label: "Air velocity",
      value: Number(latest.anemometer || 0),
      unit: "m/s",
      threshold: thresholds.anemometer,
    },
  ];

  return (
    <div className={`flex h-full min-h-[420px] flex-col rounded-3xl border p-5 shadow-sm ${condition.bg}`}>
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white">
          {isSafe ? (
            <ShieldCheck className="text-teal-600" size={24} />
          ) : (
            <ShieldAlert className="text-red-600" size={24} />
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-500">
            Environmental Condition
          </p>
          <h2 className={`text-2xl font-black ${condition.color}`}>
            {condition.label}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {condition.desc}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const percent = Math.min((item.value / item.threshold) * 100, 100);
          const danger = item.value > item.threshold;

          return (
            <div key={item.label} className="rounded-2xl bg-white p-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-black text-slate-700">{item.label}</span>
                <span
                  className={`font-black ${
                    danger ? "text-red-600" : "text-teal-600"
                  }`}
                >
                  {item.value} {item.unit}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    danger ? "bg-red-500" : "bg-teal-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-2 text-xs font-semibold text-slate-400">
                Threshold: {item.threshold} {item.unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
