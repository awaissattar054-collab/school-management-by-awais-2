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
  MoreHorizontal
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { stats, students, getAIResponse } from '@/lib/data'

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Demo Visual Data ---
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 5500 },
  { name: 'Mar', value: 4800 },
  { name: 'Apr', value: 7000 },
  { name: 'May', value: 9000 },
  { name: 'Jun', value: 12500 },
]

const teacherPerformance = [
  { name: 'Mr. Smith', score: 92, subject: 'Math', color: '#6366f1' },
  { name: 'Ms. Alice', score: 88, subject: 'English', color: '#2DCE89' },
  { name: 'Dr. Robert', score: 95, subject: 'Science', color: '#fb6340' },
  { name: 'Ms. Sarah', score: 84, subject: 'History', color: '#f59e0b' },
]

// --- Components ---

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("rounded-3xl border border-white/40 bg-white/60 p-6 shadow-glass backdrop-blur-xl transition-all hover:shadow-xl", className)}>
    {children}
  </div>
)

const Navbar = ({ role, setRole, aiStatus }: { role: string; setRole: (r: string) => void; aiStatus: string }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/20 bg-white/40 px-8 py-4 backdrop-blur-2xl">
    <div className="flex items-center gap-6">
      <div className="relative w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="AI Search students, staff..." 
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-mint focus:bg-white focus:ring-4 focus:ring-mint-light/50"
          onChange={(e) => {
            // Demo effect: trigger AI response check?
          }}
        />
      </div>
      
      <div className="flex rounded-xl bg-slate-100/80 p-1 backdrop-blur-md">
        {['Admin', 'Teacher', 'Parent'].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "rounded-lg px-4 py-1.5 text-xs font-bold transition-all",
              role === r ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy hover:bg-white/50'
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-light/40 border border-mint/20">
         <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
         <span className="text-[10px] font-black text-mint-dark uppercase tracking-widest">{aiStatus}</span>
      </div>
      <button className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:shadow-sm">
        <Bell size={20} />
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full border-2 border-white bg-rose-500 animate-pulse"></span>
      </button>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1.5 pr-4 shadow-sm hover:border-mint transition-all cursor-pointer">
        <div className="h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-mint to-mint-dark">
           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="User" />
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">{role}</p>
          <p className="text-xs font-bold text-navy mt-1">Guest User</p>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </div>
  </header>
)

const AdminOverview = () => (
  <div className="space-y-8">
    <div className="flex items-end justify-between">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
          <span className="text-[10px] font-bold text-mint uppercase tracking-widest">Demo Version Active</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy">Global Intelligence</h1>
        <p className="text-sm font-medium text-slate-500">Live summary of school operations and AI analytics.</p>
      </header>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold shadow-sm border border-slate-100 hover:border-mint transition-all">
          <Calendar size={18} /> Schedule
        </button>
        <button className="flex items-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-xl shadow-navy/20 hover:bg-navy-light transition-all active:scale-95">
          <Zap size={18} /> Generate Report
        </button>
      </div>
    </div>

    {/* Admin Stats */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const icons = [Users, Wallet, Calendar, AlertTriangle];
        const colors = [
          'from-indigo-500 to-blue-600', 
          'from-mint to-mint-dark', 
          'from-orange-400 to-orange-600', 
          'from-purple-500 to-pink-500'
        ];
        const Icon = icons[i] || Users;
        const color = colors[i] || colors[0];
        
        return (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[32px] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className={cn("absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-5 transition-transform group-hover:scale-150", color)} />
            <div className="flex items-center justify-between">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", color)}>
                <Icon size={22} />
              </div>
              <div className={cn("flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black", stat.change.startsWith('+') ? 'bg-mint-light text-mint' : 'bg-rose-50 text-rose-500')}>
                {stat.change.startsWith('+') ? <TrendingUp size={10} /> : <AlertTriangle size={10} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{stat.title}</p>
              <h3 className="mt-1 text-3xl font-black tracking-tight text-navy">{stat.value}</h3>
            </div>
          </motion.div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <GlassCard>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-navy tracking-tight">Financial Growth</h3>
            <p className="text-xs font-bold text-slate-400">Quarterly trend analysis</p>
          </div>
          <select className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold outline-none cursor-pointer">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorMint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DCE89" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2DCE89" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="value" stroke="#2DCE89" strokeWidth={4} fillOpacity={1} fill="url(#colorMint)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-navy tracking-tight">Faculty Spotlight</h3>
            <p className="text-xs font-bold text-slate-400">Quality of Instruction metric</p>
          </div>
          <button className="text-slate-400 hover:text-navy"><MoreHorizontal size={20}/></button>
        </div>
        <div className="space-y-6">
          {teacherPerformance.map((t, i) => (
            <motion.div 
              key={t.name} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-lg" style={{ backgroundColor: t.color }}>
                    {t.name.split(' ')[1].charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-black text-navy">{t.name}</span>
                    <span className="block text-[10px] font-bold text-slate-400">{t.subject} Dept.</span>
                  </div>
                </div>
                <span className="text-xs font-black text-navy">{t.score}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${t.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full group-hover:brightness-110 transition-all"
                  style={{ backgroundColor: t.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
)

const TeacherAttendanceView = () => (
  <div className="space-y-8">
    <div className="flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Live Roster</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy italic uppercase">Duty Attendance</h1>
        <p className="text-sm font-medium text-slate-500">Managing Session A | Intelligence Mode</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black shadow-sm hover:bg-slate-50 transition-all">
          <Filter size={18} /> Sort
        </button>
        <button className="rounded-2xl bg-mint px-6 py-3 text-sm font-black text-white shadow-xl shadow-mint/20 hover:bg-mint-dark transition-all active:scale-95">
          Mark All Present
        </button>
      </div>
    </div>

    <GlassCard className="overflow-hidden border-none p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 backdrop-blur-md">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Identity</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Grade Level</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Observation</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">System Log</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student, i) => (
              <motion.tr 
                key={student.name} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-white transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-light/50 text-mint font-black text-lg shadow-inner">
                        {student.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-mint" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-navy leading-tight">{student.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">UIN: #EDU-2026-{i}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-light px-3 py-1 text-[10px] font-black text-mint uppercase">
                     <CheckCircle2 size={12} /> {student.status}
                   </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-black text-navy">{student.grade}</span>
                </td>
                <td className="px-8 py-5">
                  <input 
                    type="text" 
                    placeholder="Log daily remark..." 
                    className="w-full rounded-xl border border-transparent bg-slate-50/50 px-4 py-2.5 text-xs font-medium outline-none transition-all placeholder:text-slate-400 group-hover:bg-white group-hover:border-slate-100 focus:bg-white focus:ring-1 focus:ring-mint"
                  />
                </td>
                <td className="px-8 py-5">
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all hover:bg-navy hover:text-white">
                    <MessageSquare size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </div>
)

const ParentOverview = ({ aiAdvice }: { aiAdvice: string }) => (
  <div className="mx-auto max-w-7xl space-y-10">
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Left Column: Student Highlight */}
      <div className="flex-1 space-y-8">
        <header>
          <div className="flex items-center gap-3">
             <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-[2px]">
               <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="Child" />
               </div>
             </div>
             <div>
               <h1 className="text-3xl font-black tracking-tight text-navy">Child Portal</h1>
               <p className="text-sm font-bold text-slate-400">Overview for Alice J. | Demo Enrollment</p>
             </div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-mint to-mint-dark p-10 text-white shadow-[0_32px_64px_-16px_rgba(45,206,137,0.3)]">
          <Heart className="absolute -right-8 -top-8 h-48 w-48 rotate-12 opacity-10" />
          <div className="relative z-10">
            <h3 className="text-lg font-black tracking-widest uppercase opacity-70">Focus Score</h3>
            <div className="mt-6 flex items-end gap-3">
              <span className="text-8xl font-black leading-none tracking-tighter tabular-nums">9.2</span>
              <span className="mb-4 text-2xl font-black opacity-50">/ 10</span>
            </div>
            <p className="mt-8 text-lg font-medium leading-relaxed opacity-90 max-w-md">
               Alice's current learning velocity is <span className="font-black">Optimal</span>. Her engagement in group projects is exceptional this quarter.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {['ACADEMIC STAR', 'DEMO TOPPER'].map(tag => (
                <span key={tag} className="rounded-2xl bg-white/20 px-5 py-2 text-[10px] font-black backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <GlassCard className="bg-indigo-600 border-none text-white shadow-indigo-200">
           <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <BrainCircuit size={20} />
              </div>
              <h4 className="text-sm font-black tracking-wide uppercase">AI Advisory Sync</h4>
           </div>
           <p className="mt-5 text-sm font-medium leading-relaxed text-indigo-50">
             "{aiAdvice}"
           </p>
           <button className="mt-8 rounded-xl bg-white/10 px-4 py-2 text-[10px] font-black hover:bg-white/20 transition-all uppercase tracking-widest">
             Apply Advice
           </button>
        </GlassCard>
      </div>

      {/* Right Column: Practical Details */}
      <div className="w-full space-y-8 lg:w-96">
        <div className="rounded-[40px] border border-slate-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Demo Balance</p>
              <h3 className="mt-2 text-5xl font-black tracking-tight text-navy leading-none">$120<span className="text-2xl font-bold opacity-30">.00</span></h3>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-orange-500">
               <Clock size={28} />
            </div>
          </div>
          <div className="mt-8 space-y-4">
             <button className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-navy py-5 text-sm font-black text-white shadow-2xl shadow-navy/20 transition-all hover:bg-navy-light active:scale-95">
                <CreditCard size={20} /> Pay Demo Fees
                <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute right-6">
                  <ChevronRight size={20} />
                </motion.div>
             </button>
          </div>
        </div>

        <div className="rounded-[40px] bg-slate-50 p-8">
          <div className="flex items-center justify-between mb-6">
             <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Events</h4>
             <span className="text-[10px] font-bold text-navy">APRIL</span>
          </div>
          <div className="space-y-4">
             {[
               { date: '21', event: 'Mock Exam Results', time: '10:00 AM' },
               { date: '25', event: 'Spring Carnival', time: '01:00 PM' },
             ].map(ev => (
               <div key={ev.date} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-none flex-col items-center justify-center rounded-2xl bg-white font-black shadow-sm">
                    <span className="text-navy">{ev.date}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-navy">{ev.event}</p>
                    <p className="text-[10px] font-bold text-slate-400">{ev.time}</p>
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
    // Simulate initial AI check
    setAiResponse(getAIResponse("performance"))
  }, [])

  if (!isLoaded) return null

  return (
    <div className="flex min-h-screen bg-[#f8fbff] font-sans selection:bg-mint selection:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-slate-100 bg-white p-8 lg:block z-40">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-navy text-white shadow-2xl shadow-navy/40">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tighter text-navy leading-none">EduSync</span>
              <span className="text-[10px] font-black uppercase text-mint tracking-[0.2em] mt-1 ml-1">Demo v1.0</span>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
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
                "group relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-black transition-all",
                activeTab === item.name 
                  ? 'bg-navy text-white shadow-2xl shadow-navy/30' 
                  : 'text-slate-400 hover:text-navy hover:bg-slate-50'
              )}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon size={20} className={cn("transition-transform group-hover:scale-110", activeTab === item.name ? "text-mint" : "")} />
              {item.name}
              {activeTab === item.name && (
                <motion.div layoutId="activeTab" className="absolute right-3 h-1.5 w-1.5 rounded-full bg-mint" />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-8 right-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-mint/20" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-white mb-4">
              <Smile size={20} />
            </div>
            <h4 className="text-xs font-black tracking-widest uppercase">System Status</h4>
            <p className="mt-2 text-[10px] font-bold text-slate-400 leading-relaxed">
              Frontend demo mode only. All systems nominal.
            </p>
            <button className="mt-6 w-full rounded-xl bg-white/10 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all hover:text-navy">
              Reset Demo
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 flex flex-col">
        <Navbar role={role} setRole={setRole} aiStatus="Simulation Active" />

        <div className="p-10 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {activeTab === 'Overview' ? (
                <>
                  {role === 'Admin' && <AdminOverview />}
                  {role === 'Teacher' && <TeacherAttendanceView />}
                  {role === 'Parent' && <ParentOverview aiAdvice={aiResponse} />}
                </>
              ) : (
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-slate-100 text-slate-300 mb-6 border border-slate-200">
                    <Zap size={48} strokeWidth={1} />
                  </div>
                  <h2 className="text-2xl font-black text-navy uppercase italic tracking-tighter">Demo Restricted</h2>
                  <p className="mt-2 text-sm font-bold text-slate-400 max-w-sm">
                    In this frontend-only demo, the <span className="text-navy">{activeTab}</span> module is simulated via the Overview tab.
                  </p>
                  <button 
                    onClick={() => setActiveTab('Overview')}
                    className="mt-10 rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] shadow-sm border border-slate-100 hover:border-mint transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mesh Background Effect */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-mint-light/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-100/30 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>
    </div>
  )
}
