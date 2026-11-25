export default function SensorTable({ data = [], limit = 100 }) {
  const displayedData = data.slice(0, limit);
    return (
      <div className="flex h-full min-h-[460px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-teal-600">Sensor Dataset</p>
            <h2 className="text-xl font-black text-slate-950">
              Latest Measurements
            </h2>
          </div>
  
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {displayedData.length} recent records
          </span>
        </div>
  
        <div className="flex-1 overflow-auto rounded-2xl border border-slate-100">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">CO₂</th>
                <th className="px-4 py-3">PM2.5</th>
                <th className="px-4 py-3">Air velocity</th>
                <th className="px-4 py-3">Fan</th>
                <th className="px-4 py-3">Siren</th>
              </tr>
            </thead>
  
            <tbody>
  {displayedData.length === 0 ? (
    <tr>
      <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
        No sensor measurements are available yet.
      </td>
    </tr>
  ) : (
    displayedData.map((item, index) => (
      <tr
        key={index}
        className="border-t border-slate-100 transition hover:bg-slate-50"
      >
        <td className="px-4 py-3 font-semibold text-slate-700">
          {item.created_at
            ? new Date(item.created_at).toLocaleString("en-GB")
            : "-"}
        </td>
        <td className="px-4 py-3">{item.co2 || 0} ppm</td>
        <td className="px-4 py-3">{item.dust || 0} µg/m³</td>
        <td className="px-4 py-3">{item.anemometer || 0} m/s</td>
        <td className="px-4 py-3">
          <Badge active={Number(item.fan) === 1} />
        </td>
        <td className="px-4 py-3">
          <Badge active={Number(item.run_sirine) === 1} danger />
        </td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </div>
    );
  }
  
  function Badge({ active, danger }) {
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-black ${
          active
            ? danger
              ? "bg-red-50 text-red-600"
              : "bg-teal-50 text-teal-600"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {active ? "ON" : "OFF"}
      </span>
    );
  }
