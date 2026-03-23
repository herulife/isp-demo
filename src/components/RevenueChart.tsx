"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Feb14', currentWeek: 16000, priorWeek: 12000 },
    { name: 'Feb15', currentWeek: 12000, priorWeek: 16000 },
    { name: 'Feb16', currentWeek: 15000, priorWeek: 14000 },
    { name: 'Feb17', currentWeek: 14000, priorWeek: 16500 },
    { name: 'Feb18', currentWeek: 17000, priorWeek: 14500 },
    { name: 'Feb19', currentWeek: 16000, priorWeek: 15500 },
    { name: 'Feb20', currentWeek: 18000, priorWeek: 14000 },
];

export default function RevenueChart() {
    return (
        <div className="bg-card rounded-3xl p-6 border border-border shadow-sm w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-bold text-foreground">Revenue</h4>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-4">Last 7 days VS prior week</span>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                            Feb 15: <strong className="text-foreground">$16,364.20</strong>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            Feb 6: <strong className="text-foreground">$22,81.99</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            tickFormatter={(value) => `${value / 1000}K`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="priorWeek"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            strokeOpacity={0.4}
                            fill="none"
                        />
                        <Area
                            type="monotone"
                            dataKey="currentWeek"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCurrent)"
                            activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
