"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ArrowUpRight, Search, Download, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

type InvoiceData = {
    id: string;
    invoice_number: string;
    total_amount: number;
    due_date: string;
    status: string;
};

export default function ClientInvoices() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInvoices() {
            const token = localStorage.getItem("client_token");
            if (!token) return router.push("/client/login");

            try {
                const res = await fetch("http://localhost:8080/api/v1/client/invoices", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.removeItem("client_token");
                    toast.error("Sesi habis.");
                    return router.push("/client/login");
                }

                if (!res.ok) throw new Error("Gagal memuat riwayat tagihan");

                const data = await res.json();
                setInvoices(data || []);
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadInvoices();
    }, [router]);

    const handlePay = (inv: InvoiceData) => {
        // Mocking Payment Gateway Trigger
        toast.info(`Redirecting ke Payment Gateway Tripay/Midtrans untuk Tagihan ${inv.invoice_number}...`);
        setTimeout(() => {
            toast.success("Dalam skenario nyata, Anda akan dialihkan ke halaman Checkout.", { duration: 5000 });
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Riwayat Tagihan</h1>
                <p className="text-muted-foreground mt-1">
                    Daftar seluruh tagihan layanan internet Anda.
                </p>
            </div>

            <div className="glass-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-background/50 border-b border-border text-xs uppercase text-muted-foreground tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Nomor Invoice</th>
                                <th className="px-6 py-4">Jatuh Tempo</th>
                                <th className="px-6 py-4">Total Harga</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        Belum ada riwayat tagihan.
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-background/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <span className="font-semibold">{inv.invoice_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {new Date(inv.due_date).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            Rp {inv.total_amount.toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4">
                                            {inv.status === "PAID" ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30">
                                                    <CheckCircle className="w-3.5 h-3.5" /> Lunas
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning/20 text-warning border border-warning/30">
                                                    <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {inv.status === "UNPAID" ? (
                                                <button
                                                    onClick={() => handlePay(inv)}
                                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2"
                                                >
                                                    Bayar <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button className="bg-background hover:bg-muted text-foreground border border-border px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2">
                                                    <Download className="w-4 h-4" /> Kwitansi
                                                </button>
                                            )}
                                        </td>
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
