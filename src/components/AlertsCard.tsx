import { AlertTriangle } from "lucide-react";

const alerts = [
  { text: "Pelanggan 3201 lapor lambat (tiket #1290)", color: "text-warning" },
  { text: "Backup config router otomatis sukses", color: "text-primary" },
  { text: "UPS ruang server perlu penggantian", color: "text-destructive" },
  { text: "Instalasi baru 3 pelanggan hari ini", color: "text-success" },
];

export default function AlertsCard() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-md font-semibold text-foreground flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-warning" /> Notifikasi & Tiket
      </h3>
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${a.color} bg-current`} />
            <span className="text-foreground">{a.text}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-2 bg-muted border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted/80 transition">
        Lihat semua aktivitas
      </button>
    </div>
  );
}

