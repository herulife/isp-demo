"use client";

import { useEffect, useState } from "react";
import { UserPlus, Wallet, Receipt, CreditCard, MoreVertical } from "lucide-react";
import { analyticsApi, DashboardStats } from "@/lib/api/analytics";
import { toast } from "sonner";
import RevenueChart from "./RevenueChart";

export default function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await analyticsApi.getStats();
        setStats(data);
      } catch (error: any) {
        toast.error("Gagal memuat statistik", { description: error.message });
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const topCards = [
    {
      icon: Wallet,
      value: isLoading ? "..." : formatRupiah(stats?.revenue_this_month || 0),
      label: "Total pendapatan bulan ini",
    },
    {
      icon: UserPlus,
      value: isLoading ? "..." : stats?.active_subscriptions?.toString() || "0",
      label: "Pelanggan aktif bulan ini",
    },
    {
      icon: CreditCard,
      value: isLoading ? "..." : formatRupiah((stats?.pending_invoices || 0) * 150000), // Fake amount for pending if not in stats
      label: "Tagihan belum dibayar",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topCards.map((card, i) => (
          <div key={i} className="bg-card rounded-3xl p-6 border border-border shadow-sm relative flex flex-col justify-between min-h-[160px]">
            <button className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4">
              <card.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{card.value}</h3>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row Area (Left side of the Dashboard split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Left Column in Bottom Row */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <h4 className="text-base font-semibold text-foreground mb-4">Pelanggan baru</h4>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-foreground">
                {isLoading ? "..." : (stats?.total_customers || 0) - (stats?.active_subscriptions || 0)}
              </span>
              <div className="px-3 py-1 rounded-full bg-success/15 text-success text-sm font-medium flex items-center gap-1">
                +18.7%
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <h4 className="text-base font-semibold text-foreground mb-4">Tagihan tertunggak</h4>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-foreground">
                {isLoading ? "..." : stats?.isolated_subscriptions || 0}
              </span>
              <div className="px-3 py-1 rounded-full bg-destructive/15 text-destructive text-sm font-medium flex items-center gap-1">
                +2.7%
              </div>
            </div>
          </div>
        </div>

        {/* Right Column in Bottom Row (Chart Placeholder) */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}
