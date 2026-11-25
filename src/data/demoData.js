// Illustrative sample readings for a public research demonstration.
// These values are synthetic and must not be presented as field measurements.
const anchor = Date.parse("2026-11-24T12:00:00+07:00");

export const demoHistory = Array.from({ length: 48 }, (_, index) => {
  const sequence = 47 - index;
  const incident = sequence >= 29 && sequence <= 32;
  return {
    id: sequence + 1,
    co2: incident ? 1040 + (sequence - 29) * 18 : Math.round(610 + 87 * Math.sin(sequence / 4) + sequence * 2),
    dust: incident ? 155 + (sequence - 29) * 5 : Math.round(35 + 15 * Math.sin(sequence / 5 + 1) + sequence * 0.4),
    anemometer: Number((2.1 + 0.7 * Math.sin(sequence / 6)).toFixed(1)),
    fan: incident ? 1 : 0,
    run_sirine: incident ? 1 : 0,
    device_status: "online",
    location: { name: "Faculty of Computer Science, Universitas Sriwijaya", lat: -3.2184, lng: 104.6487 },
    created_at: new Date(anchor - index * 15 * 60 * 1000).toISOString(),
  };
});

export const demoLatest = { ...demoHistory[0], hmi_live: "Monitoring" };

export const demoAlarms = [{
  id: 1,
  title: "Illustrative air quality alert",
  message: "Example event: CO₂ and PM2.5 readings exceeded the configured limits.",
  co2: 1094,
  dust: 170,
  anemometer: 2.3,
  run_sirine: 1,
  created_at: demoHistory[15].created_at,
}];

export const demoThresholds = { co2: 1000, dust: 150, anemometer: 10 };
