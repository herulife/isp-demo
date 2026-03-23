"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Network, Activity, CreditCard, Clock, AlertTriangle, Box } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type ProfileData = {
    name: string;
    phone: string;
    address: string;
};

type SubscriptionData = {
    id: string;
    plan_name: string;
    price: number;
    pppoe_username: string;
    status: string;
};

type InvoiceData = {
    id: string;
    invoice_number: string;
    total_amount: number;
    due_date: string;
    status: string;
};

type DashboardRes = {
    profile: ProfileData;
    subscriptions: SubscriptionData[];
    unpaid_invoices: InvoiceData[];
};

export default function ClientDashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardRes | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const token = localStorage.getItem("client_token");
            if (!token) return router.push("/client/login");

            try {
                const res = await fetch("http://localhost:8080/api/v1/client/dashboard", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.removeItem("client_token");
                    toast.error("Sesi telah habis, silakan masuk kembali.");
                    return router.push("/client/login");
                }

                if (!res.ok) {
                    const body = await res.json();
                    throw new Error(body.message || "Gagal memuat data pelanggan");
                }

                const dashboardData = await res.json();
                setData(dashboardData);
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!data) return null;

    const totalUnpaid = data.unpaid_invoices.reduce((sum, inv) => sum + inv.total_amount, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Selamat Datang, {data.profile.name.split(" ")[0]}</h1>
                    <p className="text-muted-foreground mt-1">
                        Status Layanan dan Ringkasan Akun BudiNet ISP
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Subscriptions Card */}
                <div className="glass-card rounded-2xl p-6 border border-border flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
                                <Network className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold">Layanan Aktif</h2>
                        </div>

                        {data.subscriptions.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tidak ada layanan aktif.</p>
                        ) : (
                            <div className="space-y-4">
                                {data.subscriptions.map((sub) => (
                                    <div key={sub.id} className="p-4 bg-background/50 rounded-xl border border-border">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-primary">{sub.plan_name}</div>
                                            <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${sub.status === 'ACTIVE' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                                                }`}>
                                                {sub.status === 'ACTIVE' ? 'AKTIF' : 'ISOLIR'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">ID Panggil: {sub.pppoe_username}</div>
                                        <div className="text-sm font-medium mt-2">Rp {sub.price.toLocaleString("id-ID")} / bulan</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Unpaid Invoices Summary Card */}
                <div className="glass-card rounded-2xl p-6 border border-border flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-warning/10 text-warning rounded-lg border border-warning/20">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold">Tagihan Tertunggak</h2>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl font-bold text-foreground">
                                Rp {totalUnpaid.toLocaleString("id-ID")}
                            </span>
                            {data.unpaid_invoices.length > 0 && (
                                <span className="text-sm font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                                    {data.unpaid_invoices.length} Tagihan
                                </span>
                            )}
                        </div>

                        {data.unpaid_invoices.length > 0 ? (
                            <p className="text-sm text-muted-foreground mb-4">Harap segera lakukan pembayaran untuk menghindari gangguan layanan internet.</p>
                        ) : (
                            <div className="flex items-center gap-2 text-success mb-4 font-medium bg-success/10 p-3 rounded-lg">
                                <Activity className="w-5 h-5" />
                                Semua tagihan lunas! Terima kasih.
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => router.push("/client/tagihan")}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 shadow-sm"
                    >
                        <CreditCard className="w-4 h-4" />
                        {data.unpaid_invoices.length > 0 ? "Bayar Tagihan Sekarang" : "Lihat Riwayat Tagihan"}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="glass-card rounded-2xl p-6 border border-border flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-secondary/10 text-secondary rounded-lg border border-secondary/20">
                            <Box className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold">Informasi Profil</h2>
                    </div>

                    <div className="space-y-4 text-sm flex-1">
                        <div>
                            <div className="text-muted-foreground mb-1 text-xs">Nama Lengkap</div>
                            <div className="font-medium">{data.profile.name}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground mb-1 text-xs">Nomor Handphone</div>
                            <div className="font-medium">{data.profile.phone}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground mb-1 text-xs">Alamat Pemasangan</div>
                            <div className="font-medium text-foreground/80 leading-relaxed">{data.profile.address || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
