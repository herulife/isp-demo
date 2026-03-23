"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (!mounted || loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <DashboardHeader />
                {children}
                <footer className="mt-10 text-xs text-muted-foreground border-t border-border pt-5 flex flex-wrap justify-between gap-2">
                    <span>© 2026 ISP·flow MVP — manajemen internet service provider</span>
                    <span className="flex gap-2 items-center">
                        semua sistem dalam status <span className="text-success">· online</span>
                    </span>
                </footer>
            </main>
        </div>
    );
}

