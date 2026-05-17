'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Play, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
        <Icon className="w-6 h-6 text-zinc-400" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="text-zinc-500 text-sm font-medium mb-1">{title}</div>
    <div className="text-3xl font-bold">{value}</div>
  </div>
);

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1.2M" change="12%" trend="up" icon={Users} />
        <StatCard title="Active Streams" value="12,450" change="5%" trend="up" icon={Play} />
        <StatCard title="Daily Revenue" value="$45,200" change="8%" trend="up" icon={DollarSign} />
        <StatCard title="Server Load" value="24%" change="2%" trend="down" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
           <h3 className="text-xl font-bold mb-6">Recent Reports</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                         <Activity className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                         <div className="text-sm font-bold">Harassment Report</div>
                         <div className="text-[10px] text-zinc-500">Reported by @user_{i} • 5m ago</div>
                      </div>
                   </div>
                   <button className="px-4 py-1.5 bg-zinc-800 text-xs font-bold rounded-lg hover:bg-zinc-700 transition-colors">
                      Review
                   </button>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
           <h3 className="text-xl font-bold mb-6">Top Streamers</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                         <Play className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                         <div className="text-sm font-bold">@streamer_{i}</div>
                         <div className="text-[10px] text-zinc-500">{10000 / i} concurrent viewers</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-bold text-primary">${5000 / i}</div>
                      <div className="text-[10px] text-zinc-500">today</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
