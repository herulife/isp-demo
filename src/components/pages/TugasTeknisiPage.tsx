"use client";
import { useState } from "react";
import { Wrench, MapPin, Clock, CheckCircle, User, Plus, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Task {
  id: number;
  title: string;
  customer: string;
  address: string;
  technician: string;
  techInitials: string;
  status: "Pending" | "Dalam Proses" | "Selesai";
  priority: "Tinggi" | "Sedang" | "Rendah";
  date: string;
  type: string;
}

const tasks: Task[] = [
  { id: 1, title: "Instalasi baru", customer: "Hendra Wijaya", address: "Jl. Anggrek No. 15", technician: "Agus", techInitials: "AG", status: "Dalam Proses", priority: "Tinggi", date: "2026-03-09", type: "Instalasi" },
  { id: 2, title: "Perbaikan koneksi", customer: "Pelanggan #3201", address: "Jl. Mawar No. 8", technician: "Rudi", techInitials: "RD", status: "Pending", priority: "Tinggi", date: "2026-03-09", type: "Perbaikan" },
  { id: 3, title: "Upgrade paket", customer: "Toko Sejahtera", address: "Jl. Pasar No. 22", technician: "Syahrul", techInitials: "SY", status: "Pending", priority: "Sedang", date: "2026-03-09", type: "Upgrade" },
  { id: 4, title: "Ganti router", customer: "Mega Wati", address: "Jl. Gatot Subroto No. 78", technician: "Agus", techInitials: "AG", status: "Selesai", priority: "Sedang", date: "2026-03-08", type: "Perbaikan" },
  { id: 5, title: "Instalasi baru", customer: "Budi Santoso", address: "Jl. Kenanga No. 3", technician: "Rudi", techInitials: "RD", status: "Selesai", priority: "Rendah", date: "2026-03-08", type: "Instalasi" },
  { id: 6, title: "Cek sinyal ONU", customer: "PT. Maju Jaya", address: "Jl. Industri No. 10", technician: "Syahrul", techInitials: "SY", status: "Pending", priority: "Rendah", date: "2026-03-10", type: "Maintenance" },
];

const statusStyle: Record<string, string> = {
  Pending: "bg-warning/20 text-warning",
  "Dalam Proses": "bg-primary/20 text-primary",
  Selesai: "bg-success/20 text-success",
};

const priorityStyle: Record<string, string> = {
  Tinggi: "bg-destructive/20 text-destructive",
  Sedang: "bg-warning/20 text-warning",
  Rendah: "bg-muted text-muted-foreground",
};

export default function TugasTeknisiPage() {
  const [filter, setFilter] = useState("Semua");

  const filtered = tasks.filter((t) => filter === "Semua" || t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" /> Tugas Teknisi
          </h2>
          <p className="text-sm text-muted-foreground">Kelola tugas lapangan dan jadwal teknisi</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
          <Plus className="w-4 h-4" /> Tugas Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div>
          <div><div className="text-2xl font-bold text-foreground">{tasks.filter(t => t.status === "Pending").length}</div><div className="text-xs text-muted-foreground">Pending</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center"><Wrench className="w-5 h-5 text-primary" /></div>
          <div><div className="text-2xl font-bold text-foreground">{tasks.filter(t => t.status === "Dalam Proses").length}</div><div className="text-xs text-muted-foreground">Dalam Proses</div></div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          <div><div className="text-2xl font-bold text-foreground">{tasks.filter(t => t.status === "Selesai").length}</div><div className="text-xs text-muted-foreground">Selesai</div></div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["Semua", "Pending", "Dalam Proses", "Selesai"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((task, i) => (
          <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{task.title}</h4>
                <p className="text-xs text-muted-foreground">{task.type} · #{task.id}</p>
              </div>
              <div className="flex gap-1">
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyle[task.status]}`}>{task.status}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${priorityStyle[task.priority]}`}>{task.priority}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><User className="w-3.5 h-3.5" /> {task.customer}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {task.address}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> {task.date}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-secondary/30 flex items-center justify-center text-xs border border-secondary text-secondary-foreground">{task.techInitials}</div>
                <span className="text-sm text-foreground">{task.technician}</span>
              </div>
              {task.status !== "Selesai" && (
                <button className="text-xs text-primary hover:underline">Update Status</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

