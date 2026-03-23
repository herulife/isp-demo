import { useState } from "react";
import { Settings, User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function PengaturanPage() {
  const { theme, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState("profil");

  const tabs = [
    { id: "profil", label: "Profil", icon: User },
    { id: "notifikasi", label: "Notifikasi", icon: Bell },
    { id: "keamanan", label: "Keamanan", icon: Shield },
    { id: "tampilan", label: "Tampilan", icon: Palette },
    { id: "sistem", label: "Sistem", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Pengaturan
        </h2>
        <p className="text-sm text-muted-foreground">Konfigurasi sistem ISP·flow</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ${
              activeTab === tab.id ? "bg-primary/20 text-primary font-medium" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        {activeTab === "profil" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Profil Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Nama ISP</label>
                <input defaultValue="ISP·flow" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input defaultValue="admin@ispflow.id" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Telepon</label>
                <input defaultValue="0812-0000-0000" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Alamat</label>
                <input defaultValue="Jl. Teknologi No. 1, Jakarta" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          </div>
        )}

        {activeTab === "notifikasi" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Pengaturan Notifikasi</h3>
            {[
              { label: "Email tagihan jatuh tempo", desc: "Kirim email otomatis H-3 sebelum jatuh tempo", enabled: true },
              { label: "SMS reminder", desc: "Kirim SMS ke pelanggan yang belum bayar", enabled: true },
              { label: "Alert gangguan jaringan", desc: "Notifikasi ketika perangkat offline", enabled: true },
              { label: "Laporan harian", desc: "Email ringkasan harian ke admin", enabled: false },
              { label: "Notifikasi pembayaran baru", desc: "Alert saat ada pembayaran masuk", enabled: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium text-foreground">{n.label}</div>
                  <div className="text-xs text-muted-foreground">{n.desc}</div>
                </div>
                <button className={`w-10 h-6 rounded-full transition ${n.enabled ? "bg-primary" : "bg-muted"} relative`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform ${n.enabled ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "keamanan" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Keamanan</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Password Lama</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Password Baru</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Konfirmasi Password</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
                <Shield className="w-4 h-4" /> Update Password
              </button>
            </div>
          </div>
        )}

        {activeTab === "tampilan" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Tampilan</h3>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-foreground">Mode Gelap</div>
                <div className="text-xs text-muted-foreground">Aktifkan tema gelap untuk tampilan yang lebih nyaman</div>
              </div>
              <button onClick={toggle} className={`w-10 h-6 rounded-full transition ${theme === "dark" ? "bg-primary" : "bg-muted"} relative`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform ${theme === "dark" ? "left-[18px]" : "left-0.5"}`} />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">Tema saat ini: <span className="text-foreground font-medium">{theme === "dark" ? "Gelap" : "Terang"}</span></div>
          </div>
        )}

        {activeTab === "sistem" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informasi Sistem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Versi Aplikasi", value: "1.0.0 MVP" },
                { label: "Database", value: "PostgreSQL 15" },
                { label: "Server", value: "Ubuntu 22.04 LTS" },
                { label: "Uptime Server", value: "45 hari 12 jam" },
                { label: "Disk Usage", value: "120 GB / 500 GB" },
                { label: "Last Backup", value: "2026-03-09 03:00" },
              ].map((info) => (
                <div key={info.label} className="bg-muted rounded-xl p-3">
                  <div className="text-xs text-muted-foreground">{info.label}</div>
                  <div className="font-medium text-foreground">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

