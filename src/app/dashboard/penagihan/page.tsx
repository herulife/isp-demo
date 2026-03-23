"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Receipt, Search, CreditCard, CheckCircle2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { billingApi, Subscription, Invoice, CreateSubscriptionPayload } from "@/lib/api/billing";
import { getCustomers, Customer } from "@/lib/api/customers";
import { getPlans, Plan } from "@/lib/api/plans";

export default function PenagihanPage() {
    // Data States
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Subscriptions Dialog
    const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
    const [isSubmittingSub, setIsSubmittingSub] = useState(false);
    const [subFormData, setSubFormData] = useState<CreateSubscriptionPayload>({
        customer_id: "",
        plan_id: "",
        pppoe_username: "",
        pppoe_password: "",
        billing_cycle_date: 1,
    });

    // Pay Invoice Dialog
    const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
    const [isSubmittingPay, setIsSubmittingPay] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [payFormData, setPayFormData] = useState({
        payment_method: "",
        gross_amount: 0,
        reference_id: "",
    });

    // Helper functions
    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd MMM yyyy", { locale: id });
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [subsRes, invsRes, custsRes, plansRes] = await Promise.all([
                billingApi.getSubscriptions(),
                billingApi.getInvoices(),
                getCustomers(),
                getPlans()
            ]);
            setSubscriptions(subsRes || []);
            setInvoices(invsRes || []);
            setCustomers(custsRes || []);
            setPlans(plansRes || []);
        } catch (error: any) {
            toast.error("Gagal memuat data penagihan", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // --- Subscription Handlers ---
    const handleOpenSubDialog = () => {
        setSubFormData({
            customer_id: "",
            plan_id: "",
            pppoe_username: "",
            pppoe_password: "",
            billing_cycle_date: 1,
        });
        setIsSubDialogOpen(true);
    };

    const handleSubSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingSub(true);
        try {
            await billingApi.createSubscription(subFormData);
            toast.success("Berhasil membuat langganan baru");
            setIsSubDialogOpen(false);
            loadData();
        } catch (error: any) {
            toast.error("Gagal membuat langganan", { description: error.message });
        } finally {
            setIsSubmittingSub(false);
        }
    };

    const handleGenerateInvoice = async (subId: string) => {
        try {
            await billingApi.createManualInvoice(subId);
            toast.success("Tagihan baru berhasil dibuat");
            loadData();
        } catch (error: any) {
            toast.error("Gagal membuat tagihan", { description: error.message });
        }
    };

    // --- Payment Handlers ---
    const handleOpenPayDialog = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setPayFormData({
            payment_method: "Transfer Bank",
            gross_amount: invoice.total_amount,
            reference_id: "",
        });
        setIsPayDialogOpen(true);
    };

    const handlePaySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInvoice) return;

        setIsSubmittingPay(true);
        try {
            await billingApi.payInvoice(selectedInvoice.id, payFormData);
            toast.success("Pembayaran berhasil dicatat");
            setIsPayDialogOpen(false);
            loadData();
        } catch (error: any) {
            toast.error("Gagal mencatat pembayaran", { description: error.message });
        } finally {
            setIsSubmittingPay(false);
        }
    };

    const getCustomerName = (cId: string) => customers.find(c => c.id === cId)?.name || "Unknown";
    const getPlanName = (pId: string) => plans.find(p => p.id === pId)?.name || "Unknown";
    const getSubInfo = (sId: string) => {
        const sub = subscriptions.find(s => s.id === sId);
        if (!sub) return { customer: "Unknown", username: "Unknown" };
        return { customer: getCustomerName(sub.customer_id), username: sub.pppoe_username };
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex justify-between items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Penagihan & Langganan</h1>
                        <Link href="/dashboard/panduan#penagihan" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border">
                            <HelpCircle className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground">Kelola siklus tagihan dan langganan aktif pengguna.</p>
                </div>
            </div>

            <Tabs defaultValue="invoices" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-4 bg-muted/50 p-1 border border-border/50">
                    <TabsTrigger value="invoices" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Daftar Tagihan</TabsTrigger>
                    <TabsTrigger value="subscriptions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Langganan Aktif</TabsTrigger>
                </TabsList>

                {/* --- TAB TAGIHAN --- */}
                <TabsContent value="invoices" className="mt-0">
                    <Card className="glass-panel overflow-hidden border border-border shadow-xl">
                        <CardHeader className="bg-muted/30 pb-4">
                            <CardTitle className="text-lg">Tagihan Pelanggan</CardTitle>
                            <CardDescription>Semua rekam tagihan (Invoice) bulan ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nomor Tagihan</TableHead>
                                            <TableHead>Pelanggan / PPPoE</TableHead>
                                            <TableHead>Nominal</TableHead>
                                            <TableHead>Jatuh Tempo</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow><TableCell colSpan={6} className="text-center py-10">Memuat data tagihan...</TableCell></TableRow>
                                        ) : invoices.length === 0 ? (
                                            <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Belum ada tagihan terdata.</TableCell></TableRow>
                                        ) : (
                                            invoices.map((inv) => {
                                                const subInfo = getSubInfo(inv.subscription_id);
                                                return (
                                                    <TableRow key={inv.id} className="group hover:bg-muted/50 transition-colors">
                                                        <TableCell className="font-mono text-xs font-semibold">{inv.invoice_number}</TableCell>
                                                        <TableCell>
                                                            <div className="font-medium text-sm">{subInfo.customer}</div>
                                                            <div className="text-xs text-muted-foreground">{subInfo.username}</div>
                                                        </TableCell>
                                                        <TableCell className="font-semibold">{formatRupiah(inv.total_amount)}</TableCell>
                                                        <TableCell className="text-sm">{formatDate(inv.due_date)}</TableCell>
                                                        <TableCell>
                                                            {inv.status === "PAID" ? (
                                                                <Badge className="bg-success/20 text-success border-success/30 hover:bg-success/30"><CheckCircle2 className="w-3 h-3 mr-1" /> Lunas</Badge>
                                                            ) : inv.status === "OVERDUE" ? (
                                                                <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Telat Bayar</Badge>
                                                            ) : (
                                                                <Badge variant="outline" className="text-warning border-warning/50">Menunggu</Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {inv.status !== "PAID" && (
                                                                <Button size="sm" onClick={() => handleOpenPayDialog(inv)} className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20">
                                                                    <CreditCard className="w-4 h-4 mr-2" /> Bayar
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB LANGGANAN --- */}
                <TabsContent value="subscriptions" className="mt-0">
                    <Card className="glass-panel overflow-hidden border border-border shadow-xl">
                        <CardHeader className="bg-muted/30 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-lg">Langganan Aktif</CardTitle>
                                <CardDescription>Daftar pelanggan yang terhubung ke PPPoE & Paket.</CardDescription>
                            </div>
                            <Button onClick={handleOpenSubDialog} size="sm" className="gap-2 shrink-0">
                                <Plus className="h-4 w-4" />
                                Daftarkan Berlangganan
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Pelanggan</TableHead>
                                            <TableHead>User PPPoE</TableHead>
                                            <TableHead>Paket</TableHead>
                                            <TableHead>Tgl Tagih</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow><TableCell colSpan={6} className="text-center py-10">Memuat data langganan...</TableCell></TableRow>
                                        ) : subscriptions.length === 0 ? (
                                            <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Belum ada pelanggan terdaftar di paket manapun.</TableCell></TableRow>
                                        ) : (
                                            subscriptions.map((sub) => (
                                                <TableRow key={sub.id} className="group hover:bg-muted/50 transition-colors">
                                                    <TableCell className="font-medium">{getCustomerName(sub.customer_id)}</TableCell>
                                                    <TableCell className="font-mono text-xs">{sub.pppoe_username}</TableCell>
                                                    <TableCell>{getPlanName(sub.plan_id)}</TableCell>
                                                    <TableCell className="text-sm">Tgl {sub.billing_cycle_date}</TableCell>
                                                    <TableCell>
                                                        {sub.status === "ACTIVE" ? (
                                                            <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/30">Aktif</Badge>
                                                        ) : sub.status === "ISOLATED" ? (
                                                            <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Isolir</Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="text-warning border-warning/50">Throttled</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" onClick={() => handleGenerateInvoice(sub.id)} className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                                                            <Receipt className="w-3 h-3 mr-1" /> Buat Tagihan
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* --- MODAL DAFTAR LANGGANAN --- */}
            <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
                <DialogContent className="sm:max-w-[425px] glass-panel border border-border shadow-2xl">
                    <DialogHeader>
                        <DialogTitle>Daftarkan Pelanggan</DialogTitle>
                        <DialogDescription>
                            Buat kredensial PPPoE dan hubungkan pelanggan dengan paket layanan.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Pelanggan Baru/Lama</Label>
                            <Select
                                value={subFormData.customer_id}
                                onValueChange={(val) => setSubFormData({ ...subFormData, customer_id: val })}
                                required
                            >
                                <SelectTrigger className="bg-background/50">
                                    <SelectValue placeholder="Pilih Pelanggan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name} ({c.phone})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Paket Layanan</Label>
                            <Select
                                value={subFormData.plan_id}
                                onValueChange={(val) => setSubFormData({ ...subFormData, plan_id: val })}
                                required
                            >
                                <SelectTrigger className="bg-background/50">
                                    <SelectValue placeholder="Pilih Paket" />
                                </SelectTrigger>
                                <SelectContent>
                                    {plans.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name} - {formatRupiah(p.price)}/bln</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pppoe_user">PPPoE Username</Label>
                                <Input
                                    id="pppoe_user"
                                    value={subFormData.pppoe_username}
                                    onChange={(e) => setSubFormData({ ...subFormData, pppoe_username: e.target.value })}
                                    required
                                    className="bg-background/50 font-mono text-sm"
                                    placeholder="e.g. jdoe123"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pppoe_pass">PPPoE Password</Label>
                                <Input
                                    id="pppoe_pass"
                                    type="password"
                                    value={subFormData.pppoe_password}
                                    onChange={(e) => setSubFormData({ ...subFormData, pppoe_password: e.target.value })}
                                    required
                                    className="bg-background/50 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cycle">Tanggal Jatuh Tempo (1-31)</Label>
                            <Input
                                id="cycle"
                                type="number"
                                min="1" max="31"
                                value={subFormData.billing_cycle_date}
                                onChange={(e) => setSubFormData({ ...subFormData, billing_cycle_date: Number(e.target.value) })}
                                required
                                className="bg-background/50 text-sm"
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsSubDialogOpen(false)} disabled={isSubmittingSub}>Batal</Button>
                            <Button type="submit" disabled={isSubmittingSub}>{isSubmittingSub ? "Memproses..." : "Simpan"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* --- MODAL BAYAR TAGIHAN --- */}
            <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
                <DialogContent className="sm:max-w-[425px] glass-panel border border-border shadow-2xl">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
                        <DialogDescription>
                            Tagihan <span className="font-mono text-primary font-semibold">{selectedInvoice?.invoice_number}</span> akan ditandai Lunas.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInvoice && (
                        <form onSubmit={handlePaySubmit} className="space-y-4 pt-4">
                            <div className="space-y-2 border border-border/50 rounded-lg p-3 bg-muted/20">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Tagihan:</span>
                                    <span className="font-semibold text-foreground">{formatRupiah(selectedInvoice.total_amount)}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="method">Metode Pembayaran</Label>
                                <Select
                                    value={payFormData.payment_method}
                                    onValueChange={(val) => setPayFormData({ ...payFormData, payment_method: val })}
                                    required
                                >
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="Pilih Metode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Transfer Bank">Transfer Bank / Virtual Account</SelectItem>
                                        <SelectItem value="Tunai / Cash">Tunai / Cash</SelectItem>
                                        <SelectItem value="E-Wallet">E-Wallet (OVO, Gopay, dll)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Jumlah Dibayar (Rp)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={selectedInvoice.total_amount}
                                    value={payFormData.gross_amount}
                                    onChange={(e) => setPayFormData({ ...payFormData, gross_amount: Number(e.target.value) })}
                                    required
                                    className="bg-background/50 font-mono text-sm"
                                />
                            </div>
                            <DialogFooter className="pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsPayDialogOpen(false)} disabled={isSubmittingPay}>Batal</Button>
                                <Button type="submit" disabled={isSubmittingPay} className="bg-success text-success-foreground hover:bg-success/90">{isSubmittingPay ? "Memproses..." : "Konfirmasi Lunas"}</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

