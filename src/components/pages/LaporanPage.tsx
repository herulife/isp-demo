import { BarChart3, TrendingUp, Users, DollarSign, Download } from "lucide-react";
import { motion } from "framer-motion";

const monthlyData = [
  { month: "Sep", pelanggan: 1280, pendapatan: 142, churn: 12 },
  { month: "Okt", pelanggan: 1310, pendapatan: 151, churn: 8 },
  { month: "Nov", pelanggan: 1365, pendapatan: 165, churn: 15 },
  { month: "Des", pelanggan: 1398, pendapatan: 172, churn: 10 },
  { month: "Jan", pelanggan: 1425, pendapatan: 178, churn: 7 },
  { month: "Feb", pelanggan: 1450, pendapatan: 183, churn: 9 },
  { month: "Mar", pelanggan: 1482, pendapatan: 189, churn: 5 },
];

const maxPendapatan = Math.max(...monthlyData.map(d => d.pendapatan));

const topPlans = [
  { name: "30 Mbps", count: 520, pct: 35 },
  { name: "50 Mbps", count: 372, pct: 25 },
  { name: "20 Mbps", count: 297, pct: 20 },
  { name: "100 Mbps FTTH", count: 178, pct: 12 },
  { name: "15 Mbps", count: 115, pct: 8 },
];

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Laporan</h2>
          <p className="text-sm text-muted-foreground">Analisis dan statistik bisnis ISP·flow</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm hover:text-foreground transition">
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Pertumbuhan Pelanggan", value: "+202", sub: "6 bulan terakhir", color: "primary" },
          { icon: DollarSign, label: "Total Pendapatan", value: "Rp 1.18 M", sub: "6 bulan terakhir", color: "success" },
          { icon: TrendingUp, label: "Avg Churn Rate", value: "0.7%", sub: "per bulan", color: "warning" },
          { icon: BarChart3, label: "ARPU", value: "Rp 127k", sub: "per pelanggan", color: "secondary" },
        ].map((kpi) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-8 w-8 rounded-lg bg-${kpi.color}/20 flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 text-${kpi.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (simple bar) */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Pendapatan Bulanan (juta Rp)
          </h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-foreground font-medium">{d.pendapatan}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.pendapatan / maxPendapatan) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg min-h-[4px]"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" /> Distribusi Paket Langganan
          </h3>
          <div className="space-y-3">
            {topPlans.map((plan) => (
              <div key={plan.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{plan.name}</span>
                  <span className="text-muted-foreground">{plan.count} ({plan.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${plan.pct}%` }} transition={{ duration: 0.5 }} className="progress-fill" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-md font-semibold text-foreground mb-4">Ringkasan Bulanan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left pb-3 font-medium">Bulan</th>
                <th className="text-left pb-3 font-medium">Pelanggan</th>
                <th className="text-left pb-3 font-medium">Pendapatan</th>
                <th className="text-left pb-3 font-medium">Churn</th>
                <th className="text-left pb-3 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlyData.map((d, i) => (
                <tr key={d.month} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 text-foreground">{d.month} 2026</td>
                  <td className="text-foreground">{d.pelanggan.toLocaleString()}</td>
                  <td className="text-foreground">Rp {d.pendapatan} jt</td>
                  <td className="text-warning">{d.churn}</td>
                  <td className="text-success">{i > 0 ? `+${d.pelanggan - monthlyData[i-1].pelanggan}` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

