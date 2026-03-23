import { useState } from "react";
import { Search, Filter, Download, Send, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface Invoice {
  id: string;
  customer: string;
  initials: string;
  plan: string;
  amount: string;
  status: "Lunas" | "Jatuh Tempo" | "Menunggak" | "Belum Bayar";
  dueDate: string;
  paidDate?: string;
}

const invoices: Invoice[] = [
  { id: "INV-2026-001", customer: "Rizki Ananda", initials: "RA", plan: "30 Mbps", amount: "Rp 289.000", status: "Lunas", dueDate: "2026-03-01", paidDate: "2026-02-28" },
  { id: "INV-2026-002", customer: "Sari Purnama", initials: "SP", plan: "50 Mbps + TV", amount: "Rp 459.000", status: "Lunas", dueDate: "2026-03-01", paidDate: "2026-03-01" },
  { id: "INV-2026-003", customer: "Mega Wati", initials: "MW", plan: "20 Mbps", amount: "Rp 189.000", status: "Jatuh Tempo", dueDate: "2026-03-05" },
  { id: "INV-2026-004", customer: "CV. Karya Abadi", initials: "CK", plan: "Bisnis 100 Mbps", amount: "Rp 1.250.000", status: "Menunggak", dueDate: "2026-02-15" },
  { id: "INV-2026-005", customer: "Dimas Hidayat", initials: "DH", plan: "100 Mbps FTTH", amount: "Rp 675.000", status: "Lunas", dueDate: "2026-03-01", paidDate: "2026-02-25" },
  { id: "INV-2026-006", customer: "Rumah Kost Bu Ani", initials: "RK", plan: "50 Mbps", amount: "Rp 890.000", status: "Menunggak", dueDate: "2026-02-20" },
  { id: "INV-2026-007", customer: "Andre Saputra", initials: "AS", plan: "30 Mbps", amount: "Rp 289.000", status: "Belum Bayar", dueDate: "2026-03-15" },
  { id: "INV-2026-008", customer: "Linda Wijaya", initials: "LW", plan: "100 Mbps FTTH", amount: "Rp 675.000", status: "Lunas", dueDate: "2026-03-01", paidDate: "2026-03-01" },
];

const statusStyle: Record<string, { bg: string; icon: React.ElementType }> = {
  Lunas: { bg: "bg-success/20 text-success", icon: CheckCircle },
  "Jatuh Tempo": { bg: "bg-warning/20 text-warning", icon: Clock },
  Menunggak: { bg: "bg-destructive/20 text-destructive", icon: AlertTriangle },
  "Belum Bayar": { bg: "bg-muted text-muted-foreground", icon: FileText },
};

export default function PenagihanPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.customer.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "Semua" || inv.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const totalLunas = invoices.filter(i => i.status === "Lunas").length;
  const totalTunggak = invoices.filter(i => i.status === "Menunggak").length;
  const totalPending = invoices.filter(i => i.status === "Jatuh Tempo" || i.status === "Belum Bayar").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Penagihan</h2>
          <p className="text-sm text-muted-foreground">Kelola faktur dan pembayaran pelanggan</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm hover:text-foreground transition">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
            <Send className="w-4 h-4" /> Kirim Tagihan
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          <div><div className="text-2xl font-bold text-foreground">{totalLunas}</div><div className="text-xs text-muted-foreground">Lunas bulan ini</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
          <div><div className="text-2xl font-bold text-foreground">{totalTunggak}</div><div className="text-xs text-muted-foreground">Menunggak</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div>
          <div><div className="text-2xl font-bold text-foreground">{totalPending}</div><div className="text-xs text-muted-foreground">Pending</div></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari faktur atau pelanggan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["Semua", "Lunas", "Jatuh Tempo", "Menunggak", "Belum Bayar"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left pb-3 font-medium">No. Faktur</th>
                <th className="text-left pb-3 font-medium">Pelanggan</th>
                <th className="text-left pb-3 font-medium">Paket</th>
                <th className="text-left pb-3 font-medium">Jumlah</th>
                <th className="text-left pb-3 font-medium">Jatuh Tempo</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inv, i) => {
                const st = statusStyle[inv.status];
                return (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{inv.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">{inv.initials}</div>
                        <span className="text-foreground">{inv.customer}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{inv.plan}</td>
                    <td className="text-foreground font-medium">{inv.amount}</td>
                    <td className="text-muted-foreground">{inv.dueDate}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${st.bg}`}>
                        <st.icon className="w-3 h-3" /> {inv.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

