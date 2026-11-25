import { Clock, MonitorCheck, WifiOff } from "lucide-react";

export default function DeviceStatusBar({
  lastUpdate,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div
          className={`grid h-11 w-11 place-items-center rounded-2xl ${
            "bg-amber-50 text-amber-700"
          }`}
        >
          <WifiOff size={22} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Data Source
          </p>
          <h3 className="text-base font-black text-slate-950">
            Synthetic sample
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-600">
          <MonitorCheck size={22} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Interface Preview
          </p>
          <h3 className="text-base font-black text-slate-950">
            Public demonstration
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-600">
            <Clock size={22} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Sample Timestamp
            </p>
            <h3 className="text-base font-black text-slate-950">
              {lastUpdate ? lastUpdate.toLocaleTimeString("en-GB") : "-"}
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}
