import { Bell, Fan, Siren } from "lucide-react";

export default function AlarmPanel({ alarms = [], runSirine, fan ,alarmMuted,onToggleMute, }) {
  return (
<div className="flex h-full min-h-[460px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-teal-600">Alerts & Actuators</p>
          <h2 className="text-xl font-black text-slate-950">
            System Alert Status
          </h2>
        </div>

        <Bell
          className={runSirine === 1 ? "text-red-500" : "text-slate-400"}
          size={26}
        />
      </div>

      <button
  onClick={onToggleMute}
  className={`mb-5 w-full rounded-2xl px-4 py-3 text-sm font-black text-white transition active:scale-95 ${
    alarmMuted ? "bg-slate-900 hover:bg-slate-800" : "bg-red-600 hover:bg-red-700"
  }`}
>
  {alarmMuted ? "Show sample alerts" : "Hide sample alerts"}
</button>

      <div className="grid grid-cols-2 gap-3">
        <StatusBox
          icon={Fan}
          title="Ventilation Fan"
          active={fan === 1}
          activeText="Operating"
          inactiveText="Inactive"
        />

        <StatusBox
          icon={Siren}
          title="Warning Siren"
          active={runSirine === 1}
          activeText="Alert Active"
          inactiveText="Normal"
          danger
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
  <div className="mb-3 flex items-center justify-between gap-3">
    <h3 className="text-sm font-black text-slate-700">
      Incident History
    </h3>

    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
      Latest 10 records
    </span>
  </div>

  <div className="max-h-[400px] space-y-3 overflow-y-auto rounded-2xl pr-1">
    {alarms.length === 0 ? (
      <p className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-400">
        {alarmMuted ? "Sample alerts are hidden." : "No sample alert events are available."}
      </p>
    ) : (
      alarms.slice(0, 10).map((alarm, index) => (
        <div
          key={index}
          className="rounded-2xl border border-red-100 bg-red-50 p-3"
        >
          <p className="text-sm font-black text-red-600">
            {alarm.title || "Air quality alert"}
          </p>

          <p className="mt-1 line-clamp-2 text-xs font-medium text-red-500">
            {alarm.message || "A sensor reading exceeded its safety threshold."}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {alarm.created_at
              ? new Date(alarm.created_at).toLocaleString("en-GB")
              : "-"}
          </p>
        </div>
      ))
    )}
  </div>
</div>
    </div>
  );
}

function StatusBox({
  icon: Icon,
  title,
  active,
  activeText,
  inactiveText,
  danger,
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? danger
            ? "border-red-200 bg-red-50"
            : "border-teal-200 bg-teal-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <Icon
        size={24}
        className={
          active
            ? danger
              ? "text-red-600"
              : "text-teal-600"
            : "text-slate-400"
        }
      />

      <p className="mt-3 text-sm font-bold text-slate-500">{title}</p>

      <h3
        className={`text-base font-black ${
          active
            ? danger
              ? "text-red-600"
              : "text-teal-600"
            : "text-slate-500"
        }`}
      >
        {active ? activeText : inactiveText}
      </h3>
    </div>
  );
}
