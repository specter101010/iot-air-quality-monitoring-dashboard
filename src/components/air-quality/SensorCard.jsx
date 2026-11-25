import { Activity } from "lucide-react";

export default function SensorCard({
  title,
  subtitle,
  value,
  unit,
  icon: Icon,
  threshold,
  customStatus,
}) {
  const numericValue = Number(value);
  const isNumberValue = !Number.isNaN(numericValue);

  const isDanger =
    customStatus === "danger" ||
    (threshold !== undefined && isNumberValue && numericValue > threshold);

  const SafeIcon = typeof Icon === "function" ? Icon : Activity;

  return (
<div
  className={`group flex h-full min-h-[255px] flex-col justify-between rounded-3xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 ${
    isDanger ? "border-red-200" : "border-slate-200"
  }`}
>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{subtitle}</p>
          <h3 className="mt-1 text-xl font-black text-slate-950">{title}</h3>
        </div>

        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            isDanger ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-600"
          }`}
        >
          <SafeIcon size={24} />
        </div>
      </div>

      <div className="mt-7 flex items-end gap-2">
        <p
          className={`text-4xl xl:text-5xl font-black tracking-tight ${
            isDanger ? "text-red-600" : "text-slate-950"
          }`}
        >
          {isNumberValue ? numericValue : value}
        </p>

        <span className="mb-2 text-sm font-bold text-slate-400">{unit}</span>
      </div>

      {threshold !== undefined && isNumberValue && (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Safety threshold</span>
            <span>{threshold}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${
                isDanger ? "bg-red-500" : "bg-teal-500"
              }`}
              style={{
                width: `${Math.min((numericValue / threshold) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
