"use client";

import Image from "next/image";

const emails = [
    {
        id: 1,
        name: "Hannah Margan",
        subject: "Meeting schduled",
        time: "1:24 PM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah",
    },
    {
        id: 2,
        name: "James Smith",
        subject: "Project Update",
        time: "12:45 PM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    {
        id: 3,
        name: "Hannah Margan",
        subject: "Invoice #1024 Paid",
        time: "10:12 AM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah1",
    },
];

export default function RecentEmails() {
    return (
        <div className="bg-card rounded-3xl border border-border mt-6 w-full relative">
            <div className="flex flex-col">
                <div className="px-6 pt-6 pb-2">
                    <h3 className="text-xl font-bold text-foreground">Recent emails</h3>
                </div>

                <div className="w-full">
                    {emails.map((email, idx) => (
                        <div
                            key={email.id}
                            className={`flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer ${idx !== emails.length - 1 ? 'border-b border-border/50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4 w-1/3">
                                <Image src={email.avatar} alt={email.name} width={40} height={40} className="rounded-full bg-primary/10" />
                                <span className="text-sm font-semibold text-foreground">{email.name}</span>
                            </div>

                            <div className="w-1/3">
                                <span className="text-sm text-muted-foreground">{email.subject}</span>
                            </div>

                            <div className="w-1/3 flex justify-end">
                                <span className="text-sm text-muted-foreground">{email.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
