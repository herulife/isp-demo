import { Wifi, ChartLine } from "lucide-react";

const devices = [
  { name: "Gateway 1 (MikroTik CCR)", status: "green", info: "9ms · 2.1 Gbps" },
  { name: "Switch Distribution 2", status: "green", info: "48 port aktif" },
  { name: "OLT Alcatel (link backup)", status: "yellow", info: "packet loss 2%" },
  { name: "CPE Pelanggan (5 offline)", status: "red", info: "butuh perhatian" },
];

const infoColor: Record<string, string> = {
  green: "text-muted-foreground",
  yellow: "text-muted-foreground",
  red: "text-destructive",
};

export default function NetworkHealth() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-md font-semibold text-foreground flex items-center gap-2 mb-3">
        <Wifi className="w-4 h-4 text-primary" /> Kesehatan Jaringan
      </h3>
      <div className="space-y-3">
        {devices.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center text-foreground">
              <span className={`status-dot dot-${d.status}`} />
              {d.name}
            </span>
            <span className={`text-xs ${infoColor[d.status]}`}>{d.info}</span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>BW core 1 (40% / 10 Gbps)</span><span>4.1 Gbps</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: "41%" }} /></div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>BW pengguna (rata-rata)</span><span>2.3 Gbps</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: "57%" }} /></div>
      </div>

      <div className="mt-5 text-center text-xs bg-primary/10 p-2 rounded-xl text-primary border border-primary/20">
        <ChartLine className="w-3 h-3 inline mr-1" /> 1 Gbps tambahan siap aktifasi
      </div>
    </div>
  );
}

