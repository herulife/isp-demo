"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, Customer, CreateCustomerRequest } from "@/lib/api/customers";

export default function PelangganPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateCustomerRequest>({
        name: "",
        phone: "",
        address: "",
        coordinate: "",
        password: "",
    });

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const data = await getCustomers();
            setCustomers(data || []);
        } catch (error: any) {
            toast.error("Gagal memuat daftar pelanggan", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleOpenDialog = (customer?: Customer) => {
        if (customer) {
            setEditId(customer.id);
            setFormData({
                name: customer.name,
                phone: customer.phone,
                address: customer.address || "",
                coordinate: customer.coordinate || "",
                password: "", // Don't populate password on edit unless they want to change it
            });
        } else {
            setEditId(null);
            setFormData({
                name: "",
                phone: "",
                address: "",
                coordinate: "",
                password: "",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Only send password if it's not empty when editing, or always block if creating
            const submitData = { ...formData };
            if (editId && !submitData.password) {
                delete submitData.password;
            }

            if (editId) {
                await updateCustomer(editId, submitData);
                toast.success("Data pelanggan berhasil diperbarui");
            } else {
                if (!submitData.password) {
                    throw new Error("Password wajib diisi untuk pelanggan baru");
                }
                await createCustomer(submitData);
                toast.success("Pelanggan baru berhasil ditambahkan");
            }
            setIsDialogOpen(false);
            fetchCustomers();
        } catch (error: any) {
            toast.error("Gagal menyimpan data pelanggan", { description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) return;

        try {
            await deleteCustomer(id);
            toast.success("Pelanggan berhasil dihapus");
            fetchCustomers();
        } catch (error: any) {
            toast.error("Gagal menghapus pelanggan", { description: error.message });
        }
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Data Pelanggan</h1>
                        <Link href="/dashboard/panduan#pelanggan" title="Panduan Halaman Ini" className="text-muted-foreground hover:text-primary transition-colors bg-muted/30 p-1.5 rounded-lg border border-border">
                            <HelpCircle className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground">Kelola daftar profil dan detail pelanggan internet Anda.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Pelanggan
                </Button>
            </div>

            <Card className="glass-panel overflow-hidden border border-border shadow-xl">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-lg">Daftar Pelanggan Terdaftar</CardTitle>
                    <CardDescription>Menampilkan semua basis data pelanggan sistem penagihan.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Nama Pelanggan</TableHead>
                                    <TableHead>No. HP / WhatsApp</TableHead>
                                    <TableHead>Alamat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10">Memuat data...</TableCell>
                                    </TableRow>
                                ) : customers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                            Belum ada data pelanggan. Klik "Tambah Pelanggan" untuk membuat baru.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    customers.map((customer) => (
                                        <TableRow key={customer.id} className="group hover:bg-muted/50 transition-colors">
                                            <TableCell className="font-medium">{customer.name}</TableCell>
                                            <TableCell className="font-mono text-sm">{customer.phone}</TableCell>
                                            <TableCell className="max-w-[300px] truncate">{customer.address || "-"}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleOpenDialog(customer)}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(customer.id)}>
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
                        <DialogTitle>{editId ? "Edit Data Pelanggan" : "Tambah Pelanggan Baru"}</DialogTitle>
                        <DialogDescription>
                            {editId ? "Ubah detail informasi pelanggan yang dipilih." : "Masukkan data lengkap untuk mendaftarkan pelanggan baru."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                placeholder="Contoh: Budi Santoso"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="bg-background/50 backdrop-blur-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">No. Telepon / WhatsApp</Label>
                            <Input
                                id="phone"
                                placeholder="Contoh: 628123456789"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="bg-background/50 font-mono text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat Lengkap</Label>
                            <Input
                                id="address"
                                placeholder="Contoh: Jl. Merdeka No. 1, Jakarta"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="bg-background/50 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                {editId ? "Password Baru (Kosongkan jika tidak ingin mengubah)" : "Password Akun Portal"}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder={editId ? "Biarkan kosong untuk mempertahankan password lama" : "Buat password pelanggan"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editId}
                                className="bg-background/50"
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : "Simpan Data"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

