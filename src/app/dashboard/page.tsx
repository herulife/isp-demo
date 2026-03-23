"use client";

import StatsCards from "@/components/StatsCards";
import RecentEmails from "@/components/RecentEmails";
import DashboardRightPanel from "@/components/DashboardRightPanel";

export default function DashboardPage() {
    return (
        <div className="animate-in fade-in duration-500 flex flex-col xl:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col">
                <StatsCards />
                <RecentEmails />
            </div>

            {/* Right Sidebar Panel */}
            <div className="w-full xl:w-[360px] shrink-0">
                <DashboardRightPanel />
            </div>
        </div>
    );
}

