import { Wifi, Server, Router, Activity, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const devices = [
  { name: "Gateway 1 (MikroTik CCR)", type: "Router", ip: "10.0.0.1", status: "Online", uptime: "45 hari 12 jam", cpu: 23, ram: 41, ports: "12/12 aktif", latency: "9ms", throughput: "2.1 Gbps" },
  { name: "Gateway 2 (MikroTik RB)", type: "Router", ip: "10.0.0.2", status: "Online", uptime: "30 hari 8 jam", cpu: 15, ram: 35, ports: "8/8 aktif", latency: "12ms", throughput: "1.5 Gbps" },
  { name: "Switch Distribution 1", type: "Switch", ip: "10.0.1.1", status: "Online", uptime: "60 hari", cpu: 10, ram: 22, ports: "48/48 aktif", latency: "2ms", throughput: "4.0 Gbps" },
  { name: "Switch Distribution 2", type: "Switch", ip: "10.0.1.2", status: "Online", uptime: "60 hari", cpu: 12, ram: 25, ports: "48/48 aktif", latency: "3ms", throughput: "3.8 Gbps" },
  { name: "OLT Alcatel (Utama)", type: "OLT", ip: "10.0.2.1", status: "Online", uptime: "90 hari", cpu: 45, ram: 60, ports: "128/160 aktif", latency: "5ms", throughput: "8.2 Gbps" },
  { name: "OLT Alcatel (Backup)", type: "OLT", ip: "10.0.2.2", status: "Warning", uptime: "90 hari", cpu: 30, ram: 48, ports: "64/80 aktif", latency: "15ms", throughput: "2.0 Gbps" },
  { name: "AP Outdoor Sector A", type: "AP", ip: "10.0.3.1", status: "Online", uptime: "15 hari", cpu: 20, ram: 30, ports: "2/2 aktif", latency: "8ms", throughput: "500 Mbps" },
  { name: "AP Outdoor Sector B", type: "AP", ip: "10.0.3.2", status: "Offline", uptime: "-", cpu: 0, ram: 0, ports: "0/2", latency: "-", throughput: "-" },
];

const statusColor: Record<string, string> = {
  Online: "dot-green",
  Warning: "dot-yellow",
  Offline: "dot-red",
};

const statusText: Record<string, string> = {
  Online: "text-success",
  Warning: "text-warning",
  Offline: "text-destructive",
};

const typeIcon: Record<string, React.ElementType> = {
  Router: Router,
  Switch: Server,
  OLT: Activity,
  AP: Wifi,
};

export default function JaringanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Jaringan</h2>
          <p className="text-sm text-muted-foreground">Monitoring perangkat dan infrastruktur jaringan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
          <RefreshCw className="w-4 h-4" /> Refresh Status
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Perangkat", value: devices.length, color: "primary" },
          { label: "Online", value: devices.filter(d => d.status === "Online").length, color: "success" },
          { label: "Warning", value: devices.filter(d => d.status === "Warning").length, color: "warning" },
          { label: "Offline", value: devices.filter(d => d.status === "Offline").length, color: "destructive" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <div className={`text-3xl font-bold text-${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device, i) => {
          const Icon = typeIcon[device.type] || Server;
          return (
            <motion.div key={device.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{device.name}</h4>
                    <p className="text-xs text-muted-foreground">{device.ip} · {device.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`status-dot ${statusColor[device.status]}`} />
                  <span className={`text-xs font-medium ${statusText[device.status]}`}>{device.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground mb-1">CPU</div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${device.cpu}%` }} /></div>
                  <div className="text-foreground mt-0.5">{device.cpu}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">RAM</div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${device.ram}%` }} /></div>
                  <div className="text-foreground mt-0.5">{device.ram}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Port</div>
                  <div className="text-foreground">{device.ports}</div>
                </div>
              </div>

              <div className="flex justify-between mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                <span>Latency: {device.latency}</span>
                <span>Throughput: {device.throughput}</span>
                <span>Uptime: {device.uptime}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

