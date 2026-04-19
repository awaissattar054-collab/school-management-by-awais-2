"use client"

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Search, 
  Bell, 
  Smile, 
  AlertTriangle, 
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  GraduationCap,
  Clock,
  Filter,
  CreditCard,
  Heart,
  ChevronDown,
  BrainCircuit,
  Zap,
  CheckCircle2,
  MoreHorizontal,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  MoreVertical,
  LogOut,
  Shield,
  Palette,
  BellRing,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { 
  stats, 
  students, 
  analyticsData, 
  scheduleEvents, 
  transactions, 
  messages, 
  getAIResponse 
} from '@/lib/data'

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Components ---

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-glass backdrop-blur-xl transition-all hover:shadow-2xl hover:bg-white/70", className)}>
    {children}
  </div>
)

const Navbar = ({ role, setRole, aiStatus }: { role: string; setRole: (r: string) => void; aiStatus: string }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/20 bg-[#f8fbff]/80 px-10 py-5 backdrop-blur-2xl">
    <div className="flex items-center gap-8">
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="AI-Neural Search engine..." 
          className="w-full rounded-2xl border border-slate-200 bg-slate-100/30 py-3 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-mint focus:bg-white focus:ring-8 focus:ring-mint-light/30 shadow-sm"
        />
      </div>
      
      <div className="flex rounded-2xl bg-slate-200/50 p-1.5 backdrop-blur-md border border-white/50">
        {['Admin', 'Teacher', 'Parent'].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "rounded-xl px-6 py-2 text-xs font-black uppercase tracking-widest transition-all",
              role === r ? 'bg-navy text-white shadow-lg' : 'text-slate-500 hover:text-navy hover:bg-white/50'
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="hidden items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm sm:flex">
         <Activity size={14} className="text-mint animate-pulse" />
         <span className="text-[11px] font-black text-navy uppercase tracking-widest">{aiStatus}</span>
      </div>
      
      <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:shadow-md">
        <Bell size={20} />
        <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500"></span>
      </button>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-1.5 pr-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
        <div className="h-10 w-10 overflow-hidden rounded-[14px] bg-gradient-to-br from-mint to-mint-dark">
           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="User" />
        </div>
        <div className="hidden text-right lg:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">{role}</p>
          <p className="text-sm font-black text-navy mt-1.5">Awais MS</p>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </div>
  </header>
)

const AdminOverview = () => (
  <div className="space-y-12">
    <div className="flex items-end justify-between">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-3 w-3 rounded-full bg-mint shadow-[0_0_12px_rgba(45,206,137,0.5)] animate-pulse" />
          <span className="text-[11px] font-black text-mint uppercase tracking-[0.3em]">Neural System Active</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-navy italic">Global Intelligence</h1>
        <p className="text-lg font-medium text-slate-400 mt-2">Heuristics and institutional performance metrics.</p>
      </header>
      <div className="flex gap-5">
        <button className="flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black shadow-sm border border-slate-100 hover:shadow-xl transition-all">
          <Calendar size={20} /> Advanced Schedule
        </button>
        <button className="flex items-center gap-3 rounded-[20px] bg-navy px-8 py-4 text-sm font-black text-white shadow-2xl shadow-navy/30 hover:bg-navy-light transition-all active:scale-95">
          <Zap size={20} className="text-mint" /> Generate AI Insights
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const icons = [Users, Wallet, Calendar, AlertTriangle];
        const colors = ['from-indigo-600 to-blue-700', 'from-mint to-mint-dark', 'from-orange-500 to-orange-700', 'from-purple-600 to-fuchsia-800'];
        const Icon = icons[i] || Users;
        const color = colors[i];
        return (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[40px] bg-white p-9 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <div className={cn("absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br opacity-5 transition-transform duration-700 group-hover:scale-150", color)} />
            <div className="flex items-center justify-between">
              <div className={cn("flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br text-white shadow-xl", color)}>
                <Icon size={26} />
              </div>
              <div className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black", stat.change.startsWith('+') ? 'bg-mint-light text-mint' : 'bg-rose-50 text-rose-500')}>
                {stat.change}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.title}</p>
              <h3 className="mt-2 text-4xl font-black tracking-tighter text-navy">{stat.value}</h3>
            </div>
          </motion.div>
        )
      })}
    </div>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <GlassCard>
        <h3 className="text-2xl font-black text-navy uppercase italic tracking-tighter mb-8">Financial Velocity</h3>
        <div className="h-[320px] w-full">
          <ResponsiveContainer>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorMint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DCE89" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#2DCE89" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} />
              <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: '900' }} />
              <Area type="monotone" dataKey="performance" stroke="#2DCE89" strokeWidth={5} fillOpacity={1} fill="url(#colorMint)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-2xl font-black text-navy uppercase italic tracking-tighter mb-8">Faculty Efficiency</h3>
        <div className="space-y-6">
          {['Dr. Robert', 'Ms. Sarah', 'Mr. Smith'].map((name, i) => (
            <div key={name}>
              <div className="flex justify-between mb-2">
                 <span className="text-sm font-black text-navy">{name}</span>
                 <span className="text-sm font-black text-mint">{90 - (i*5)}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${90 - (i*5)}%` }} className="h-full bg-navy rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
)

const AnalyticsView = () => (
  <div className="space-y-12">
    <header>
      <h1 className="text-5xl font-black tracking-tighter text-navy italic">Deep Analytics</h1>
      <p className="text-lg font-medium text-slate-400 mt-2">Comprehensive data visualization of academic and operational growth.</p>
    </header>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <GlassCard className="lg:col-span-2">
        <h3 className="text-xl font-black text-navy mb-8 uppercase tracking-widest">Academic Trajectory (6 Months)</h3>
        <div className="h-[400px] w-full">
           <ResponsiveContainer>
             <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="performance" stroke="#172B4D" strokeWidth={6} dot={{ r: 6, fill: '#172B4D', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 10 }} />
                <Line type="monotone" dataKey="attendance" stroke="#2DCE89" strokeWidth={6} dot={{ r: 6, fill: '#2DCE89', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 10 }} />
             </LineChart>
           </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
         <h3 className="text-xl font-black text-navy mb-10 uppercase tracking-widest">Sentiment Mix</h3>
         <div className="h-[300px] w-full">
           <ResponsiveContainer>
              <PieChart>
                <Pie data={[
                  { name: 'Satisfied', value: 65, color: '#2DCE89' },
                  { name: 'Neutral', value: 25, color: '#6366f1' },
                  { name: 'At Risk', value: 10, color: '#f87171' }
                ]} innerRadius={80} outerRadius={120} paddingAngle={10} dataKey="value">
                   <Cell fill="#2DCE89" />
                   <Cell fill="#6366f1" />
                   <Cell fill="#f87171" />
                </Pie>
                <Tooltip />
              </PieChart>
           </ResponsiveContainer>
         </div>
         <div className="mt-8 space-y-4">
            {['Satisfied', 'Neutral', 'At Risk'].map((label, i) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ['#2DCE89', '#6366f1', '#f87171'][i] }} />
                  <span className="text-sm font-black text-navy">{label}</span>
                </div>
                <span className="text-sm font-bold text-slate-400">{[65, 25, 10][i]}%</span>
              </div>
            ))}
         </div>
      </GlassCard>
    </div>
  </div>
)

const SchedulesView = () => (
  <div className="space-y-12">
    <header className="flex items-end justify-between">
      <div>
        <h1 className="text-5xl font-black tracking-tighter text-navy italic">Event Horizon</h1>
        <p className="text-lg font-medium text-slate-400 mt-2">Active session registry and facility booking timetable.</p>
      </div>
      <button className="rounded-2xl bg-navy px-8 py-4 text-sm font-black text-white shadow-xl shadow-navy/20 active:scale-95 uppercase tracking-widest">
        Add New Event
      </button>
    </header>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
      <div className="lg:col-span-3 space-y-6">
        {scheduleEvents.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex items-center gap-10 rounded-[32px] bg-white p-8 border border-white transition-all hover:shadow-2xl hover:border-mint/20"
          >
            <div className="flex-none flex flex-col items-center">
              <span className="text-xl font-black text-navy leading-none mb-1">{event.time.split(' ')[0]}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.time.split(' ')[1]}</span>
            </div>
            <div className="h-10 w-[1px] bg-slate-100" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-mint uppercase tracking-widest bg-mint-light px-3 py-1 rounded-full">{event.type}</span>
              </div>
              <h4 className="text-2xl font-black text-navy tracking-tight">{event.title}</h4>
              <p className="text-sm font-bold text-slate-400 mt-1">{event.teacher} — {event.room}</p>
            </div>
            <button className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-navy group-hover:text-white transition-all">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="space-y-8">
        <GlassCard className="bg-navy text-white border-none shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest mb-6">Upcoming Holidays</h3>
           <div className="space-y-6">
              {[
                { date: 'Oct 28', title: 'Autumn Foundation Day' },
                { date: 'Nov 05', title: 'Tech Innovation Summit' }
              ].map(h => (
                <div key={h.title} className="flex gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center font-black drop-shadow-lg">{h.date.split(' ')[1]}</div>
                   <div>
                     <p className="text-xs font-black uppercase tracking-widest opacity-50">{h.date.split(' ')[0]}</p>
                     <p className="text-sm font-bold">{h.title}</p>
                   </div>
                </div>
              ))}
           </div>
        </GlassCard>
      </div>
    </div>
  </div>
)

const FinanceView = () => (
  <div className="space-y-12">
    <header>
      <h1 className="text-5xl font-black tracking-tighter text-navy italic">Finance Control</h1>
      <p className="text-lg font-medium text-slate-400 mt-2">Monetary synchronization and administrative treasury logs.</p>
    </header>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
       {[
         { label: 'Total Inflow', value: '$84,200', trend: '+14%', color: 'border-mint' },
         { label: 'Pending Recievables', value: '$12,400', trend: '-2%', color: 'border-orange-400' },
         { label: 'Operational Outgo', value: '$32,100', trend: '+5%', color: 'border-indigo-600' }
       ].map(f => (
         <GlassCard key={f.label} className={cn("border-l-8", f.color)}>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{f.label}</p>
            <h3 className="text-4xl font-black text-navy tracking-tighter">{f.value}</h3>
            <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full inline-block mt-4", f.trend.startsWith('+') ? 'bg-mint-light text-mint' : 'bg-rose-50 text-rose-500')}>
              {f.trend} vs last month
            </span>
         </GlassCard>
       ))}
    </div>

    <GlassCard className="p-0 overflow-hidden border-none shadow-2xl">
      <table className="w-full text-left">
         <thead className="bg-slate-50/80">
            <tr>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Payload Source</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Volume</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Method</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-white transition-all">
                <td className="px-10 py-6 text-sm font-black text-navy">{tx.id}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs">{tx.student.charAt(0)}</div>
                    <span className="text-sm font-bold text-slate-600">{tx.student}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-sm font-black text-navy">{tx.amount}</td>
                <td className="px-10 py-6">
                   <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest", tx.status === 'Paid' ? 'bg-mint-light text-mint' : 'bg-orange-50 text-orange-400')}>
                     {tx.status}
                   </span>
                </td>
                <td className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">{tx.method}</td>
              </tr>
            ))}
         </tbody>
      </table>
    </GlassCard>
  </div>
)

const CommunicationView = () => (
  <div className="space-y-12">
    <header className="flex items-end justify-between">
      <div>
        <h1 className="text-5xl font-black tracking-tighter text-navy italic">Message Matrix</h1>
        <p className="text-lg font-medium text-slate-400 mt-2">Neural synchronization of administrative and faculty correspondence.</p>
      </div>
      <div className="flex gap-4">
         <button className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm hover:border-navy transition-all"><Settings size={22} /></button>
         <button className="flex items-center gap-3 rounded-2xl bg-navy px-8 py-4 text-sm font-black text-white shadow-xl shadow-navy/20 active:scale-95 uppercase tracking-widest">
            <Mail size={20} /> New Dispatch
         </button>
      </div>
    </header>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
       <div className="lg:col-span-2 space-y-4">
          {messages.map(msg => (
            <motion.div 
               key={msg.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="group flex items-center gap-8 rounded-3xl bg-white p-8 border border-white transition-all hover:shadow-2xl hover:border-mint/30 cursor-pointer"
            >
               <div className="relative">
                 <div className="h-16 w-16 rounded-[24px] bg-slate-50 flex items-center justify-center font-black text-navy/20 text-2xl group-hover:bg-mint group-hover:text-white transition-all">
                   {msg.sender.charAt(0)}
                 </div>
                 {msg.unread && <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 border-2 border-white" />}
               </div>
               <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                   <h4 className="text-xl font-black text-navy">{msg.sender}</h4>
                   <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{msg.time}</span>
                 </div>
                 <p className="text-sm font-medium text-slate-400 line-clamp-1">{msg.preview}</p>
               </div>
               <MoreVertical size={20} className="text-slate-200 group-hover:text-navy cursor-pointer transition-colors" />
            </motion.div>
          ))}
       </div>

       <div className="space-y-8">
          <GlassCard className="bg-gradient-to-br from-mint to-mint-dark text-white border-none shadow-2xl">
             <h3 className="text-lg font-black uppercase tracking-widest mb-6">Active Parents Online</h3>
             <div className="flex -space-x-3 mb-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-mint-dark bg-slate-200 overflow-hidden shadow-xl">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=parent-${i}`} alt="user" />
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black backdrop-blur-md">+12</div>
             </div>
             <p className="text-xs font-medium leading-relaxed opacity-80">Parental engagement is at 88% this session. AI recommends an update on the upcoming gala.</p>
             <button className="mt-8 w-full py-4 rounded-2xl bg-white/10 hover:bg-white hover:text-navy transition-all text-xs font-black uppercase tracking-widest">Blast Global Update</button>
          </GlassCard>
       </div>
    </div>
  </div>
)

const SettingsView = () => (
   <div className="space-y-12">
      <header>
        <h1 className="text-5xl font-black tracking-tighter text-navy italic">System Core</h1>
        <p className="text-lg font-medium text-slate-400 mt-2">Configuration and neural node adjustments.</p>
      </header>
      
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
         <GlassCard className="space-y-10">
            <h3 className="text-2xl font-black text-navy uppercase italic tracking-tighter">Identity & Privacy</h3>
            <div className="space-y-6">
               {[
                 { label: 'System Access Key', value: '•••• •••• •••• 9012', icon: Shield },
                 { label: 'Neural Aesthetic', value: 'Elite Dynamic Mode', icon: Palette },
                 { label: 'Global Notifications', value: 'Real-time Optimized', icon: BellRing }
               ].map(s => (
                 <div key={s.label} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-navy shadow-sm">
                          <s.icon size={22} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                          <p className="text-sm font-bold text-navy mt-1">{s.value}</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300" />
                 </div>
               ))}
            </div>
         </GlassCard>

         <GlassCard className="flex flex-col items-center justify-center text-center p-16">
            <div className="h-28 w-28 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-100 mb-8">
               <LogOut size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-black text-navy uppercase italic tracking-tighter">Session Management</h3>
            <p className="text-sm font-medium text-slate-400 mt-4 max-w-sm">Terminate current synchronized session or establish a new neural node connection.</p>
            <div className="flex gap-4 mt-12 w-full">
               <button className="flex-1 py-5 rounded-2xl bg-navy text-white text-xs font-black uppercase tracking-widest hover:bg-navy-light transition-all shadow-xl shadow-navy/20">Sign Out</button>
               <button className="flex-1 py-5 rounded-2xl border border-slate-200 text-navy text-xs font-black uppercase tracking-widest hover:border-mint transition-all">Lock Node</button>
            </div>
         </GlassCard>
      </div>
   </div>
)

const TeacherAttendanceView = () => (
  <div className="space-y-10">
    <div className="flex items-end justify-between">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)] animate-pulse" />
          <span className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em]">Session Synchronization Active</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-navy italic">Attendance Ops</h1>
        <p className="text-lg font-medium text-slate-400 mt-2">Classroom ID: <span className="text-navy font-black">X-ALPHA-2026</span> | Faculty: Awais MS</p>
      </div>
      <div className="flex gap-4">
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black shadow-sm hover:bg-slate-50 transition-all uppercase tracking-widest">
          <Filter size={18} /> Layer Filter
        </button>
        <button className="rounded-2xl bg-mint px-8 py-4 text-sm font-black text-white shadow-2xl shadow-mint/30 hover:bg-mint-dark transition-all active:scale-95 uppercase tracking-[0.1em]">
          Confirm Session Logs
        </button>
      </div>
    </div>

    <GlassCard className="p-0 overflow-hidden border-none shadow-2xl">
      <table className="w-full text-left">
         <thead className="bg-slate-50/90 backdrop-blur-xl">
            <tr>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Student Profile</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Current Status</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Registry</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Behavioral Observation</th>
               <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Action</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
            {students.map((student, i) => (
              <tr key={student.name} className="hover:bg-white/80 transition-all cursor-default">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-slate-50 to-slate-100 text-navy/10 font-black text-xl shadow-inner border border-white">
                        {student.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white bg-mint shadow-sm" />
                    </div>
                    <div>
                      <p className="text-base font-black text-navy leading-tight tracking-tight">{student.name}</p>
                      <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">Digital ID: 2026-N-{i+100}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                   <div className="relative inline-flex items-center gap-2 rounded-xl bg-mint-light/30 px-4 py-2 text-[11px] font-black text-mint-dark uppercase tracking-widest border border-mint/10">
                     <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                     {student.status}
                   </div>
                </td>
                <td className="px-10 py-6">
                  <span className="text-sm font-black text-navy">{student.grade.toUpperCase()}</span>
                </td>
                <td className="px-10 py-6">
                    <input 
                      type="text" 
                      placeholder="Input neural observation..." 
                      className="w-full rounded-2xl border border-transparent bg-slate-100/50 px-5 py-3.5 text-xs font-bold outline-none transition-all placeholder:text-slate-300 hover:bg-white hover:border-slate-100 focus:bg-white focus:ring-4 focus:ring-mint-light/20"
                    />
                </td>
                <td className="px-10 py-6">
                  <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 transition-all hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg shadow-sm">
                    <MessageSquare size={18} />
                  </button>
                </td>
              </tr>
            ))}
         </tbody>
      </table>
    </GlassCard>
  </div>
)

const ParentOverview = ({ aiAdvice }: { aiAdvice: string }) => (
  <div className="mx-auto max-w-7xl space-y-12">
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1 space-y-10">
        <header>
          <div className="flex items-center gap-6">
             <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 p-[2px] shadow-2xl shadow-indigo-100">
               <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-white overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="Child" />
               </div>
             </div>
             <div>
               <h1 className="text-5xl font-black tracking-tighter text-navy italic uppercase">Alice Johnson</h1>
               <p className="text-lg font-medium text-slate-400 mt-1">Grade 10-A | Academic Merit Profile 2026</p>
             </div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-[56px] bg-[#172B4D] p-12 text-white shadow-[0_50px_100px_-20px_rgba(23,43,77,0.3)] border border-white/10 group">
          <Heart className="absolute -right-12 -top-12 h-64 w-64 rotate-12 opacity-5" />
          <div className="relative z-10">
            <h3 className="text-sm font-black tracking-[0.3em] uppercase opacity-50">Heuristic Learning Score</h3>
            <div className="mt-8 flex items-end gap-4">
              <span className="text-[10rem] font-black leading-none tracking-tighter tabular-nums drop-shadow-2xl">9.2</span>
              <span className="mb-6 text-3xl font-black opacity-30">/10</span>
            </div>
            <p className="mt-12 text-2xl font-medium leading-relaxed opacity-80 max-w-xl">
               "Alice's current cognitive velocity is <span className="text-mint font-black underline decoration-mint/30 underline-offset-8">Optimal</span>. Her recent participation in project simulations exhibits high leadership traits."
            </p>
            <div className="mt-14 flex flex-wrap gap-4">
              {['GLOBAL TOP 3%', 'NEURAL ACCOMODATION', 'ELITE SCHOLAR'].map(tag => (
                <span key={tag} className="rounded-2xl bg-white/5 border border-white/10 px-8 py-3 text-[11px] font-black tracking-widest backdrop-blur-xl">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <GlassCard className="bg-indigo-700 border-none text-white shadow-[0_30px_60px_-15px_rgba(67,56,202,0.4)]">
           <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20">
                <BrainCircuit size={24} className="text-mint" />
              </div>
              <h4 className="text-sm font-black tracking-[0.2em] uppercase">AI Counseling Proxy</h4>
           </div>
           <p className="mt-8 text-xl font-medium leading-relaxed text-indigo-50 drop-shadow-sm">
             "{aiAdvice}"
           </p>
           <button className="mt-10 rounded-2xl bg-white px-8 py-4 text-[11px] font-black text-indigo-700 hover:bg-mint hover:text-white transition-all uppercase tracking-widest active:scale-95 shadow-xl">
             Verify Strategy
           </button>
        </GlassCard>
      </div>

      <div className="w-full space-y-10 lg:w-[420px]">
        <div className="rounded-[52px] border border-slate-100 bg-white p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] transition-all hover:shadow-2xl hover:-translate-y-1 duration-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-slate-300">Financial Status</p>
              <h3 className="mt-4 text-7xl font-black tracking-tighter text-navy leading-none">$120<span className="text-3xl font-black opacity-20">.00</span></h3>
            </div>
            <div className="rounded-3xl bg-orange-50 p-6 text-orange-500">
               <Clock size={36} strokeWidth={1.5} />
            </div>
          </div>
          <button className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-[24px] bg-navy py-6 text-sm font-black text-white shadow-2xl shadow-navy/40 transition-all hover:bg-navy-light mt-12">
              <CreditCard size={22} className="text-mint" /> 
              <span className="uppercase tracking-[0.1em]">Secure Settlement</span>
          </button>
        </div>

        <div className="rounded-[52px] bg-slate-50/50 border border-white p-10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-10">
             <h4 className="text-sm font-black uppercase tracking-[0.3em] text-navy italic">Event Horizon</h4>
             <span className="rounded-full bg-navy/5 px-4 py-1.5 text-[10px] font-black text-navy uppercase tracking-widest">April 2026</span>
          </div>
          <div className="space-y-6">
             {scheduleEvents.slice(0, 2).map(ev => (
               <div key={ev.id} className="group flex items-center gap-6 cursor-pointer">
                  <div className="flex h-16 w-16 flex-none flex-col items-center justify-center rounded-3xl bg-white font-black shadow-sm group-hover:bg-navy group-hover:text-white transition-all">
                    <span className="text-xl leading-none">{ev.id + 20}</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-navy tracking-tight">{ev.title}</p>
                    <p className="text-[11px] font-black text-slate-300 uppercase mt-0.5 tracking-widest">{ev.time}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [role, setRole] = useState('Admin')
  const [isLoaded, setIsLoaded] = useState(false)
  const [aiResponse, setAiResponse] = useState(getAIResponse("status"))

  useEffect(() => {
    setIsLoaded(true)
    setAiResponse(getAIResponse("performance"))
  }, [])

  if (!isLoaded) return null

  return (
    <div className="flex min-h-screen bg-[#f8fbff] font-sans selection:bg-mint selection:text-white antialiased overflow-x-hidden">
      {/* Mesh Background Effect */}
      <div className="fixed inset-0 -z-50 pointer-events-none opacity-60">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-mint-light/20 blur-[150px]" />
        <div className="absolute top-[30%] -right-[20%] h-[60%] w-[60%] rounded-full bg-indigo-100/40 blur-[150px]" />
        <div className="absolute -bottom-[20%] left-[10%] h-[60%] w-[60%] rounded-full bg-blue-50/60 blur-[150px]" />
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-80 border-r border-white/50 bg-white/40 p-10 lg:block z-40 backdrop-blur-3xl">
        <div className="mb-16">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-navy text-white shadow-[0_20px_40px_-10px_rgba(23,43,77,0.4)]">
              <LayoutDashboard size={28} strokeWidth={1.5} />
            </div>
            <div>
              <span className="block text-3xl font-black tracking-tighter text-navy uppercase italic leading-none">EduSync</span>
              <span className="text-[10px] font-black uppercase text-mint tracking-[0.5em] mt-2 ml-1 block">X-Intelligence</span>
            </div>
          </div>
        </div>

        <nav className="space-y-3">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Analytics', icon: TrendingUp },
            { name: 'Schedules', icon: Calendar },
            { name: 'Finance', icon: Wallet },
            { name: 'Communication', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              className={cn(
                "group relative flex w-full items-center gap-5 rounded-[20px] px-6 py-4.5 text-[13px] font-black transition-all duration-500",
                activeTab === item.name 
                  ? 'bg-navy text-white shadow-2xl shadow-navy/30 scale-[1.02]' 
                  : 'text-slate-400 hover:text-navy hover:bg-white/60'
              )}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon size={22} className={cn("transition-all duration-500", activeTab === item.name ? "text-mint scale-110" : "")} />
              <span className="uppercase tracking-[0.1em]">{item.name}</span>
              {activeTab === item.name && (
                <motion.div layoutId="activeTabGlow" className="absolute -left-10 h-10 w-1 bg-mint shadow-[0_0_20px_#2DCE89] blur-[2px]" />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-12 left-10 right-10">
          <div className="relative overflow-hidden rounded-[32px] bg-navy p-8 text-white shadow-2xl shadow-navy/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 mb-6">
              <Globe size={24} className="text-mint" />
            </div>
            <h4 className="text-[11px] font-black tracking-[0.4em] uppercase opacity-40 mb-3">Project Demo</h4>
            <p className="text-sm font-medium leading-relaxed text-slate-200">
              Interactive sandbox mode. AI logic simulated locally.
            </p>
            <button className="mt-8 w-full rounded-2xl bg-white/5 border border-white/10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-navy transition-all">
              Full System Scan
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 flex flex-col">
        <Navbar role={role} setRole={setRole} aiStatus="Simulation Synced" />

        <div className="p-12 max-w-[1700px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${activeTab}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === 'Overview' && (
                <>
                  {role === 'Admin' && <AdminOverview />}
                  {role === 'Teacher' && <TeacherAttendanceView />}
                  {role === 'Parent' && <ParentOverview aiAdvice={aiResponse} />}
                </>
              )}
              {activeTab === 'Analytics' && <AnalyticsView />}
              {activeTab === 'Schedules' && <SchedulesView />}
              {activeTab === 'Finance' && <FinanceView />}
              {activeTab === 'Communication' && <CommunicationView />}
              {activeTab === 'Settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
