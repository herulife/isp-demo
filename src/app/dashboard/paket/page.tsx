"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getPlans, createPlan, updatePlan, deletePlan, Plan, CreatePlanRequest } from "@/lib/api/plans";

export default function PaketLayananPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreatePlanRequest>({
        name: "",
        price: 0,
        speed_limit: "",
        is_active: true,
    });

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const data = await getPlans();
            setPlans(data || []);
        } catch (error: any) {
            toast.error("Gagal memuat paket layanan", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleOpenDialog = (plan?: Plan) => {
        if (plan) {
            setEditId(plan.id);
            setFormData({
                name: plan.name,
                price: plan.price,
                speed_limit: plan.speed_limit,
                is_active: plan.is_active,
            });
        } else {
            setEditId(null);
            setFormData({
                name: "",
                price: 0,
                speed_limit: "",
                is_active: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Ensure price is numeric
        const submitData = { ...formData, price: Number(formData.price) };

        try {
            if (editId) {
                await updatePlan(editId, submitData);
                toast.success("Paket layanan berhasil diperbarui");
            } else {
                await createPlan(submitData);
                toast.success("Paket layanan berhasil ditambahkan");
            }
            setIsDialogOpen(false);
            fetchPlans();
        } catch (error: any) {
            toast.error("Gagal menyimpan paket layanan", { description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus paket ini?")) return;

        try {
            await deletePlan(id);
            toast.success("Paket layanan berhasil dihapus");
            fetchPlans();
        } catch (error: any) {
            toast.error("Gagal menghapus paket layanan", { description: error.message });
        }
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Paket Layanan</h1>
                        <Link href="/dashboard/panduan#paket" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border">
                            <HelpCircle className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground">Kelola daftar paket internet untuk pelanggan Anda.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Paket
                </Button>
            </div>

            <Card className="glass-panel overflow-hidden border border-border shadow-xl">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-lg">Daftar Paket Internet</CardTitle>
                    <CardDescription>Menampilkan semua paket langganan yang tersedia.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Nama Paket</TableHead>
                                    <TableHead>Kecepatan (Up/Down)</TableHead>
                                    <TableHead>Harga Bulanan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10">Memuat data...</TableCell>
                                    </TableRow>
                                ) : plans.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            Belum ada data paket layanan. Klik "Tambah Paket" untuk membuat baru.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    plans.map((plan) => (
                                        <TableRow key={plan.id} className="group hover:bg-muted/50 transition-colors">
                                            <TableCell className="font-medium">{plan.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-mono bg-background">
                                                    {plan.speed_limit}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-semibold">{formatRupiah(plan.price)}</TableCell>
                                            <TableCell>
                                                {plan.is_active ? (
                                                    <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/30">Aktif</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-muted-foreground">Nonaktif</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleOpenDialog(plan)}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(plan.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] glass-panel border border-border shadow-2xl">
                    <DialogHeader>
                        <DialogTitle>{editId ? "Edit Paket Layanan" : "Tambah Paket Baru"}</DialogTitle>
                        <DialogDescription>
                            {editId ? "Ubah detail paket internet yang sudah ada." : "Masukkan detail profil paket internet baru."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Paket</Label>
                            <Input
                                id="name"
                                placeholder="Contoh: Paket Family 20Mbps"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="bg-background/50 backdrop-blur-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="speed_limit">Kecepatan (Up/Down)</Label>
                                <Input
                                    id="speed_limit"
                                    placeholder="Contoh: 20M/20M"
                                    value={formData.speed_limit}
                                    onChange={(e) => setFormData({ ...formData, speed_limit: e.target.value })}
                                    required
                                    className="bg-background/50 font-mono text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Harga Bulanan (Rp)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    required
                                    className="bg-background/50 font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4 shadow-sm backdrop-blur-sm">
                            <div className="space-y-0.5">
                                <Label className="text-base font-medium">Status Aktif</Label>
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Paket aktif dapat dipilih oleh pelanggan baru.
                                </p>
                            </div>
                            <Switch
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : "Simpan Paket"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

