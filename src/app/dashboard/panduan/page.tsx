"use client";

import { BookOpen, FileText, LayoutDashboard, Package, Users, FileBarChart, Network, PieChart, Settings } from "lucide-react";

export default function PanduanPage() {
    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    Buku Panduan Sistem
                </h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Pusat bantuan dan tutorial langkah demi langkah untuk mengelola operasional ISP Anda. Gulir atau klik daftar isi untuk melompat ke topik tertentu.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Table of Contents - Sidebar */}
                <div className="lg:w-64 shrink-0">
                    <div className="sticky top-24 glass-panel rounded-2xl p-4 border border-border">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 px-2">Daftar Isi</h3>
                        <nav className="space-y-1">
                            <a href="#dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <LayoutDashboard className="w-4 h-4 text-primary/70" /> Dasbor Utama
                            </a>
                            <a href="#paket" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <Package className="w-4 h-4 text-primary/70" /> Paket Layanan
                            </a>
                            <a href="#pelanggan" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <Users className="w-4 h-4 text-primary/70" /> Manajemen Pelanggan
                            </a>
                            <a href="#penagihan" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <FileBarChart className="w-4 h-4 text-primary/70" /> Penagihan (Billing)
                            </a>
                            <a href="#jaringan" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <Network className="w-4 h-4 text-primary/70" /> Jaringan MikroTik
                            </a>
                            <a href="#laporan" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <PieChart className="w-4 h-4 text-primary/70" /> Laporan Keuangan
                            </a>
                            <a href="#pengaturan" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <Settings className="w-4 h-4 text-primary/70" /> Pengaturan Sistem
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Documentation Content */}
                <div className="flex-1 glass-card rounded-2xl border border-border p-6 md:p-10">
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">

                        <section id="dashboard" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <LayoutDashboard className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Dasbor Utama</h2>
                            </div>
                            <p>
                                Dasbor utama memberikan ringkasan (<i>birds-eye view</i>) kesehatan bisnis ISP Anda. Metrik yang ada diperbarui secara otomatis ketika terjadi perubahan pada data inti (berlangganan, pembayaran).
                            </p>
                            <ul>
                                <li><b>Total Pelanggan:</b> Jumlah semua pelanggan terdaftar di *database*.</li>
                                <li><b>Langganan Aktif:</b> Jumlah fasilitas pelanggan (*PPPoE Secret*) yang berstatus <code>ACTIVE</code>.</li>
                                <li><b>Pendapatan Bulan Ini:</b> Akumulasi transaksi <i>invoice</i> (tagihan) yang berstatus <code>LUNAS</code> di bulan kalender berjalan.</li>
                                <li><b>Tunggakan Beredar:</b> Total piutang dari <i>invoice</i> yang masa tenggatnya sudah lewat (Overdue).</li>
                            </ul>
                            <img src="/docs/dashboard.webp" alt="Dashboard Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mt-4 text-foreground/90">
                                💡 <b>Tips:</b> Klik ikon <FileText className="w-4 h-4 inline-block mx-1" /> "Lihat PDF" pada baris Mutasi Terkini untuk langsung mengunduh Slip Lunas (*Mockup*).
                            </div>
                        </section>

                        <section id="paket" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <Package className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Paket Layanan</h2>
                            </div>
                            <p>Modul Paket Layanan (*Plans*) digunakan untuk mengatur kecepatan internet dan harga jual ke pelanggan.</p>
                            <ol>
                                <li>Menu <b>Paket Layanan</b>.</li>
                                <li>Klik tombol <b className="text-primary">+ Tambah Paket</b>.</li>
                                <li>Masukkan <b>Nama Paket</b> (Mis. <i>Home Basic 10 Mbps</i>).</li>
                                <li>Isi <b>Harga Rp</b> tanpa menggunakan titik koma (misalnya <i>150000</i>).</li>
                                <li>Isi *Speed/Bandwidth* dalam <b>Mbps</b> untuk batas unggah (*Upload*) maupun unduh (*Download*).</li>
                            </ol>
                            <img src="/docs/paket.png" alt="Paket Layanan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                        <section id="pelanggan" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <Users className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Manajemen Pelanggan</h2>
                            </div>
                            <p>Mencatat biodata rumah pelangggan Anda. Data ini menjadi *primary key* ketika pelanggan tersebut hendak dipasangkan perangkat dan layanan internetnya.</p>
                            <ul>
                                <li><b>Registrasi Pelanggan:</b> Masukkan Nomor Handphone pelanggan secara valid (diawali "08"). Nomor ini dan <i>Password</i> yang disematkan saat registrasi akan menjadi kredensial pelanggan untuk masuk ke aplikasi <b>Portal Klien (Customer Portal)</b>.</li>
                                <li><b>Cari Pelanggan:</b> Anda dapat mencari data lewat bilah penelusuran jika daftarnya sangat banyak.</li>
                            </ul>
                            <img src="/docs/pelanggan.webp" alt="Manajemen Pelanggan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                        <section id="penagihan" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <FileBarChart className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Penagihan (Billing)</h2>
                            </div>
                            <p>Modul krusial ini memiliki 2 pilar/tab: <b>Aktivasi Layanan (Subscriptions)</b> dan <b>Tagihan (Invoices)</b>.</p>
                            <h4>1. Mengaktifkan Layanan (Subscriptions)</h4>
                            <p>Pelanggan yang sudah ditambahkan datanya dapat *"diaktifkan"* internetnya di sini. Anda memilih Paket-nya, menentukan <i>Username PPPoE</i> (Harus sama dengan di *Secret MikroTik* bila tak pakai RADIUS), dan <i>Password PPPoE</i>.</p>

                            <h4>2. Menunda Langganan (Isolir/Suspend)</h4>
                            <p>Sistem akan otomatis me-suspend pelanggan (*cron job* di server berjalan setiap 10 Menit) jika mereka melewati batas *Due Date* belum lunas! Tapi Anda bisa memperbaruinya manual via tombol Edit.</p>

                            <h4>3. Pembayaran (Mark as Paid)</h4>
                            <p>Klik tombol warna warni pada tabel <i>Tagihan/Invoice</i>. Jika status "Unpaid", akan ada tombol "Terima Pembayaran". Saat dikonfirmasi, saldo *Laporan Keuangan* Anda akan bertambah secara instan. Layanan secara otomatis dijamin *Active* jika sebelumnya Terisolir.</p>
                            <img src="/docs/penagihan.webp" alt="Penagihan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                        <section id="jaringan" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <Network className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Jaringan MikroTik</h2>
                            </div>
                            <p>Melihat performa interkoneksi langsung (<i>Real-time</i>) dengan perangkat sentral (Router/MikroTik) berbekal komunikasi protokol API.</p>
                            <ul>
                                <li><b>Ping Sentral Router:</b> Mengecek "Uptime" langsung ke IP Address yang anda set di menu Pengaturan. Warna Hijau = API Terjangkau.</li>
                                <li><b>Active PPPoE Sessions:</b> (Saat ini ditampilkan simulasi *mock*) Menarik langsung data *Online Interfaces* pelanggan. Anda tak perlu lagi membuka aplikasi lokal semisal WinBox!</li>
                            </ul>
                            <img src="/docs/jaringan.png" alt="Jaringan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                        <section id="laporan" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <PieChart className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Laporan Keuangan</h2>
                            </div>
                            <p>Gunakan opsi *"Date Range"* (Rentang Waktu) di atas tabel untuk memutus tutup-buku tanggal berapapun (Mis: Pemasukan dari Tanggal 1 s.d 15 Bulan Ini). Hasil ringkasan akan diekspor (Tombol "Export Excel" pada mockup).</p>
                            <img src="/docs/laporan.webp" alt="Laporan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                        <section id="pengaturan" className="mb-12 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border">
                                <Settings className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold m-0">Pengaturan Sistem</h2>
                            </div>
                            <p>Anda diwajibkan menyetel integrasi tingkat lanjut di menu ini agar sistem otomatisasi berfungsi 100%.</p>
                            <ul>
                                <li><b>Tab Integrasi MikroTik:</b> Pastikan anda mencentang <i>Enable API</i> pada menu <i>IP -&gt; Services</i> WinBox Mikrotik. Masukkan Alamat IP (beserta port 8728), Username Admin, dan Password di panel ini.</li>
                                <li><b>Tab Notifikasi Telegram:</b> Untuk notifikasi pembayaran berhasil atau tagihan diterbitkan. Buat bot dari <code>@BotFather</code>, raih "Bot Token" API. Cek Chat ID Grup teknisi dari <code>@RawDataBot</code>.</li>
                            </ul>
                            <img src="/docs/pengaturan.png" alt="Pengaturan Screenshot" className="w-full rounded-xl border border-border shadow-md my-6" />
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
