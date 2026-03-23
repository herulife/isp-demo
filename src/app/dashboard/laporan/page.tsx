"use client";

import { useEffect, useState } from "react";
import { reportsApi, RevenueReport } from "@/lib/api/reports";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Download, PieChart, TrendingUp, Search, HelpCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LaporanPage() {
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const [report, setReport] = useState<RevenueReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Default to current month
    const today = new Date();
    const [startDate, setStartDate] = useState<string>(format(startOfMonth(today), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState<string>(format(endOfMonth(today), "yyyy-MM-dd"));

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await reportsApi.getRevenueReport(startDate, endDate);
            setReport(data);
        } catch (error: any) {
            toast.error("Gagal memuat laporan", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        loadData();
    };

    const handleExport = () => {
        toast.success("Mengekspor laporan ke file CSV...");
        // Mock export functionality
        const headers = "ID,Tanggal Bayar,Pelanggan,Metode,Total\n";
        const rows = report?.payments.map(p =>
            `${p.id},${format(new Date(p.paid_at), "yyyy-MM-dd HH:mm")},"${p.customer_name}",${p.method},${p.amount}`
        ).join("\n") || "";

        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Laporan_Pendapatan_${startDate}_to_${endDate}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="animate-in fade-in py-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                            <PieChart className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">Laporan Keuangan</h1>
                                <Link href="/dashboard/panduan#laporan" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border mt-1">
                                    <HelpCircle className="h-5 w-5" />
                                </Link>
                            </div>
                            <p className="text-muted-foreground mt-1">
                                Ringkasan pendapatan dari tagihan yang telah dibayar pelanggan.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleExport}
                    disabled={isLoading || !report?.payments.length}
                    className="flex justify-center items-center gap-2 bg-foreground/10 hover:bg-foreground/20 text-foreground px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50"
                >
                    <Download className="w-4 h-4" />
                    Ekspor Data
                </button>
            </div>

            <div className="glass-panel p-4 rounded-2xl mb-8 border border-border">
                <form onSubmit={handleFilter} className="flex flex-col md:flex-row items-end gap-4 overflow-x-auto">
                    <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tanggal Mulai</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tanggal Akhir</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 h-[42px] shrink-0"
                    >
                        {isLoading ? <div className="h-4 w-4 rounded-full border-2 border-border border-t-white animate-spin" /> : <Search className="w-4 h-4" />}
                        Filter Laporan
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card md:col-span-1 p-6 rounded-2xl h-full flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 z-10">
                        <TrendingUp className="w-4 h-4 text-secondary" /> Total Pendapatan
                    </p>
                    <h2 className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent z-10">
                        {isLoading ? "..." : formatRupiah(report?.total_revenue || 0)}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 z-10 decoration-foreground/20">
                        Periode: {format(new Date(startDate), "d MMM yyyy", { locale: id })} - {format(new Date(endDate), "d MMM yyyy", { locale: id })}
                    </p>
                </div>

                <div className="glass-card md:col-span-2 p-0 rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            Rincian Pemasukan
                        </h3>
                        <div className="bg-foreground/5 text-xs px-3 py-1 rounded-full font-medium">
                            {report?.payments.length || 0} Transaksi
                        </div>
                    </div>
                    <div className="overflow-x-auto flex-1 h-[260px]">
                        <table className="w-full text-sm text-left relative">
                            <thead className="text-xs text-muted-foreground uppercase bg-background/50 sticky top-0 backdrop-blur-md z-10 outline outline-1 outline-border">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Tgl Bayar</th>
                                    <th className="px-5 py-3 font-medium">Pelanggan</th>
                                    <th className="px-5 py-3 font-medium">Metode</th>
                                    <th className="px-5 py-3 font-medium text-right">Nominal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="px-5 py-8 text-center">
                                            <div className="flex justify-center">
                                                <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : report?.payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-5 py-12 text-center text-muted-foreground">
                                            Tidak ada transaksi pada periode ini.
                                        </td>
                                    </tr>
                                ) : (
                                    report?.payments.map((payment) => (
                                        <tr key={payment.id} className="border-b border-border hover:bg-foreground/5 transition-colors">
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {format(new Date(payment.paid_at), "dd/MM/yyyy HH:mm")}
                                            </td>
                                            <td className="px-5 py-3 font-medium text-foreground">{payment.customer_name}</td>
                                            <td className="px-5 py-3">
                                                <span className="bg-foreground/10 px-2 py-0.5 rounded text-xs text-foreground/80">{payment.method}</span>
                                            </td>
                                            <td className="px-5 py-3 font-bold text-success text-right">
                                                {formatRupiah(payment.amount)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

