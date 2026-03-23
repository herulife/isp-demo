import { ArrowRight, UserCircle } from "lucide-react";

const customers = [
  { initials: "RA", name: "Rizki Ananda", plan: "30 Mbps", status: "Aktif", statusColor: "green", bill: "Rp 289k", billNote: "(lunas)", billColor: "muted-foreground" },
  { initials: "SP", name: "Sari Purnama", plan: "50 Mbps + TV", status: "Aktif", statusColor: "green", bill: "Rp 459k", billNote: "(lunas)", billColor: "muted-foreground" },
  { initials: "MW", name: "Mega Wati", plan: "20 Mbps", status: "Tunggak", statusColor: "yellow", bill: "Rp 189k", billNote: "(jatuh tempo)", billColor: "warning" },
  { initials: "DH", name: "Dimas Hidayat", plan: "100 Mbps FTTH", status: "Aktif", statusColor: "green", bill: "Rp 675k", billNote: "(pra-bayar)", billColor: "muted-foreground" },
  { initials: "NS", name: "Nurul Safitri", plan: "15 Mbps", status: "Blokir", statusColor: "red", bill: "Rp 189k", billNote: "(menunggak 2 bln)", billColor: "destructive" },
];

const statusTextColor: Record<string, string> = {
  green: "text-success",
  yellow: "text-warning",
  red: "text-destructive",
};

export default function CustomerTable() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-primary" /> Pelanggan Terbaru
        </h2>
        <button className="text-xs text-primary hover:underline flex items-center gap-1">
          lihat semua <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-muted-foreground border-b border-border">
            <tr>
              <th className="text-left pb-2 font-medium">Nama</th>
              <th className="text-left pb-2 font-medium">Paket</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Tagihan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((c) => (
              <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {c.initials}
                  </div>
                  <span className="text-foreground">{c.name}</span>
                </td>
                <td className="text-muted-foreground">{c.plan}</td>
                <td>
                  <span className={`status-dot dot-${c.statusColor}`} />
                  <span className={statusTextColor[c.statusColor]}>{c.status}</span>
                </td>
                <td>
                  <span className="text-foreground">{c.bill}</span>{" "}
                  <span className={`text-xs text-${c.billColor}`}>{c.billNote}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

