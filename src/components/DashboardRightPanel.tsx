"use client";

import { CheckSquare, Clock, FileSignature, PlayCircle } from "lucide-react";

export default function DashboardRightPanel() {
    const todos = [
        { title: "Run payroll", time: "Mar 4 at 6:00 PM", icon: PlayCircle },
        { title: "Review time off request", time: "Mar 7 at 6:00 PM", icon: Clock },
        { title: "Sign board resolution", time: "Mar 12 at 6:00 PM", icon: FileSignature },
        { title: "Finish onboarding Tony", time: "Mar 12 at 6:00 PM", icon: CheckSquare },
    ];

    return (
        <div className="flex flex-col gap-6 w-full h-full bg-muted/30 rounded-[2.5rem] p-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm transform hover:-translate-y-1 transition-transform">
                <h4 className="text-lg font-bold text-foreground mb-1">Formation status</h4>
                <p className="text-sm text-muted-foreground mb-4">In progress</p>

                <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>

                <p className="text-sm text-foreground font-semibold text-center mt-4 mb-4">
                    Estimated processing<br />
                    <span className="text-muted-foreground font-normal">4-5 bussiness days</span>
                </p>

                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors">
                    View status
                </button>
            </div>

            <div className="flex-1 mt-2">
                <h4 className="text-lg font-bold text-foreground mb-4">Your to-Do list</h4>
                <div className="flex flex-col gap-4">
                    {todos.map((todo, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                            <div className="mt-1 p-2 rounded-lg bg-card border border-border flex items-center justify-center">
                                <todo.icon className="w-4 h-4 text-foreground" />
                            </div>
                            <div className="flex-1 border-b border-border/50 pb-4">
                                <p className="text-sm font-bold text-foreground">{todo.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{todo.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm mt-auto">
                <h4 className="text-lg font-bold text-foreground mb-1">Board meeting</h4>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <p className="text-sm text-muted-foreground">Feb 22 at 6:00 PM</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    You have been invited to attend a meeting at the Board Directors.
                </p>
            </div>
        </div>
    );
}
