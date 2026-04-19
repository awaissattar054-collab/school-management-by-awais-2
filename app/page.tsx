"use client"

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Search, 
  Bell, 
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  GraduationCap,
  Clock,
  Filter,
  CreditCard,
  ChevronDown,
  BrainCircuit,
  Zap,
  MoreHorizontal,
  LogOut,
  Shield,
  Palette,
  BellRing,
  Globe,
  Plus,
  HelpCircle,
  Shapes,
  User,
  BookOpen,
  PieChart as PieIcon,
  MessageCircle,
  FileText,
  Activity,
  CheckCircle2,
  CalendarDays
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
  LineChart,
  Line
} from 'recharts'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Hardcoded Demo Data ---
const demoData = {
  stats: [
    { title: "Total Students", value: "1,250", change: "+4.2%", trend: [40, 50, 45, 60, 55, 70, 65] },
    { title: "Monthly Revenue", value: "$45,000", change: "+12.1%", trend: [30, 35, 40, 38, 45, 48, 50] },
    { title: "Attendance", value: "96%", change: "+0.5%", trend: [94, 95, 94, 96, 95, 96, 97] },
    { title: "Pending Invoices", value: "$2,850", change: "-15.3%", trend: [100, 80, 60, 70, 50, 40, 30] },
  ],
  attendanceTrends: [
    { day: 'Mon', percentage: 94 },
    { day: 'Tue', percentage: 96 },
    { day: 'Wed', percentage: 95 },
    { day: 'Thu', percentage: 97 },
    { day: 'Fri', percentage: 96 },
    { day: 'Sat', percentage: 92 },
    { day: 'Sun', percentage: 0 },
  ],
  upcomingEvents: [
    { id: 1, title: "Parent Teacher Meeting", date: "Oct 24, 2026", time: "10:00 AM" },
    { id: 2, title: "Science Fair 2026", date: "Oct 28, 2026", time: "09:00 AM" },
    { id: 3, title: "Quarterly Fee Deadline", date: "Nov 02, 2026", time: "05:00 PM" },
  ]
};

// --- Components ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-md shadow-saas border border-slate-200/50 p-6 transition-all", className)}>
    {children}
  </div>
)

const Button = ({ children, variant = 'primary', className, ...props }: any) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100"
  }
  return (
    <button className={cn("inline-flex items-center justify-center rounded-md px-5 py-2.5 text-xs font-bold transition-all active:scale-95 gap-2", variants[variant as keyof typeof variants], className)} {...props}>
      {children}
    </button>
  )
}

const SidebarItem = ({ icon: Icon, name, active, onClick }: { icon: any, name: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all rounded-md mb-1",
      active 
        ? "bg-indigo-50 text-indigo-700 font-bold" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon size={16} className={cn(active ? "text-indigo-600" : "text-slate-400")} strokeWidth={2} />
    {name}
  </button>
)

const Sparkline = ({ data, color }: { data: number[], color: string }) => (
  <div className="h-10 w-20">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map(v => ({ v }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)

// --- Views ---

const DashboardOverview = () => (
  <div className="space-y-8">
    {/* 4 Stats Cards */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {demoData.stats.map((stat) => (
        <Card key={stat.title} className="flex items-center justify-between p-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <span className={cn("text-[10px] font-bold", stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                {stat.change}
              </span>
            </div>
          </div>
          <Sparkline data={stat.trend} color={stat.change.startsWith('+') ? "#10B981" : "#F43F5E"} />
        </Card>
      ))}
    </div>

    {/* Main Trend & Side Panel */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
       <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-sm font-bold text-slate-900">Attendance Trend</h3>
                <p className="text-[10px] text-slate-500">Weekly enrollment synchronization pool</p>
             </div>
             <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">Weekly Reports</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <AreaChart data={demoData.attendanceTrends}>
                <defs>
                  <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} domain={[80, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="percentage" stroke="#4F46E5" strokeWidth={3} fill="url(#colorIndigo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
       </Card>

       <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Upcoming Events</h3>
          <div className="space-y-6">
             {demoData.upcomingEvents.map(event => (
               <div key={event.id} className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                  <div className="flex-none w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-none mb-1">{event.title}</h4>
                    <p className="text-[10px] text-slate-500">{event.date} — {event.time}</p>
                  </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-10 py-3 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">View All Schedule</button>
       </Card>
    </div>
  </div>
)

// --- Main Layout Components ---

const DashboardLayout = ({ children, activeTab, setActiveTab }: any) => (
  <div className="flex min-h-screen bg-[#F9FAFB] font-sans selection:bg-indigo-600 selection:text-white">
     {/* Simulation Badge */}
     <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm pointer-events-none">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Simulation Active</span>
     </div>

     {/* Slim Sidebar */}
     <aside className="fixed left-0 top-0 hidden h-full w-64 bg-[#111827] text-white p-6 lg:block z-40">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 bg-indigo-600 rounded-md flex items-center justify-center shadow-xl shadow-indigo-600/30">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-xl font-bold tracking-tight">EduSync</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] leading-none">OS Enterprise</span>
          </div>
        </div>

        <nav className="space-y-6">
           <div>
              <h3 className="px-4 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">General</h3>
              <SidebarItem icon={LayoutDashboard} name="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
              <SidebarItem icon={Activity} name="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
              <SidebarItem icon={BellRing} name="Alerts" active={activeTab === 'Alerts'} onClick={() => setActiveTab('Alerts')} />
           </div>

           <div>
              <h3 className="px-4 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic</h3>
              <SidebarItem icon={Users} name="Students" active={activeTab === 'Students'} onClick={() => setActiveTab('Students')} />
              <SidebarItem icon={Calendar} name="Schedule" active={activeTab === 'Schedule'} onClick={() => setActiveTab('Schedule')} />
              <SidebarItem icon={BookOpen} name="Curriculum" active={activeTab === 'Curriculum'} onClick={() => setActiveTab('Curriculum')} />
           </div>

           <div>
              <h3 className="px-4 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Finance</h3>
              <SidebarItem icon={Wallet} name="Accounts" active={activeTab === 'Accounts'} onClick={() => setActiveTab('Accounts')} />
              <SidebarItem icon={CreditCard} name="Payroll" active={activeTab === 'Payroll'} onClick={() => setActiveTab('Payroll')} />
           </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <SidebarItem icon={Settings} name="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </div>
     </aside>

     {/* Main Body */}
     <main className="flex-1 lg:ml-64 flex flex-col">
        {/* Simplified Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-10 py-5 backdrop-blur-md">
           <div className="relative w-[30rem]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search database records..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-md py-2.5 pl-11 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100"
              />
           </div>

           <div className="flex items-center gap-6">
              <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-white bg-rose-500"></span>
              </button>
              
              <div className="h-6 w-[1px] bg-slate-100" />

              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">Awais Sattar</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">System Admin</p>
                 </div>
                 <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Awais" alt="User" />
                 </div>
              </div>
           </div>
        </header>

        {/* Content with Whitespace */}
        <div className="p-12 max-w-7xl w-full mx-auto">
           {children}
        </div>
     </main>
  </div>
)

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 selection:bg-indigo-600 selection:text-white">
     <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
     >
        <div className="h-20 w-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-3xl shadow-indigo-600/30 mx-auto mb-10">
           <GraduationCap size={44} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 italic">
          EduSync
        </h1>
        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-lg mx-auto leading-tight italic">
          The AI-Powered OS for Modern Schools
        </p>
        
        <div className="mt-16">
           <Button onClick={onLogin} className="px-10 py-5 rounded-2xl text-sm shadow-2xl shadow-indigo-600/20 hover:-translate-y-1 transition-transform">
             Access Command Dashboard
             <ChevronRight size={18} />
           </Button>
        </div>

        <p className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
           Institutional Protocol v1.0.9
        </p>
     </motion.div>
  </div>
)

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => setIsLoaded(true), [])
  if (!isLoaded) return null

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
       {activeTab === 'Dashboard' ? (
         <DashboardOverview />
       ) : (
         <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-200 mb-6">
               <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase italic">Enterprise Sync In-Progress</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">The <span className="font-bold text-navy">{activeTab}</span> module is currently optimized for simulation.</p>
            <Button variant="secondary" onClick={() => setActiveTab('Dashboard')} className="mt-10">Return to Core Dashboard</Button>
         </div>
       )}
    </DashboardLayout>
  )
}
