'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, Gift, ArrowUp, BarChart3 } from 'lucide-react';

const MetricCard = ({ label, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-2xl rounded-full -mr-8 -mt-8`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    <div className="mt-4 flex items-center gap-1 text-[10px] text-green-500 font-bold">
       <ArrowUp className="w-3 h-3" /> {subtext}
    </div>
  </div>
);

export default function StreamerPage() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Followers" value="45.2K" subtext="1.2k this week" icon={Users} color="primary" />
        <MetricCard label="Live Viewers Avg" value="1,240" subtext="15% vs last stream" icon={BarChart3} color="blue" />
        <MetricCard label="Virtual Gifts" value="12,850" subtext="850 today" icon={Gift} color="pink" />
        <MetricCard label="Community Karma" value="8.9" subtext="Top 5% of creators" icon={Heart} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold">Stream Performance</h3>
           <div className="aspect-[21/9] w-full bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center text-muted-foreground relative overflow-hidden">
              <div className="absolute inset-0 flex items-end p-8 gap-2">
                 {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group" style={{ height: `${h}%` }}>
                       <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                    </div>
                 ))}
              </div>
              <div className="relative z-10 font-medium">Analytics Chart Preview</div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-bold">Recent Activity</h3>
           <div className="glass-morphism rounded-3xl p-6 border border-white/5 space-y-6">
              {[
                { user: '@fan_n1', action: 'sent a Galaxy Gift', time: '2m ago', icon: Gift, color: 'text-pink-500' },
                { user: '@alex_99', action: 'followed you', time: '5m ago', icon: Users, color: 'text-primary' },
                { user: '@king_stream', action: 'invited you to a Battle', time: '12m ago', icon: Heart, color: 'text-red-500' },
                { user: '@chat_bot', action: 'moderated 5 messages', time: '15m ago', icon: MessageCircle, color: 'text-blue-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                   <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                   </div>
                   <div className="flex-1">
                      <div className="text-sm font-bold">{item.user}</div>
                      <div className="text-xs text-muted-foreground">{item.action}</div>
                   </div>
                   <div className="text-[10px] text-muted-foreground">{item.time}</div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors font-bold text-sm">
              View All Activity
           </button>
        </div>
      </div>
    </div>
  );
}
