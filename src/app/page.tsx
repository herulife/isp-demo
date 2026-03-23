"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, TrendingUp, Users, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] selection:bg-primary/30 selection:text-primary-foreground overflow-hidden text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Modern Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Smart ISP</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <Link href="/client/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
              Portal Pelanggan
            </Link>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                ISP Billing System v2.0
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
                Solusi Otomasi Total <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Bisnis WiFi Anda</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Tinggalkan cara lama. Kelola tagihan, isolir pelanggan yang menunggak secara otomatis, dan panen keuntungan dengan satu dasbor pintar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                  Buka Dashboard Admin
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/client/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10 backdrop-blur-sm">
                  Coba Portal Pelanggan
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-20 relative mx-auto"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/50 to-transparent opacity-30 blur-xl"></div>
              <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-2 md:p-4 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-2 pb-4 pt-2 border-b border-white/5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <img src="/docs/dashboard.webp" alt="Dashboard Preview" className="rounded-lg border border-white/5 w-full h-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
              </div>
            </motion.div>
          </div>
        </main>

        {/* Features Section */}
        <section className="border-t border-white/5 bg-black/20 backdrop-blur-lg pt-24 pb-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Didesain untuk Skala Besar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Kami memahami rasa sakit mengurus ISP lokal. Semuanya kini otomatis.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="h-12 w-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 m-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Autopilot MikroTik</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Isolir otomatis saat telat bayar dan aktivasi instan saat lunas. Pantau sesies PPPoE langsung dari browser tanpa WinBox.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl rounded-none"></div>
                <div className="h-12 w-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="h-6 w-6 m-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Siklus Tagihan Cerdas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pembuatan tagihan (Invoice) otomatis tiap bulan secara akurat. Ringkasan keuangan lengkap dalam satu layar mewah.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="h-12 w-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 m-auto" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Portal Klien Mandiri</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tingkatkan gengsi *brand* Anda! Pelanggan punya portal khusus untuk bayar tagihan dan melihat riwayat tanpa meneror Whatsapp Anda.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center bg-black/40 backdrop-blur-md">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            Built with <Shield className="w-4 h-4 text-primary" /> by Heru fidiyanto.
          </p>
        </footer>
      </div>
    </div>
  );
}

