import {
    Activity,
    BarChart3,
    Bell,
    FileText,
    MapPin,
    Table
  } from "lucide-react";
  
  const navItems = [
    {
      label: "Overview",
      href: "#overview",
      icon: Activity,
    },
    {
      label: "Analytics",
      href: "#grafik",
      icon: BarChart3,
    },
    {
      label: "Alerts",
      href: "#alarm",
      icon: Bell,
    },
    {
      label: "Dataset",
      href: "#tabel",
      icon: Table,
    },
    {
      label: "Location",
      href: "#lokasi",
      icon: MapPin,
    },
    {
      label: "Report",
      href: "#laporan",
      icon: FileText,
    },
  ];

  export default function DashboardNavbar() {
    return (
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 px-4 py-3 backdrop-blur-xl md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <a
                key={item.href}
                href={item.href}
                className="group inline-flex min-w-fit items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
              >
                <Icon size={17} className="transition group-hover:scale-110" />
                {item.label}
              </a>
            );
          })}

          <span className="ml-auto min-w-fit rounded-full bg-amber-50 px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-amber-800">Demo Data</span>
        </div>
      </nav>
    );
  }
