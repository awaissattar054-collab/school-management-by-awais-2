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
  CalendarDays,
  Mail,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Info
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
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
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
  ],
  students: [
    { id: "ST-2026-001", name: "Ali Khan", grade: "Grade 10-A", parent: "Usman Khan", status: "Active", attendance: "98%" },
    { id: "ST-2026-002", name: "Sara Ahmed", grade: "Grade 9-B", parent: "Ahmed Raza", status: "Active", attendance: "95%" },
    { id: "ST-2026-003", name: "Zainab Malik", grade: "Grade 11-A", parent: "Malik Shah", status: "On Leave", attendance: "88%" },
    { id: "ST-2026-004", name: "Hamza Sheikh", grade: "Grade 12-C", parent: "Sheikh Ilyas", status: "Active", attendance: "92%" },
    { id: "ST-2026-005", name: "Ayesha Noor", grade: "Grade 10-B", parent: "Noor Alam", status: "Probation", attendance: "75%" },
  ],
  performanceData: [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 78 },
    { subject: 'English', score: 92 },
    { subject: 'History', score: 74 },
    { subject: 'Physics', score: 88 },
  ],
  transactions: [
    { id: "TXN-901", date: "Oct 18, 2026", name: "Ali Khan", amount: "$1,200", type: "Fee", status: "Completed" },
    { id: "TXN-902", date: "Oct 18, 2026", name: "Stationery Supply", amount: "$450", type: "Expense", status: "Pending" },
    { id: "TXN-903", date: "Oct 17, 2026", name: "Sara Ahmed", amount: "$1,200", type: "Fee", status: "Completed" },
    { id: "TXN-904", date: "Oct 16, 2026", name: "Utility Bill", amount: "$890", type: "Expense", status: "Completed" },
  ],
  curriculum: [
    { subject: "Mathematics", level: "Advanced", modules: 12, completion: 65 },
    { subject: "Conceptual Physics", level: "Intermediate", modules: 10, completion: 40 },
    { subject: "English Literature", level: "Basic", modules: 8, completion: 90 },
    { subject: "Global History", level: "Advanced", modules: 15, completion: 55 },
  ],
  alerts: [
    { id: 1, type: "Urgent", message: "Water supply maintenance on Block B tomorrow morning.", time: "2h ago" },
    { id: 2, type: "Info", message: "New library memberships are now open for Grade 8-12.", time: "5h ago" },
    { id: 3, type: "Warning", message: "Grade 10 exam papers verification deadline is approaching.", time: "1d ago" },
  ]
};

// --- Color Constants ---
const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// --- UI Components ---

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
    <button className={cn("inline-flex items-center justify-center rounded-md px-5 py-2.5 text-xs font-bold transition-all active:scale-95 gap-2 hover:shadow-md", variants[variant as keyof typeof variants], className)} {...props}>
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

// --- View Components ---

const DashboardOverview = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
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

const AnalyticsView = () => (
  <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
     <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
           <h3 className="text-sm font-bold mb-6 text-slate-900">Academic Subject Performance</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer>
                 <BarChart data={demoData.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <Card>
           <h3 className="text-sm font-bold mb-6 text-slate-900">Student Distribution</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer>
                 <PieChart>
                    <Pie 
                      data={[
                        { name: 'Active', value: 85 },
                        { name: 'Probation', value: 10 },
                        { name: 'On Leave', value: 5 }
                      ]} 
                      cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value"
                    >
                       {COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 flex justify-center gap-6">
              {['Active', 'Probation', 'On Leave'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                   <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                   <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
                </div>
              ))}
           </div>
        </Card>
     </div>
  </div>
)

const AlertsView = () => (
  <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-500">
     {demoData.alerts.map(alert => (
       <Card key={alert.id} className="flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className={cn("p-3 rounded-full", 
               alert.type === 'Urgent' ? 'bg-rose-50 text-rose-500' : 
               alert.type === 'Warning' ? 'bg-orange-50 text-orange-500' : 'bg-indigo-50 text-indigo-500'
             )}>
                {alert.type === 'Urgent' ? <AlertCircle size={20} /> : <Info size={20} />}
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{alert.type} Notification</p>
                <p className="text-sm font-medium text-slate-800">{alert.message}</p>
             </div>
          </div>
          <span className="text-[10px] font-bold text-slate-300 uppercase">{alert.time}</span>
       </Card>
     ))}
  </div>
)

const StudentsView = () => (
   <Card className="p-0 overflow-hidden animate-in fade-in duration-500">
      <table className="w-full text-left">
         <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID Reference</th>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enrollment</th>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Parent Link</th>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
               <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Att.</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
            {demoData.students.map(s => (
              <tr key={s.id} className="hover:bg-slate-50 transition-all cursor-pointer">
                 <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">{s.name.charAt(0)}</div>
                       <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    </div>
                 </td>
                 <td className="px-8 py-5 text-xs text-slate-500 font-mono">{s.id}</td>
                 <td className="px-8 py-5 text-xs font-bold text-indigo-600">{s.grade}</td>
                 <td className="px-8 py-5 text-xs text-slate-500 font-medium">{s.parent}</td>
                 <td className="px-8 py-5">
                    <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", 
                      s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    )}>
                       {s.status}
                    </span>
                 </td>
                 <td className="px-8 py-5 text-xs font-bold text-slate-900">{s.attendance}</td>
              </tr>
            ))}
         </tbody>
      </table>
   </Card>
)

const ScheduleView = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-left-5 duration-500">
     {['Laboratory Session', 'Conceptual Math', 'English Literature', 'Global History'].map((title, i) => (
       <Card key={i} className="relative group overflow-hidden">
          <div className="absolute right-0 top-0 h-1 w-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-6">
             <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                <Clock size={20} />
             </div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Block {i+1}02</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Professor Dr. {['Robert', 'Sarah', 'Malik', 'Ahmed'][i]}</p>
          <div className="mt-8 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-slate-300" />
                <span className="text-[10px] font-bold text-slate-600">Mon, Oct 2{i}</span>
             </div>
             <span className="text-[10px] font-black text-indigo-600">09:00 AM</span>
          </div>
       </Card>
     ))}
  </div>
)

const CurriculumView = () => (
   <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-in fade-in duration-500">
      {demoData.curriculum.map(sub => (
        <Card key={sub.subject} className="flex flex-col gap-6">
           <div className="flex items-start justify-between">
              <div>
                 <h4 className="text-base font-bold text-slate-900">{sub.subject}</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sub.level} Modules</p>
              </div>
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-lg font-bold text-sm">
                 {sub.modules}
              </div>
           </div>
           <div>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Progress</span>
                 <span className="text-[10px] font-black text-indigo-600">{sub.completion}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${sub.completion}%` }} />
              </div>
           </div>
           <Button variant="secondary" className="w-full">Open Syllabus Repository</Button>
        </Card>
      ))}
   </div>
)

const FinanceView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-emerald-500">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Operational Fund</p>
           <h3 className="text-3xl font-bold text-slate-900">$124,500.00</h3>
        </Card>
        <Card className="border-l-4 border-indigo-600">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Inflow</p>
           <h3 className="text-3xl font-bold text-slate-900">$45,000.00</h3>
        </Card>
        <Card className="border-l-4 border-rose-500">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Unsettled Invoices</p>
           <h3 className="text-3xl font-bold text-slate-900">$2,850.00</h3>
        </Card>
     </div>

     <Card className="p-0 overflow-hidden shadow-saas">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
           <h4 className="text-sm font-bold text-slate-900">Recent Financial Activity</h4>
           <Button variant="secondary"><Filter size={14}/> Sort Ledger</Button>
        </div>
        <table className="w-full text-left">
           <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID Reference</th>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Beneficiary/Sender</th>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Volume</th>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sync Type</th>
                 <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {demoData.transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50">
                   <td className="px-8 py-5 text-xs font-mono text-slate-400">{t.id}</td>
                   <td className="px-8 py-5 text-xs text-slate-500">{t.date}</td>
                   <td className="px-8 py-5 text-xs font-bold text-slate-900">{t.name}</td>
                   <td className="px-8 py-5 text-xs font-bold text-slate-900">{t.amount}</td>
                   <td className="px-8 py-5">
                      <span className={cn("px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest", 
                        t.type === 'Fee' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'
                      )}>
                         {t.type}
                      </span>
                   </td>
                   <td className="px-10 py-5">
                      <div className="flex items-center gap-2">
                         <div className={cn("h-1.5 w-1.5 rounded-full", t.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-300')} />
                         <span className="text-[10px] font-bold text-slate-600">{t.status}</span>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
     </Card>
  </div>
)

const SettingsView = () => (
   <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Card>
         <h4 className="text-base font-bold text-slate-900 mb-8">Institutional Identity</h4>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">School Official Name</label>
               <input type="text" value="EduSync Academy of Excellence" className="w-full bg-slate-50 border border-slate-100 rounded-md py-3 px-4 text-xs font-bold text-slate-900" readOnly />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Deployment ID</label>
               <input type="text" value="NODE-SYNC-2026-X01" className="w-full bg-slate-50 border border-slate-100 rounded-md py-3 px-4 text-xs font-bold text-slate-900" readOnly />
            </div>
         </div>
      </Card>

      <Card>
         <h4 className="text-base font-bold text-slate-900 mb-8">Security & Verification</h4>
         <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-slate-400 shadow-sm"><Shield size={20}/></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Neural Encryption Proxy</h5>
                    <p className="text-[10px] text-slate-500">AES-256 Synchronized Institutional Layer</p>
                  </div>
               </div>
               <CheckCircle size={18} className="text-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-slate-400 shadow-sm"><Globe size={20}/></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Global Registry Sync</h5>
                    <p className="text-[10px] text-slate-500">Connected to Universal Student ID Database</p>
                  </div>
               </div>
               <CheckCircle size={18} className="text-emerald-500" />
            </div>
         </div>
      </Card>

      <div className="flex justify-end gap-4">
         <Button variant="secondary">Reset System Factory</Button>
         <Button>Apply Synchronized Settings</Button>
      </div>
   </div>
)

// --- Layout Logic ---

const DashboardLayout = ({ children, activeTab, setActiveTab }: any) => (
  <div className="flex min-h-screen bg-[#F9FAFB] font-sans selection:bg-indigo-600 selection:text-white antialiased">
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
     <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-10 py-5 backdrop-blur-md">
           <div className="relative w-full max-w-[30rem]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search database records..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-md py-2.5 pl-11 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all"
              />
           </div>

           <div className="flex items-center gap-6 ml-4">
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
                 <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-sm transition-transform hover:scale-105 cursor-pointer">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Awais" alt="User" />
                 </div>
              </div>
           </div>
        </header>

        <div className="p-12 max-w-7xl w-full mx-auto">
           <div className="mb-10 flex items-center justify-between">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{activeTab}</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Enterprise Synchronization Node 0x{activeTab.length}A</p>
              </div>
              <div className="flex gap-4">
                 <Button variant="secondary" className="hidden sm:flex tracking-widest uppercase text-[10px]"><Mail size={14}/> Dispatch Log</Button>
                 <Button className="tracking-widest uppercase text-[10px]"><Plus size={14}/> New {activeTab.slice(0, -1)} Entry</Button>
              </div>
           </div>
           
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                 {children}
              </motion.div>
           </AnimatePresence>
        </div>
     </main>
  </div>
)

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 selection:bg-indigo-600 selection:text-white">
     <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
     >
        <div className="h-24 w-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-3xl shadow-indigo-600/30 mx-auto mb-10 transition-transform hover:rotate-12 duration-500 cursor-pointer">
           <GraduationCap size={44} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-4 italic">
          EduSync
        </h1>
        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-lg mx-auto leading-tight italic">
          The AI-Powered OS for Modern Schools
        </p>
        
        <div className="mt-20">
           <Button onClick={onLogin} className="px-14 py-6 rounded-2xl text-base shadow-2xl shadow-indigo-600/20 hover:-translate-y-2 hover:shadow-indigo-600/40 transition-all duration-500">
             Open Command Interface
             <ChevronRight size={22} className="ml-2" />
           </Button>
        </div>

        <p className="mt-16 text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">
           Institutional Protocol v2.4.0
        </p>
     </motion.div>
  </div>
)

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <DashboardOverview />
      case 'Analytics': return <AnalyticsView />
      case 'Alerts': return <AlertsView />
      case 'Students': return <StudentsView />
      case 'Schedule': return <ScheduleView />
      case 'Curriculum': return <CurriculumView />
      case 'Accounts': return <FinanceView />
      case 'Payroll': return <FinanceView /> // Reusing finance for demo
      case 'Settings': return <SettingsView />
      default: return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
       {renderContent()}
    </DashboardLayout>
  )
}
