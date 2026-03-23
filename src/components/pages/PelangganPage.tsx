import { useState } from "react";
import { Search, Plus, Filter, UserCircle, Phone, MapPin, Mail, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
  id: number;
  initials: string;
  name: string;
  plan: string;
  status: "Aktif" | "Tunggak" | "Blokir" | "Non-aktif";
  phone: string;
  address: string;
  email: string;
  joinDate: string;
  bill: string;
}

const allCustomers: Customer[] = [
  { id: 1001, initials: "RA", name: "Rizki Ananda", plan: "30 Mbps", status: "Aktif", phone: "0812-3456-7890", address: "Jl. Merdeka No. 12", email: "rizki@email.com", joinDate: "2024-01-15", bill: "Rp 289k" },
  { id: 1002, initials: "SP", name: "Sari Purnama", plan: "50 Mbps + TV", status: "Aktif", phone: "0813-4567-8901", address: "Jl. Sudirman No. 45", email: "sari@email.com", joinDate: "2024-02-20", bill: "Rp 459k" },
  { id: 1003, initials: "MW", name: "Mega Wati", plan: "20 Mbps", status: "Tunggak", phone: "0814-5678-9012", address: "Jl. Gatot Subroto No. 78", email: "mega@email.com", joinDate: "2024-03-10", bill: "Rp 189k" },
  { id: 1004, initials: "DH", name: "Dimas Hidayat", plan: "100 Mbps FTTH", status: "Aktif", phone: "0815-6789-0123", address: "Jl. Ahmad Yani No. 33", email: "dimas@email.com", joinDate: "2024-04-05", bill: "Rp 675k" },
  { id: 1005, initials: "NS", name: "Nurul Safitri", plan: "15 Mbps", status: "Blokir", phone: "0816-7890-1234", address: "Jl. Diponegoro No. 56", email: "nurul@email.com", joinDate: "2024-05-12", bill: "Rp 189k" },
  { id: 1006, initials: "BW", name: "Budi Wahyudi", plan: "50 Mbps", status: "Aktif", phone: "0817-8901-2345", address: "Jl. Pahlawan No. 90", email: "budi@email.com", joinDate: "2024-06-18", bill: "Rp 389k" },
  { id: 1007, initials: "AS", name: "Andre Saputra", plan: "30 Mbps", status: "Aktif", phone: "0818-9012-3456", address: "Jl. Kartini No. 21", email: "andre@email.com", joinDate: "2024-07-22", bill: "Rp 289k" },
  { id: 1008, initials: "LW", name: "Linda Wijaya", plan: "100 Mbps FTTH", status: "Non-aktif", phone: "0819-0123-4567", address: "Jl. Imam Bonjol No. 67", email: "linda@email.com", joinDate: "2024-08-30", bill: "Rp 675k" },
];

const statusStyle: Record<string, string> = {
  Aktif: "bg-success/20 text-success",
  Tunggak: "bg-warning/20 text-warning",
  Blokir: "bg-destructive/20 text-destructive",
  "Non-aktif": "bg-muted text-muted-foreground",
};

export default function PelangganPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = allCustomers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toString().includes(search);
    const matchFilter = filterStatus === "Semua" || c.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Pelanggan</h2>
          <p className="text-sm text-muted-foreground">Kelola data pelanggan ISP·flow</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" /> Tambah Pelanggan
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tambah Pelanggan Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input placeholder="Nama Lengkap" className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Email" className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="No. Telepon" className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Alamat" className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Pilih Paket</option>
              <option>15 Mbps</option>
              <option>20 Mbps</option>
              <option>30 Mbps</option>
              <option>50 Mbps</option>
              <option>50 Mbps + TV</option>
              <option>100 Mbps FTTH</option>
            </select>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">Simpan</button>
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition">Batal</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau ID pelanggan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["Semua", "Aktif", "Tunggak", "Blokir", "Non-aktif"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterStatus === s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCustomer && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                {selectedCustomer.initials}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedCustomer.name}</h3>
                <p className="text-sm text-muted-foreground">ID: #{selectedCustomer.id}</p>
              </div>
            </div>
            <button onClick={() => setSelectedCustomer(null)} className="text-muted-foreground hover:text-foreground text-sm">✕ Tutup</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /> {selectedCustomer.email}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" /> {selectedCustomer.phone}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" /> {selectedCustomer.address}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-muted rounded-xl p-3"><div className="text-xs text-muted-foreground">Paket</div><div className="font-medium text-foreground">{selectedCustomer.plan}</div></div>
            <div className="bg-muted rounded-xl p-3"><div className="text-xs text-muted-foreground">Status</div><div className={`font-medium ${statusStyle[selectedCustomer.status]?.split(" ")[1]}`}>{selectedCustomer.status}</div></div>
            <div className="bg-muted rounded-xl p-3"><div className="text-xs text-muted-foreground">Tagihan</div><div className="font-medium text-foreground">{selectedCustomer.bill}</div></div>
            <div className="bg-muted rounded-xl p-3"><div className="text-xs text-muted-foreground">Bergabung</div><div className="font-medium text-foreground">{selectedCustomer.joinDate}</div></div>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="glass-card rounded-2xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left pb-3 font-medium">ID</th>
                <th className="text-left pb-3 font-medium">Nama</th>
                <th className="text-left pb-3 font-medium">Paket</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Tagihan</th>
                <th className="text-left pb-3 font-medium">Telepon</th>
                <th className="text-right pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 text-muted-foreground">#{c.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">{c.initials}</div>
                      <span className="text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{c.plan}</td>
                  <td><span className={`px-2 py-0.5 rounded-full text-xs ${statusStyle[c.status]}`}>{c.status}</span></td>
                  <td className="text-foreground">{c.bill}</td>
                  <td className="text-muted-foreground">{c.phone}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedCustomer(c)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition" title="Detail"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-warning/10 text-warning transition" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Menampilkan {filtered.length} dari {allCustomers.length} pelanggan</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs">1</button>
            <button className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs hover:text-foreground">2</button>
          </div>
        </div>
      </div>
    </div>
  );
}

