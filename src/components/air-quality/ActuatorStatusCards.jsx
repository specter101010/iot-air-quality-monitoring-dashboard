import { Fan, BellRing } from "lucide-react";
import { motion } from "framer-motion";

export default function ActuatorStatusCards({ fan = 0, runSirine = 0 }) {
  const fanOn = Number(fan) === 1;
  const sirineOn = Number(runSirine) === 1;

  return (
    <>
      <ActuatorCard
        title="Ventilation Fan"
        subtitle="Automated exhaust system"
        status={fanOn ? "ON" : "OFF"}
        description={fanOn ? "Fan operating" : "Fan inactive"}
        active={fanOn}
        type="fan"
        icon={Fan}
      />

      <ActuatorCard
        title="Warning Siren"
        subtitle="Audible alert system"
        status={sirineOn ? "ON" : "OFF"}
        description={sirineOn ? "Alert active" : "Normal state"}
        active={sirineOn}
        type="sirine"
        icon={BellRing}
        danger
      />
    </>
  );
}

function ActuatorCard({
  title,
  subtitle,
  status,
  description,
  active,
  type,
  icon: Icon,
  danger = false,
}) {
  return (
    <div
    className={`group flex h-full min-h-[255px] flex-col justify-between rounded-3xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 ${
      active && danger
        ? "border-red-200"
        : active
        ? "border-teal-200"
        : "border-slate-200"
    }`}
  >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{subtitle}</p>
          <h3 className="mt-1 text-xl font-black text-slate-950">{title}</h3>
        </div>

        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl ${
            active && danger
              ? "bg-red-50 text-red-600"
              : active
              ? "bg-teal-50 text-teal-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {type === "fan" ? (
            <motion.div
              animate={active ? { rotate: 360 } : { rotate: 0 }}
              transition={
                active
                  ? {
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }
                  : { duration: 0.2 }
              }
            >
              <Icon size={28} />
            </motion.div>
          ) : (
            <motion.div
              animate={
                active
                  ? {
                      rotate: [-10, 10, -8, 8, 0],
                      scale: [1, 1.1, 1],
                    }
                  : { rotate: 0, scale: 1 }
              }
              transition={
                active
                  ? {
                      repeat: Infinity,
                      duration: 0.55,
                      ease: "easeInOut",
                    }
                  : { duration: 0.2 }
              }
            >
              <Icon size={28} />
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-end gap-3">
      <p
  className={`text-5xl font-black tracking-tight ${
    active && danger
      ? "text-red-600"
      : active
      ? "text-teal-600"
      : "text-slate-950"
  }`}
>
          {status}
        </p>

        <span
          className={`mb-3 text-sm font-black ${
            active && danger
              ? "text-red-500"
              : active
              ? "text-teal-600"
              : "text-slate-400"
          }`}
        >
          {description}
        </span>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            active && danger
              ? "bg-red-500"
              : active
              ? "bg-teal-500"
              : "bg-slate-300"
          }`}
          style={{ width: active ? "100%" : "15%" }}
        />
      </div>
    </div>
  );
}
