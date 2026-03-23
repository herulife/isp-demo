"use client";
import { useState } from "react";
import { Package, Search, Plus, AlertTriangle, CheckCircle, Box } from "lucide-react";
import { motion } from "framer-motion";

interface Item {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  location: string;
  price: string;
}

const items: Item[] = [
  { id: "INV-001", name: "Router MikroTik hAP ac3", category: "Router", stock: 12, minStock: 5, location: "Gudang A", price: "Rp 1.250k" },
  { id: "INV-002", name: "ONU ZTE F660", category: "CPE", stock: 23, minStock: 10, location: "Gudang A", price: "Rp 350k" },
  { id: "INV-003", name: "Kabel FO Drop 200m", category: "Kabel", stock: 45, minStock: 20, location: "Gudang B", price: "Rp 180k" },
  { id: "INV-004", name: "Connector SC/APC", category: "Aksesoris", stock: 150, minStock: 50, location: "Gudang A", price: "Rp 8k" },
  { id: "INV-005", name: "Splitter 1:8", category: "Aksesoris", stock: 8, minStock: 10, location: "Gudang A", price: "Rp 120k" },
  { id: "INV-006", name: "Switch TP-Link 24 Port", category: "Switch", stock: 3, minStock: 2, location: "Gudang B", price: "Rp 2.800k" },
  { id: "INV-007", name: "UPS APC 1500VA", category: "Power", stock: 2, minStock: 3, location: "Gudang A", price: "Rp 3.500k" },
  { id: "INV-008", name: "Tiang Galvanis 8m", category: "Outdoor", stock: 15, minStock: 5, location: "Gudang C", price: "Rp 450k" },
];

export default function InventarisPage() {
  const [search, setSearch] = useState("");
  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const lowStock = items.filter(i => i.stock <= i.minStock);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" /> Inventaris
          </h2>
          <p className="text-sm text-muted-foreground">Kelola stok peralatan dan material jaringan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
          <Plus className="w-4 h-4" /> Tambah Item
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center"><Box className="w-5 h-5 text-primary" /></div>
          <div><div className="text-2xl font-bold text-foreground">{items.length}</div><div className="text-xs text-muted-foreground">Total Item</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          <div><div className="text-2xl font-bold text-foreground">{items.length - lowStock.length}</div><div className="text-xs text-muted-foreground">Stok Cukup</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
          <div><div className="text-2xl font-bold text-foreground">{lowStock.length}</div><div className="text-xs text-muted-foreground">Stok Rendah</div></div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border-destructive/30">
          <div className="flex items-center gap-2 text-destructive text-sm font-medium mb-2"><AlertTriangle className="w-4 h-4" /> Peringatan Stok Rendah</div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((i) => (
              <span key={i.id} className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs">{i.name}: {i.stock} unit</span>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari item..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left pb-3 font-medium">Kode</th>
                <th className="text-left pb-3 font-medium">Nama Item</th>
                <th className="text-left pb-3 font-medium">Kategori</th>
                <th className="text-left pb-3 font-medium">Stok</th>
                <th className="text-left pb-3 font-medium">Min. Stok</th>
                <th className="text-left pb-3 font-medium">Lokasi</th>
                <th className="text-left pb-3 font-medium">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item, i) => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className={`hover:bg-muted/30 transition-colors ${item.stock <= item.minStock ? "bg-destructive/5" : ""}`}>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                  <td className="py-3 text-foreground">{item.name}</td>
                  <td><span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{item.category}</span></td>
                  <td className={item.stock <= item.minStock ? "text-destructive font-medium" : "text-foreground"}>{item.stock}</td>
                  <td className="text-muted-foreground">{item.minStock}</td>
                  <td className="text-muted-foreground">{item.location}</td>
                  <td className="text-foreground">{item.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

