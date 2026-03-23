"use client";

import { useEffect, useState } from "react";
import { settingsApi } from "@/lib/api/settings";
import { Save, AlertCircle, MessageSquare, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PengaturanPage() {
    const [activeTab, setActiveTab] = useState<"profil" | "mikrotik" | "pesan">("profil");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({
        company_name: "",
        company_address: "",
        company_contact: "",
        mikrotik_ip: "",
        mikrotik_user: "",
        mikrotik_pass: "",
        telegram_bot_token: "",
        telegram_chat_id: "",
    });

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await settingsApi.getSettings();
                setFormData((prev) => ({ ...prev, ...data }));
            } catch (error: any) {
                toast.error("Gagal memuat pengaturan", { description: error.message });
            } finally {
                setIsLoading(false);
            }
        }
        loadSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await settingsApi.updateSettings(formData);
            toast.success("Pengaturan berhasil disimpan");
        } catch (error: any) {
            toast.error("Gagal menyimpan pengaturan", { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20 animate-in fade-in">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8 flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                    <Settings className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pengaturan Sistem</h1>
                        <Link href="/dashboard/panduan#pengaturan" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border mt-1">
                            <HelpCircle className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground mt-1">
                        Kelola informasi perusahaan dan integrasi NAS/Router.
                    </p>
                </div>
            </div>

            <div className="glass-panel p-1 rounded-xl inline-flex flex-wrap md:flex-nowrap mb-6 text-sm gap-1">
                <button
                    onClick={() => setActiveTab("profil")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "profil" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"}`}
                >
                    Profil Perusahaan
                </button>
                <button
                    onClick={() => setActiveTab("mikrotik")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "mikrotik" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"}`}
                >
                    Integrasi MikroTik
                </button>
                <button
                    onClick={() => setActiveTab("pesan")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "pesan" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"}`}
                >
                    Notifikasi
                </button>
            </div>

            <div className="glass-card rounded-2xl p-6 lg:p-10 max-w-3xl border border-border">
                {activeTab === "profil" ? (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold pb-2 border-b border-border">Informasi Umum</h2>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Nama ISP / Perusahaan</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={formData.company_name || ""}
                                    onChange={handleChange}
                                    placeholder="Misal: BudiNet ISP"
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Kontak & Bantuan</label>
                                <input
                                    type="text"
                                    name="company_contact"
                                    value={formData.company_contact || ""}
                                    onChange={handleChange}
                                    placeholder="No. Telepon / WhatsApp/ Email"
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Alamat Resmi</label>
                                <input
                                    type="text"
                                    name="company_address"
                                    value={formData.company_address || ""}
                                    onChange={handleChange}
                                    placeholder="Alamat kantor..."
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                ) : activeTab === "mikrotik" ? (
                    <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                        <h2 className="text-xl font-bold pb-2 border-b border-warning/20 text-warning flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> Config Router
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Pastikan API MikroTik aktif dan IP Server Billing diizinkan. Kredensial akan disimpan di basis data.
                        </p>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">IP Address Router</label>
                                <input
                                    type="text"
                                    name="mikrotik_ip"
                                    value={formData.mikrotik_ip || ""}
                                    onChange={handleChange}
                                    placeholder="192.168.x.x:8728"
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">API Username</label>
                                <input
                                    type="text"
                                    name="mikrotik_user"
                                    value={formData.mikrotik_user || ""}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    placeholder="admin"
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">API Password</label>
                                <input
                                    type="password"
                                    name="mikrotik_pass"
                                    value={formData.mikrotik_pass || ""}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="bg-background/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/20 p-2 text-primary rounded-lg">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Integrasi Telegram</h3>
                                <p className="text-muted-foreground text-sm">Atur Bot Telegram untuk notifikasi pesan otomatis.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Telegram Bot Token</label>
                                <input
                                    type="text"
                                    name="telegram_bot_token"
                                    placeholder="e.g. 123456789:ABCdefGHIjklMNOpqrsTUVwxYZ"
                                    value={formData.telegram_bot_token || ""}
                                    onChange={handleChange}
                                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Admin Chat ID</label>
                                <input
                                    type="text"
                                    name="telegram_chat_id"
                                    placeholder="e.g. 12345678"
                                    value={formData.telegram_chat_id || ""}
                                    onChange={handleChange}
                                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Grup atau User ID tujuan notifikasi tagihan baru dan konfirmasi pembayaran dicatat.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium transition-all focus:ring-4 focus:ring-primary/20 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="h-4 w-4 rounded-full border-2 border-border border-t-white animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
}

