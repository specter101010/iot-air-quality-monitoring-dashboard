import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  Activity,
  Bell,
  Gauge,
  Wind,SlidersHorizontal  
} from "lucide-react";
import { motion } from "framer-motion";

import { demoAlarms, demoHistory, demoLatest, demoThresholds } from "../../data/demoData";
import logo from "../../assets/logo.png";


import SensorCard from "./SensorCard";
import DeviceStatusBar from "./DeviceStatusBar";
import SensorChart from "./SensorChart";
import SensorTable from "./SensorTable";
import LocationMapCard from "./LocationMapCard";
import AlarmPanel from "./AlarmPanel";
import ThresholdSummary from "./ThresholdSummary";
import ReportPreview from "./ReportPreview";
import ActuatorStatusCards from "./ActuatorStatusCards";
import ThresholdSettingModal from "./ThresholdSettingModal";
import DashboardNavbar from "./DashboardNavbar";

export default function AirQualityDashboard() {
  const latest = demoLatest;
  const history = demoHistory;
  const alarms = demoAlarms;
  const [alarmMuted, setAlarmMuted] = useState(false);

  const [thresholdModalOpen, setThresholdModalOpen] = useState(false);
  const [thresholds, setThresholds] = useState(demoThresholds);

  const sensorCondition = useMemo(() => {
    const co2High = Number(latest.co2) > thresholds.co2;
    const dustHigh = Number(latest.dust) > thresholds.dust;
    const windHigh = Number(latest.anemometer) > thresholds.anemometer;

    if (co2High || dustHigh || windHigh || Number(latest.run_sirine) === 1) {
      return {
        label: "Attention Required",
        desc: "One or more sensor readings exceed the configured safety limits.",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
      };
    }

    return {
      label: "Safe",
      desc: "All monitored environmental parameters are within normal limits.",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
    };
}, [latest, thresholds]);

  const handleSaveThresholds = (payload) => {
    setThresholds(payload);
    setThresholdModalOpen(false);
  };

  const maxCo2 = Math.max(0, ...history.map((item) => Number(item.co2 || 0)));
  const maxDust = Math.max(0, ...history.map((item) => Number(item.dust || 0)));



  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <Toaster position="top-right" />

      <DashboardNavbar />

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <motion.div
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
  className="relative mb-6 grid grid-cols-1 gap-6 overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-6 text-white shadow-2xl shadow-slate-300/60 lg:grid-cols-[1fr_auto] lg:p-8"
>
<div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
<div className="flex flex-col justify-center">
  <div className="mb-4 flex items-center gap-4">
    <img
      src={logo}
      alt="Air Quality Monitoring"
      className="h-14 w-auto rounded-2xl bg-white p-2 object-contain md:h-16"
    />

    <div className="hidden h-10 w-px bg-white/20 md:block" />

    <div className="hidden md:block">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
        IoT Environmental Monitoring
      </p>
      <p className="mt-1 text-sm font-medium text-slate-300">
        Public research demonstration · Synthetic dataset
      </p>
    </div>
  </div>

  <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
    Air Quality Monitoring Dashboard
  </h1>

  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
    Explore an illustrative IoT air quality dashboard with sensor trends,
    configurable thresholds, and exportable sample measurements.
  </p>
</div>

  <div className="flex items-start gap-3 lg:items-center">
    <button
      onClick={() => setAlarmMuted((prev) => !prev)}
      className={`inline-flex min-w-[145px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02] active:scale-95 ${
        alarmMuted
          ? "bg-slate-900 hover:bg-slate-800"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      <Bell size={17} />
      {alarmMuted ? "Show alerts" : "Hide alerts"}
    </button>

    <button
      onClick={() => setThresholdModalOpen(true)}
    className="inline-flex min-w-[155px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-sm transition hover:scale-[1.02] hover:bg-white/15 active:scale-95"
    >
      <SlidersHorizontal size={17} />
      Safety limits
    </button>
  </div>
</motion.div>
<DeviceStatusBar
  lastUpdate={new Date(latest.created_at)}
/>

<div
  id="overview"
  className="mt-5 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5"
>
  <SensorCard
    title="CO₂"
    subtitle="Estimated gas concentration"
    value={Number(latest.co2 || 0)}
    unit="ppm"
    icon={Gauge}
    threshold={thresholds.co2}
  />

  <SensorCard
    title="PM2.5"
    subtitle="Fine particulate concentration"
    value={Number(latest.dust || 0)}
    unit="µg/m³"
    icon={Activity}
    threshold={thresholds.dust}
  />

  <SensorCard
    title="Air Velocity"
    subtitle="Anemometer measurement"
    value={Number(latest.anemometer || 0)}
    unit="m/s"
    icon={Wind}
    threshold={thresholds.anemometer}
  />

  <ActuatorStatusCards
    fan={Number(latest.fan)}
    runSirine={Number(latest.run_sirine)}
  />
</div>

<div
  id="grafik"
  className="mt-5 scroll-mt-28 grid auto-rows-fr grid-cols-1 gap-5 xl:grid-cols-3"
>
  <div className="h-full xl:col-span-2">
    <SensorChart data={history} />
  </div>

  <div className="h-full">
    <ThresholdSummary
      latest={latest}
      thresholds={thresholds}
      condition={sensorCondition}
    />
  </div>
</div>

<div
  id="alarm"
  className="mt-5 scroll-mt-28 grid auto-rows-fr grid-cols-1 gap-5 xl:grid-cols-3"
>
  <div className="h-[750px]  xl:col-span-1">
    <AlarmPanel
      alarms={alarmMuted ? [] : alarms}
      runSirine={Number(latest.run_sirine)}
      fan={Number(latest.fan)}
      alarmMuted={alarmMuted}
      onToggleMute={() => setAlarmMuted((prev) => !prev)}
    />
  </div>

  <div id="tabel" className="h-[750px] scroll-mt-28 xl:col-span-2">
    <SensorTable data={history} />
  </div>
</div>

<div className="mt-5 grid auto-rows-fr grid-cols-1 gap-5 xl:grid-cols-3">
  <div id="lokasi" className="h-full scroll-mt-28 xl:col-span-1">
    <LocationMapCard location={latest.location} />
  </div>

  <div id="laporan" className="h-full scroll-mt-28 xl:col-span-2">
  <ReportPreview
  latest={latest}
  history={history}
  alarms={alarms}
  maxCo2={maxCo2}
  maxDust={maxDust}
  condition={sensorCondition}
  thresholds={thresholds}
/>
  </div>
</div>

      </section>

      <ThresholdSettingModal
  open={thresholdModalOpen}
  thresholds={thresholds}
  saving={false}
  onClose={() => setThresholdModalOpen(false)}
  onSave={handleSaveThresholds}
/>
    </main>
  );
}
