# IoT Air Quality Monitoring Dashboard

A public, frontend-only demonstration of an IoT air quality monitoring interface. The dashboard visualizes CO₂, PM2.5, and air velocity alongside ventilation fan status, warning events, configurable thresholds, sensor history, a location map, and an exportable report.

> **Research demo:** All displayed readings, timestamps, and alerts are synthetic examples. They are not measurements collected from deployed sensors and must not be interpreted as experimental results. This repository demonstrates the user interface, not a live monitoring installation.

## Features

- Responsive dashboard with sensor cards, trend charts, and a measurement table.
- Sample warning history and actuator status indicators.
- Adjustable safety thresholds for exploring the interface. Changes last until the page is reloaded.
- Location map using OpenStreetMap tiles.
- Printable dashboard and Excel export of the sample data. The export identifies the dataset as synthetic.
- Public access without login, API credentials, MQTT connection, or backend server.

## Technology

React, Vite, Tailwind CSS, Recharts, React Leaflet, and SheetJS (`xlsx`).

## Getting started

Install Node.js and npm, then run the following commands from the directory containing `package.json`:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To verify the production build:

```bash
npm run lint
npm run build
npm run preview
```

## Deploying the frontend

Build command: `npm run build`  
Publish directory: `dist`  
Environment variables: none

Deploy `dist/` to a static hosting service. If you upload the `frontend` folder as the repository root, use the settings above directly. If the repository root contains a `frontend/` subfolder, set the host's root directory to `frontend`.

## Demo dataset and interpretation

The deterministic example readings and sample alert are defined in [`src/data/demoData.js`](src/data/demoData.js). The example contains 48 readings spaced 15 minutes apart. The threshold controls affect the visual interpretation in the current browser session; they do not rewrite the dataset or represent device calibration. OpenStreetMap tiles require an internet connection.

For a journal article or project report, identify screenshots from this version as an *interface demonstration using synthetic data*. Use separately documented field measurements for any claims about sensor accuracy or system performance.
