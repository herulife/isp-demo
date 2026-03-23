"use client";
import { useState } from "react";
import { Headphones, Search, Plus, MessageCircle, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

interface Ticket {
  id: number;
  customer: string;
  initials: string;
  subject: string;
  category: string;
  status: "Baru" | "Diproses" | "Menunggu" | "Selesai";
  priority: "Tinggi" | "Sedang" | "Rendah";
  created: string;
  lastReply: string;
  messages: { from: string; text: string; time: string }[];
}

const tickets: Ticket[] = [
  {
    id: 1290, customer: "Pelanggan #3201", initials: "PL", subject: "Koneksi lambat sejak kemarin", category: "Koneksi",
    status: "Diproses", priority: "Tinggi", created: "2026-03-08 14:30", lastReply: "1 jam lalu",
    messages: [
      { from: "Pelanggan", text: "Internet saya lambat sejak kemarin sore, mohon dicek", time: "14:30" },
      { from: "Support", text: "Baik, kami cek dari sisi kami. Apakah bisa restart router terlebih dahulu?", time: "14:45" },
      { from: "Pelanggan", text: "Sudah restart tapi masih lambat", time: "15:00" },
    ]
  },
  {
    id: 1291, customer: "Sari Purnama", initials: "SP", subject: "Request upgrade paket", category: "Billing",
    status: "Menunggu", priority: "Sedang", created: "2026-03-08 16:00", lastReply: "3 jam lalu",
    messages: [
      { from: "Pelanggan", text: "Saya ingin upgrade dari 50 Mbps ke 100 Mbps, bagaimana prosedurnya?", time: "16:00" },
      { from: "Support", text: "Untuk upgrade, akan ada biaya instalasi Rp 150.000. Apakah setuju?", time: "16:15" },
    ]
  },
  {
    id: 1292, customer: "CV. Karya Abadi", initials: "CK", subject: "IP Public request", category: "Teknis",
    status: "Baru", priority: "Sedang", created: "2026-03-09 08:00", lastReply: "-",
    messages: [
      { from: "Pelanggan", text: "Kami butuh 1 IP public untuk server internal. Berapa biaya tambahannya?", time: "08:00" },
    ]
  },
  {
    id: 1289, customer: "Andre Saputra", initials: "AS", subject: "Reset password WiFi", category: "Teknis",
    status: "Selesai", priority: "Rendah", created: "2026-03-07 10:00", lastReply: "kemarin",
    messages: [
      { from: "Pelanggan", text: "Saya lupa password WiFi, mohon direset", time: "10:00" },
      { from: "Support", text: "Password sudah direset. SSID: ISPflow_1007, Pass: ispflow2026", time: "10:20" },
      { from: "Pelanggan", text: "Sudah bisa, terima kasih!", time: "10:30" },
    ]
  },
];

const statusStyle: Record<string, string> = {
  Baru: "bg-primary/20 text-primary",
  Diproses: "bg-warning/20 text-warning",
  Menunggu: "bg-secondary/20 text-secondary",
  Selesai: "bg-success/20 text-success",
};

export default function DukunganPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState("Semua");
  const [replyText, setReplyText] = useState("");

  const filtered = tickets.filter((t) => filter === "Semua" || t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Headphones className="w-6 h-6 text-primary" /> Dukungan
          </h2>
          <p className="text-sm text-muted-foreground">Kelola tiket dan permintaan bantuan pelanggan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
          <Plus className="w-4 h-4" /> Tiket Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Baru", count: tickets.filter(t => t.status === "Baru").length, icon: AlertCircle, color: "primary" },
          { label: "Diproses", count: tickets.filter(t => t.status === "Diproses").length, icon: Clock, color: "warning" },
          { label: "Menunggu", count: tickets.filter(t => t.status === "Menunggu").length, icon: MessageCircle, color: "secondary" },
          { label: "Selesai", count: tickets.filter(t => t.status === "Selesai").length, icon: CheckCircle, color: "success" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
            <s.icon className={`w-5 h-5 text-${s.color} mx-auto mb-1`} />
            <div className="text-xl font-bold text-foreground">{s.count}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["Semua", "Baru", "Diproses", "Menunggu", "Selesai"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket List */}
        <div className="space-y-3">
          {filtered.map((ticket, i) => (
            <motion.div key={ticket.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`glass-card rounded-2xl p-4 cursor-pointer transition ${selectedTicket?.id === ticket.id ? "border-primary/40" : ""}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">{ticket.initials}</div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">#{ticket.id} - {ticket.subject}</h4>
                    <p className="text-xs text-muted-foreground">{ticket.customer}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyle[ticket.status]}`}>{ticket.status}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{ticket.category}</span>
                <span>Terakhir: {ticket.lastReply}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ticket Detail */}
        {selectedTicket ? (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">#{selectedTicket.id} - {selectedTicket.subject}</h3>
              <button onClick={() => setSelectedTicket(null)} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
            </div>
            <div className="flex gap-2 mb-4 text-xs">
              <span className={`px-2 py-0.5 rounded-full ${statusStyle[selectedTicket.status]}`}>{selectedTicket.status}</span>
              <span className="bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{selectedTicket.priority}</span>
              <span className="bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{selectedTicket.category}</span>
            </div>

            {/* Messages */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
              {selectedTicket.messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm ${msg.from === "Support" ? "bg-primary/10 ml-4" : "bg-muted mr-4"}`}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-foreground">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Reply */}
            {selectedTicket.status !== "Selesai" && (
              <div className="flex gap-2">
                <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Tulis balasan..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="glass-card rounded-2xl p-10 flex items-center justify-center text-muted-foreground text-sm">
            Pilih tiket untuk melihat detail
          </div>
        )}
      </div>
    </div>
  );
}

