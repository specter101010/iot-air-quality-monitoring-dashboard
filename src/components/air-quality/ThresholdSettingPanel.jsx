import { RotateCcw, Save, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const defaultThresholds = {
  co2: 1000,
  dust: 150,
  anemometer: 10,
};

export default function ThresholdSettingPanel({ thresholds, onSave }) {
  const [form, setForm] = useState(thresholds || defaultThresholds);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const handleReset = () => {
    setForm(defaultThresholds);
    onSave(defaultThresholds);
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-600">
          <SlidersHorizontal size={22} />
        </div>

        <div>
          <p className="text-sm font-bold text-teal-600">
            Threshold Configuration
          </p>
          <h2 className="text-xl font-black text-slate-950">
            Sensor Safety Limits
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <ThresholdInput
          label="CO₂ Limit"
          description="Maximum estimated airborne CO₂ concentration"
          value={form.co2}
          unit="ppm"
          min={0}
          max={5000}
          onChange={(value) => handleChange("co2", value)}
        />

        <ThresholdInput
          label="PM2.5 Limit"
          description="Maximum fine particulate concentration"
          value={form.dust}
          unit="µg/m³"
          min={0}
          max={1000}
          onChange={(value) => handleChange("dust", value)}
        />

        <ThresholdInput
          label="Air Velocity Limit"
          description="Maximum velocity measured by the anemometer"
          value={form.anemometer}
          unit="m/s"
          min={0}
          max={50}
          step={0.1}
          onChange={(value) => handleChange("anemometer", value)}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 active:scale-95"
        >
          <RotateCcw size={17} />
          Restore defaults
        </button>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white transition hover:scale-[1.02] active:scale-95"
          style={{ backgroundColor: "lightseagreen" }}
        >
          <Save size={17} />
          Save thresholds
        </button>
      </div>
    </div>
  );
}

function ThresholdInput({
  label,
  description,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
}) {
  const percentage = Math.min((Number(value) / Number(max)) * 100, 100);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-800">{label}</h3>
          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-black text-teal-600">{value}</p>
          <p className="text-xs font-bold text-slate-400">{unit}</p>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-teal-600"
      />

      <div className="mt-3 flex items-center gap-3">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />

        <span className="min-w-fit rounded-xl bg-white px-3 py-2 text-xs font-black text-slate-500">
          {unit}
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-teal-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
