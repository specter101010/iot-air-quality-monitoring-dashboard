import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
  export default function SensorChart({ data = [] }) {
    const chartData = [...data]
      .reverse()
      .map((item) => ({
        time: item.created_at
          ? new Date(item.created_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
        co2: Number(item.co2 || 0),
        dust: Number(item.dust || 0),
        anemometer: Number(item.anemometer || 0),
      }));
  
    return (
<div className="flex h-full min-h-[420px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-teal-600">Sensor Analytics</p>
            <h2 className="text-xl font-black text-slate-950">
              Sample Measurement Trends
            </h2>
          </div>
  
          <p className="text-sm text-slate-500">
            CO₂, PM2.5, and air velocity measurements.
          </p>
        </div>
  
        <div className="min-h-[320px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="co2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="lightseagreen" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="lightseagreen" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dust" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wind" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
  
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
  
              <Area
                type="monotone"
                dataKey="co2"
                name="CO₂"
                stroke="lightseagreen"
                fill="url(#co2)"
                strokeWidth={3}
              />
  
              <Area
                type="monotone"
                dataKey="dust"
                name="PM2.5"
                stroke="#f97316"
                fill="url(#dust)"
                strokeWidth={3}
              />
  
              <Area
                type="monotone"
                dataKey="anemometer"
                name="Air velocity"
                stroke="#6366f1"
                fill="url(#wind)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
