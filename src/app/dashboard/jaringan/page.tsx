"use client";

import { useEffect, useState } from "react";
import { networkApi, RouterStatus, PPPoESession } from "@/lib/api/network";
import { Server, Wifi, Activity, Clock, Cpu, Users, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function JaringanPage() {
    const [status, setStatus] = useState<RouterStatus | null>(null);
    const [sessions, setSessions] = useState<PPPoESession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [routerData, sessionData] = await Promise.all([
                    networkApi.getRouterStatus(),
                    networkApi.getActiveSessions().catch(() => []),
                ]);
                setStatus(routerData);
                setSessions(sessionData || []);
            } catch (error: any) {
                toast.error("Gagal terhubung ke router", { description: error.message });
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20 animate-in fade-in">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    const isOnline = status?.status === "ONLINE";
    const isUnconfigured = status?.status === "UNCONFIGURED";

    return (
        <div className="animate-in fade-in py-2 duration-500">
            <div className="mb-8 flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                    <Server className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Status Network & NAS</h1>
                        <Link href="/dashboard/panduan#jaringan" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border mt-1">
                            <HelpCircle className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground mt-1">
                        Pantau status Router dan perangkat klien (Active PPPoE Sessions).
                    </p>
                </div>
            </div>

            {isUnconfigured && (
                <div className="glass-card mb-8 p-6 rounded-2xl border-l-4 border-l-warning flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                        <h3 className="text-warning font-semibold text-lg flex items-center gap-2">
                            <Server className="w-5 h-5" /> Router Belum Dikonfigurasi
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                            Silakan atur IP, Username, dan Password API MikroTik Anda terlebih dahulu di menu Pengaturan.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/pengaturan"
                        className="shrink-0 bg-warning/20 text-warning hover:bg-warning/30 px-5 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        Buka Pengaturan
                    </Link>
                </div>
            )}

            {!isUnconfigured && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Status NAS / Router</p>
                                <div className="flex items-center gap-3">
                                    <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-destructive'}`}></div>
                                    <h3 className="text-2xl font-bold text-foreground">{status?.status || "UNKNOWN"}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 font-mono">{status?.ip_address}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${isOnline ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                                {isOnline ? <Wifi className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Identitas Perangkat</p>
                                <h3 className="text-2xl font-bold text-foreground">{status?.board_name || "N/A"}</h3>
                                <p className="text-sm text-muted-foreground mt-1">v{status?.version || "-"}</p>
                            </div>
                            <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                                <Cpu className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Router Uptime</p>
                                <h3 className="text-xl font-bold text-foreground mt-1 truncate max-w-[180px]">{status?.uptime || "N/A"}</h3>
                            </div>
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-lg text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold">PPPoE Active Sessions</h2>
                    </div>
                    <div className="text-sm bg-foreground/5 py-1.5 px-3 rounded-full border border-border font-medium">
                        <span className="text-primary">{sessions.length}</span> Klien Online
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-foreground/5 border-b border-border">
                            <tr>
                                <th className="px-5 py-4 font-medium rounded-tl-xl mt-px">Username / Name</th>
                                <th className="px-5 py-4 font-medium">Service</th>
                                <th className="px-5 py-4 font-medium">Caller ID (MAC)</th>
                                <th className="px-5 py-4 font-medium">IP Address</th>
                                <th className="px-5 py-4 font-medium rounded-tr-xl mt-px">Uptime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                                        {!isOnline ? "Tidak tergabung ke router (Offline)." : "Belum ada klien yang online saat ini."}
                                    </td>
                                </tr>
                            ) : (
                                sessions.map((session) => (
                                    <tr key={session.id} className="border-b border-border hover:bg-foreground/5 transition-colors">
                                        <td className="px-5 py-4 font-medium text-foreground">{session.name}</td>
                                        <td className="px-5 py-4"><span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-semibold">{session.service}</span></td>
                                        <td className="px-5 py-4 font-mono text-muted-foreground">{session.caller_id}</td>
                                        <td className="px-5 py-4 font-mono text-success">{session.address}</td>
                                        <td className="px-5 py-4 text-muted-foreground">{session.uptime}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

