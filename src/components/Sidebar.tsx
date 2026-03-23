"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard, Users, FileText, Network, PieChart, Settings,
  Wrench, Package, Headphones, LogOut, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";

export const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "Menu" },
  { label: "Paket Layanan", href: "/dashboard/paket", icon: Package, section: "Menu" },
  { label: "Pelanggan", href: "/dashboard/pelanggan", icon: Users, section: "Menu" },
  { label: "Penagihan", href: "/dashboard/penagihan", icon: FileText, section: "Menu" },
  { label: "Jaringan", href: "/dashboard/jaringan", icon: Network, section: "Menu" },
  { label: "Laporan", href: "/dashboard/laporan", icon: PieChart, section: "Menu" },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings, section: "Menu" },
  { label: "Tugas Teknisi", href: "/dashboard/teknisi", icon: Wrench, section: "Lapangan" },
  { label: "Inventaris", href: "/dashboard/inventaris", icon: Package, section: "Lapangan" },
  { label: "Dukungan", href: "/dashboard/dukungan", icon: Headphones, section: "Lapangan" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const sections = Array.from(new Set(menuItems.map((i) => i.section)));

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 bg-background/80 z-40" onClick={() => setOpen(false)} />
      )}

      <aside
        className={cn(
          "bg-primary text-primary-foreground flex flex-col fixed md:relative z-40 transition-all duration-300 md:ml-4 md:my-4 md:h-[calc(100vh-2rem)] md:rounded-3xl shadow-xl",
          open ? "translate-x-0 w-72 p-5 h-screen md:h-[calc(100vh-2rem)]" : "-translate-x-full md:translate-x-0",
          !open && isCollapsed ? "md:w-20 md:p-3" : "w-72 p-5"
        )}
      >
        <div className={cn("flex items-center mb-8 mt-2", isCollapsed ? "justify-center" : "justify-between")}>
          <div className={cn("flex items-center gap-2 overflow-hidden", isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 transition-all duration-300")}>
            <div className="h-10 w-10 flex items-center justify-center shrink-0">
              <Network className="w-6 h-6 text-white shrink-0" />
            </div>
            <span className="text-2xl text-white font-bold tracking-tight whitespace-nowrap">
              ISPflow
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors shrink-0"
            title={isCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-1 flex-1 overflow-y-auto no-scrollbar overflow-x-hidden">
          {sections.map((section) => (
            <div key={section}>
              {!isCollapsed ? (
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2 ml-2 mt-4 first:mt-0 transition-opacity duration-300">
                  {section}
                </div>
              ) : (
                <div className="h-4 mt-2"></div>
              )}
              {menuItems
                .filter((i) => i.section === section)
                .map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      title={isCollapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center rounded-xl text-sm font-medium transition-all overflow-hidden",
                        isCollapsed ? "justify-center py-3 my-1 border-l-[3px] border-transparent" : "gap-3 w-full px-4 py-3",
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white",
                        isCollapsed && isActive && "bg-white/20"
                      )}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className={cn("mt-auto pt-6 border-t border-white/10 overflow-hidden", isCollapsed ? "flex flex-col items-center" : "")}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-3 transition-opacity duration-300">
              <div className="h-10 w-10 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="truncate">
                <div className="font-semibold text-white text-sm truncate">Valid User</div>
                <div className="text-xs text-white/70 truncate">{user?.username || 'admin@ispflow.id'}</div>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="h-10 w-10 mb-4 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm" title={user?.username || 'admin@ispflow.id'}>
              AD
            </div>
          )}
          <button
            onClick={logout}
            title={isCollapsed ? "Keluar" : undefined}
            className={cn(
              "flex items-center rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden",
              isCollapsed ? "justify-center py-3 w-full" : "gap-3 w-full px-4 py-3"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

