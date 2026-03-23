"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Home, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Simple token check (for UI purposes)
  const isAuth = typeof window !== "undefined" ? !!localStorage.getItem("client_token") : false;

  const handleLogout = () => {
    localStorage.removeItem("client_token");
    localStorage.removeItem("client_name");
    localStorage.removeItem("client_phone");
    toast.success("Berhasil keluar");
    router.push("/client/login");
  };

  if (!isAuth && pathname !== "/client/login") {
    // Basic redirect protect
    if (typeof window !== "undefined") {
      router.push("/client/login");
    }
  }

  // Don't show layout wraps on login page
  if (pathname === "/client/login") {
    return <>{children}</>;
  }

  const clientName = typeof window !== "undefined" ? localStorage.getItem("client_name") || "Pelanggan" : "Pelanggan";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16 sm:pt-0 pb-16 sm:pb-0">
      {/* Top Navbar */}
      <header className="fixed sm:sticky top-0 left-0 right-0 z-50 glass-panel sm:border-b sm:border-t-0 border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">Klien Area</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mr-2">
               <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold mr-1">Tamu</span>
              <User className="w-4 h-4" />
              <span>{clientName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:flex p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-border flex justify-around p-2 pb-safe">
        <Link href="/client/dashboard" className={cn("flex flex-col items-center gap-1 p-2 rounded-lg transition-colors", pathname === "/client/dashboard" ? "text-primary" : "text-muted-foreground")}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Beranda</span>
        </Link>
        <Link href="/client/tagihan" className={cn("flex flex-col items-center gap-1 p-2 rounded-lg transition-colors", pathname === "/client/tagihan" ? "text-primary" : "text-muted-foreground")}>
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium">Tagihan</span>
        </Link>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Keluar</span>
        </button>
      </nav>
    </div>
  );
}
