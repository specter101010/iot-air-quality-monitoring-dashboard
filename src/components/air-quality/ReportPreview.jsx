import { FileSpreadsheet, FileText, Printer } from "lucide-react";
import * as XLSX from "xlsx";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("en-GB") : "-";

export default function ReportPreview({ latest, history = [], alarms = [], maxCo2, maxDust, condition, thresholds }) {
  const periodStart = history.length ? formatDate(history[history.length - 1].created_at) : "-";
  const periodEnd = history.length ? formatDate(history[0].created_at) : "-";
  const conclusion = condition.label === "Safe"
    ? "The latest observations indicate that all monitored air-quality parameters remain within the configured safety limits."
    : "One or more air-quality parameters exceed the configured limits. Continued observation and appropriate ventilation action are recommended.";

  const handleExportExcel = () => {
    const co2Values = history.map((item) => Number(item.co2 || 0));
    const dustValues = history.map((item) => Number(item.dust || 0));
    const windValues = history.map((item) => Number(item.anemometer || 0));
    const average = (values) => values.length
      ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
      : 0;
    const minimum = (values) => (values.length ? Math.min(...values) : 0);
    const maximum = (values) => (values.length ? Math.max(...values) : 0);
    const safeCount = history.filter((item) =>
      Number(item.co2 || 0) <= Number(thresholds?.co2 || 1000) &&
      Number(item.dust || 0) <= Number(thresholds?.dust || 150) &&
      Number(item.anemometer || 0) <= Number(thresholds?.anemometer || 10) &&
      Number(item.run_sirine) !== 1
    ).length;

    const sensorRows = history.map((item, index) => ({
      No: index + 1,
      Timestamp: formatDate(item.created_at),
      "CO₂ (ppm)": Number(item.co2 || 0),
      "PM2.5 (µg/m³)": Number(item.dust || 0),
      "Air Velocity (m/s)": Number(item.anemometer || 0),
      "Fan Status": Number(item.fan) === 1 ? "Operating" : "Inactive",
      "Siren Status": Number(item.run_sirine) === 1 ? "Active" : "Normal",
      "Device Status": item.device_status || latest.device_status || "-",
      Location: item.location?.name || latest.location?.name || "FASILKOM UNSRI",
      Latitude: item.location?.lat || latest.location?.lat || "-",
      Longitude: item.location?.lng || latest.location?.lng || "-",
    }));
    const alertRows = alarms.map((alarm, index) => ({
      No: index + 1,
      Title: alarm.title || "Air quality alert",
      Message: alarm.message || "A sensor reading exceeded its safety threshold.",
      "CO₂ at Alert": Number(alarm.co2 || 0),
      "PM2.5 at Alert": Number(alarm.dust || 0),
      "Air Velocity at Alert": Number(alarm.anemometer || 0),
      "Siren Status": Number(alarm.run_sirine) === 1 ? "Active" : "Normal",
      Timestamp: formatDate(alarm.created_at),
    }));
    const summaryRows = [{
      "Report Title": "IoT Air Quality Monitoring Sample Report",
      "Data Provenance": "Synthetic sample data; not field measurements",
      "Monitoring Period": `${periodStart} – ${periodEnd}`,
      "Device Location": latest.location?.name || "FASILKOM UNSRI",
      Latitude: latest.location?.lat || "-",
      Longitude: latest.location?.lng || "-",
      "Total Sensor Records": history.length,
      "Total Alert Events": alarms.length,
      "Records Within Limits": safeCount,
      "Records Exceeding Limits": history.length - safeCount,
      "Data Source": "Synthetic sample",
      "Current Environmental Condition": condition?.label || "-",
      "Automated Interpretation": conclusion,
      "Exported At": new Date().toLocaleString("en-GB"),
    }];
    const statisticRows = [
      ["CO₂", "ppm", co2Values, thresholds?.co2 || 1000, Number(latest.co2 || 0)],
      ["PM2.5", "µg/m³", dustValues, thresholds?.dust || 150, Number(latest.dust || 0)],
      ["Air Velocity", "m/s", windValues, thresholds?.anemometer || 10, Number(latest.anemometer || 0)],
    ].map(([parameter, unit, values, threshold, current]) => ({
      Parameter: parameter,
      Unit: unit,
      Minimum: minimum(values),
      Maximum: maximum(values),
      Average: average(values),
      "Safety Threshold": threshold,
      Status: current > threshold ? "Above Limit" : "Within Limit",
    }));
    const thresholdRows = [
      { Parameter: "CO₂", "Safety Threshold": thresholds?.co2 || 1000, Unit: "ppm" },
      { Parameter: "PM2.5", "Safety Threshold": thresholds?.dust || 150, Unit: "µg/m³" },
      { Parameter: "Air Velocity", "Safety Threshold": thresholds?.anemometer || 10, Unit: "m/s" },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), "Summary");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(statisticRows), "Sensor Statistics");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(sensorRows), "Sensor Dataset");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(alertRows), "Alert History");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(thresholdRows), "Safety Thresholds");
    XLSX.writeFile(workbook, `air-quality-monitoring-report-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="flex h-full min-h-[430px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-600"><FileText size={24} /></div>
          <div>
            <p className="text-sm font-bold text-teal-600">Sample Research Report</p>
            <h2 className="text-xl font-black text-slate-950">Air Quality Monitoring Summary</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={handleExportExcel} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-black text-teal-700 transition hover:bg-teal-100 active:scale-95"><FileSpreadsheet size={18} /> Export dataset</button>
          <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-teal-700 active:scale-95"><Printer size={18} /> Print report</button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReportInfo title="Monitoring Period" value={`${periodStart} – ${periodEnd}`} />
        <ReportInfo title="Device Location" value={latest.location?.name || "FASILKOM UNSRI"} />
        <ReportInfo title="Sample Alerts" value={`${alarms.length} incidents`} />
        <ReportInfo title="Current Condition" value={condition.label} accent />
        <ReportInfo title="Maximum CO₂" value={`${maxCo2} ppm`} />
        <ReportInfo title="Maximum PM2.5" value={`${maxDust} µg/m³`} />
        <ReportInfo title="Warning Siren" value={Number(latest.run_sirine) === 1 ? "Active" : "Normal"} />
        <ReportInfo title="Ventilation Fan" value={Number(latest.fan) === 1 ? "Operating" : "Inactive"} />
      </div>
      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-black text-slate-700">Automated Interpretation</h3>
        <p className="text-sm leading-6 text-slate-600">{conclusion}</p>
      </div>
    </div>
  );
}

function ReportInfo({ title, value, accent = false }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      <h3 className={`mt-2 text-sm font-bold ${accent ? "text-teal-700" : "text-slate-800"}`}>{value}</h3>
    </div>
  );
}
