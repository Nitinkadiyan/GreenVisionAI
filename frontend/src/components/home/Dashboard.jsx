// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import {
//   Menu,
//   X,
//   Search,
//   Bell,
//   Settings,
//   Plus,
//   MapPin,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Users,
//   Eye,
//   MessageSquare,
//   Download,
//   Filter,
//   Flame,
//   TrendingUp,
//   Award,
//   Zap,
// } from 'lucide-react';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [reportModalOpen, setReportModalOpen] = useState(false);
//   const [hoveredReport, setHoveredReport] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     type: '',
//     location: '',
//     description: '',
//   });

//   const stats = [
//     { label: 'My Reports', value: '28', unit: 'submitted', color: 'from-blue-400 to-blue-600', icon: MapPin },
//     { label: 'Resolved', value: '18', unit: 'completed', color: 'from-green-400 to-green-600', icon: CheckCircle },
//     { label: 'In Progress', value: '8', unit: 'pending', color: 'from-yellow-400 to-yellow-600', icon: Clock },
//     { label: 'Contributions', value: '12', unit: 'cleanups', color: 'from-purple-400 to-purple-600', icon: Zap },
//   ];

//   const recentReports = [
//     {
//       id: 1,
//       type: 'Plastic Waste',
//       location: 'Sector 21, Block A',
//       date: 'Today, 2:30 PM',
//       status: 'Completed',
//       views: 234,
//       comments: 12,
//       severity: 'high',
//       color: 'from-blue-50 to-blue-100',
//     },
//     {
//       id: 2,
//       type: 'Construction Debris',
//       location: 'Downtown Main Street',
//       date: 'Yesterday, 5:15 PM',
//       status: 'In Progress',
//       views: 156,
//       comments: 8,
//       severity: 'critical',
//       color: 'from-orange-50 to-orange-100',
//     },
//     {
//       id: 3,
//       type: 'Overflowing Dustbin',
//       location: 'City Center Market',
//       date: '2 days ago',
//       status: 'Pending Review',
//       views: 89,
//       comments: 5,
//       severity: 'medium',
//       color: 'from-yellow-50 to-yellow-100',
//     },
//     {
//       id: 4,
//       type: 'Air Quality Issue',
//       location: 'Industrial Park',
//       date: '3 days ago',
//       status: 'Resolved',
//       views: 412,
//       comments: 23,
//       severity: 'low',
//       color: 'from-green-50 to-green-100',
//     },
//   ];

//   const communityActivity = [
//     { name: 'Rahul Kumar', action: 'reported illegal dumping at Riverside Park', time: '2h ago', avatar: '👨' },
//     { name: 'Neha Singh', action: 'completed community cleanup task', time: '4h ago', avatar: '👩' },
//     { name: 'Authority', action: 'approved and resolved 8 reports', time: '1 day ago', avatar: '🏛️' },
//     { name: 'Priya Patel', action: 'joined cleanup initiative for beach area', time: '2 days ago', avatar: '👩' },
//   ];

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Completed':
//         return 'bg-green-100 text-green-700 border border-green-300';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-700 border border-blue-300';
//       case 'Pending Review':
//         return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
//       case 'Resolved':
//         return 'bg-emerald-100 text-emerald-700 border border-emerald-300';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const filteredReports = recentReports.filter(
//     (report) =>
//       (selectedFilter === 'all' || report.type.toLowerCase().includes(selectedFilter.toLowerCase())) &&
//       (searchQuery === '' ||
//         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         report.location.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     console.log('New report:', formData);
//     setFormData({ title: '', type: '', location: '', description: '' });
//     setReportModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
//         <div className="flex items-center justify-between px-4 md:px-6 py-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-slate-100 rounded-lg transition"
//             >
//               {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//             <h1 className="text-2xl font-bold text-slate-900">GreenVision</h1>
//           </div>

//           <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md mx-6">
//             <Search className="w-5 h-5 text-slate-400 absolute ml-3" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search reports, locations..."
//               className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-sm"
//             />
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </motion.button>
//             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
//               <Settings className="w-5 h-5" />
//             </button>
//             <div className="w-9 h-9 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-80 transition">
//               JD
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <AnimatePresence>
//           {sidebarOpen && (
//             <motion.aside
//               initial={{ x: -280, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -280, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-4"
//             >
//               <nav className="space-y-1 flex-1">
//                 {['Dashboard', 'My Reports', 'Live Map', 'Community', 'Leaderboard'].map((item) => (
//                   <motion.button
//                     key={item}
//                     whileHover={{ x: 4 }}
//                     className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
//                       item === 'Dashboard'
//                         ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
//                         : 'text-slate-700 hover:bg-slate-100'
//                     }`}
//                   >
//                     {item}
//                   </motion.button>
//                 ))}
//               </nav>
//               <div className="pt-4 border-t border-slate-200 space-y-3">
//                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-4">Quick Stats</p>
//                 <motion.div whileHover={{ scale: 1.02 }} className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg cursor-pointer border border-green-200 hover:border-green-300 transition">
//                   <p className="text-xs text-slate-600">Eco Points</p>
//                   <p className="text-2xl font-bold text-green-600 mt-1">1,240</p>
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.02 }} className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg cursor-pointer border border-blue-200 hover:border-blue-300 transition">
//                   <p className="text-xs text-slate-600">Your Rank</p>
//                   <p className="text-2xl font-bold text-blue-600 mt-1">#42</p>
//                 </motion.div>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-4 md:p-8">
//           {/* Welcome & Quick Action */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
//               <p className="text-slate-600 mt-1">Here's your environmental impact dashboard</p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setReportModalOpen(true)}
//               className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg hover:shadow-xl"
//             >
//               <Plus className="w-5 h-5" /> Report Issue Now
//             </motion.button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ translateY: -5, boxShadow: '0 20px 25px -5rgba(0,0,0,0.1)' }}
//                 className="bg-white rounded-lg border border-slate-200 p-6 cursor-pointer overflow-hidden relative group"
//               >
//                 <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition`}></div>
//                 <div className="relative flex items-start justify-between">
//                   <div>
//                     <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
//                     <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
//                     <p className="text-slate-500 text-xs mt-2">{stat.unit}</p>
//                   </div>
//                   <motion.div whileHover={{ scale: 1.2 }} className={`bg-linear-to-br ${stat.color} p-3 rounded-lg`}>
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row gap-3 mb-6">
//             <div className="flex gap-2 flex-wrap">
//               {['all', 'Plastic', 'Construction', 'Air', 'Water'].map((filter) => (
//                 <motion.button
//                   key={filter}
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setSelectedFilter(filter)}
//                   className={`px-4 py-2 rounded-lg font-medium transition ${
//                     selectedFilter === filter
//                       ? 'bg-green-500 text-white shadow-lg'
//                       : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
//                   }`}
//                 >
//                   {filter === 'all' ? 'All Issues' : filter}
//                 </motion.button>
//               ))}
//             </div>
//             <div className="flex gap-2 ml-auto">
//               <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition">
//                 <Filter className="w-4 h-4" /> Filter
//               </button>
//               <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition">
//                 <Download className="w-4 h-4" /> Export
//               </button>
//             </div>
//           </div>

//           {/* Reports Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <AnimatePresence mode="popLayout">
//               {filteredReports.map((report, idx) => (
//                 <motion.div
//                   key={report.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ delay: idx * 0.1 }}
//                   onMouseEnter={() => setHoveredReport(report.id)}
//                   onMouseLeave={() => setHoveredReport(null)}
//                   whileHover={{ y: -8 }}
//                   className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition cursor-pointer"
//                 >
//                   <div className={`bg-linear-to-br ${report.color} h-32 relative flex items-center justify-center overflow-hidden`}>
//                     <MapPin className="w-16 h-16 text-slate-400 opacity-50" />
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={hoveredReport === report.id ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
//                       className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold"
//                       >
//                         View Details →
//                       </motion.button>
//                     </motion.div>
//                   </div>

//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-3">
//                       <h3 className="text-lg font-bold text-slate-900 flex-1">{report.type}</h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(report.status)}`}>
//                         {report.status}
//                       </span>
//                     </div>

//                     <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" /> {report.location}
//                     </p>
//                     <p className="text-xs text-slate-500 mb-4">{report.date}</p>

//                     <div className="flex items-center justify-between pt-4 border-t border-slate-200 gap-3">
//                       <div className="flex gap-4 text-sm">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           className="flex items-center gap-1 text-slate-600 hover:text-blue-500 transition"
//                         >
//                           <Eye className="w-4 h-4" /> {report.views}
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           className="flex items-center gap-1 text-slate-600 hover:text-green-500 transition"
//                         >
//                           <MessageSquare className="w-4 h-4" /> {report.comments}
//                         </motion.button>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs font-medium transition"
//                       >
//                         👍
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {filteredReports.length === 0 && (
//             <div className="text-center py-12">
//               <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//               <p className="text-slate-600 font-medium">No reports found</p>
//             </div>
//           )}

//           {/* Community Activity */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-lg border border-slate-200 p-6"
//           >
//             <h3 className="text-lg font-bold text-slate-900 mb-6">Community Activity</h3>
//             <div className="space-y-4">
//               {communityActivity.map((activity, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ x: 8 }}
//                   className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0 cursor-pointer group"
//                 >
//                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition">
//                     {activity.avatar}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-900">
//                       {activity.name}{' '}
//                       <span className="font-normal text-slate-600">{activity.action}</span>
//                     </p>
//                     <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </main>
//       </div>

//       {/* Report Modal */}
//       <AnimatePresence>
//         {reportModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setReportModalOpen(false)}
//               className="absolute inset-0 bg-black bg-opacity-50"
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-linear-to-r from-green-50 to-green-100 border-b border-green-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-slate-900">Report Environmental Issue</h2>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setReportModalOpen(false)}
//                   className="p-1 hover:bg-green-200 rounded-lg transition"
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               <form onSubmit={handleReportSubmit} className="p-6 space-y-5">
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
//                   <label className="block text-sm font-semibold text-slate-900 mb-2">Issue Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
//                     placeholder="e.g., Plastic waste near park"
//                     required
//                   />
//                 </motion.div>

//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//                   <label className="block text-sm font-semibold text-slate-900 mb-2">Issue Type</label>
//                   <select
//                     value={formData.type}
//                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
//                     required
//                   >
//                     <option value="">Select issue type</option>
//                     <option value="Plastic">Plastic Waste</option>
//                     <option value="Water">Water Pollution</option>
//                     <option value="Air">Air Quality</option>
//                     <option value="Waste">Illegal Dumping</option>
//                   </select>
//                 </motion.div>

//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//                   <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
//                     placeholder="Enter location or address"
//                     required
//                   />
//                 </motion.div>

//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
//                   <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition resize-none"
//                     placeholder="Describe the environmental issue in detail..."
//                     rows="4"
//                   />
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex gap-3 pt-4"
//                 >
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     onClick={() => setReportModalOpen(false)}
//                     className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="flex-1 px-4 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl"
//                   >
//                     Submit Report ✓
//                   </motion.button>
//                 </motion.div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Dashboard;

"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Coins,
  FileText,
  Filter,
  Gift,
  HandHeart,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Map as MapIcon,
  MapPin,
  Menu,
  MoreHorizontal,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";

const reports = [
  {
    id: "GV-1024",
    title: "Illegal Plastic Waste",
    category: "Plastic Waste",
    location: "Koramangala, Bangalore",
    date: "Aug 24, 2026",
    status: "Accepted by Government",
    severity: "High",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=80",
    response: "Cleanup task assigned",
    description:
      "A large accumulation of single-use plastic waste has been blocking the stormwater drain near the community park.",
  },
  {
    id: "GV-1019",
    title: "Open Dumping Near Lake",
    category: "Illegal Dumping",
    location: "Bellandur Lake, Bangalore",
    date: "Aug 18, 2026",
    status: "Pending Review",
    severity: "Medium",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=500&q=80",
    response: "Awaiting review",
    description:
      "Mixed household waste was found dumped along the eastern service road of the lake.",
  },
  {
    id: "GV-1008",
    title: "Overflowing Community Bin",
    category: "Waste Management",
    location: "Indiranagar, Bangalore",
    date: "Aug 10, 2026",
    status: "Resolved",
    severity: "Low",
    image:
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=500&q=80",
    response: "Issue resolved",
    description:
      "The community collection point was overflowing for several days and attracting stray animals.",
  },
];

const cleanupTasks = [
  {
    id: 1,
    title: "Plastic Waste Cleanup",
    location: "Koramangala, Bangalore",
    reward: "₹500",
    priority: "High",
    deadline: "Aug 30, 2026",
    status: "Available",
    guideline:
      "Collect, segregate, and safely hand over plastic waste to the partner collection center.",
  },
  {
    id: 2,
    title: "Lake Shore Restoration",
    location: "Bellandur Lake, Bangalore",
    reward: "₹750",
    priority: "Medium",
    deadline: "Sep 04, 2026",
    status: "Available",
    guideline:
      "Remove visible litter from the marked shoreline area without disturbing the habitat.",
  },
  {
    id: 3,
    title: "Community Bin Reset",
    location: "Indiranagar, Bangalore",
    reward: "₹350",
    priority: "Low",
    deadline: "Sep 08, 2026",
    status: "Assigned",
    guideline:
      "Clean the collection point and attach the provided segregation reminder.",
  },
];

const navReports = [
  "All Reports",
  "Pending Review",
  "Accepted by Government",
  "Rejected by Government",
  "Assigned Cleanup",
  "In Progress",
  "Completed",
];
const stats = [
  [
    "My Reports",
    "24",
    "Total submitted",
    FileText,
    "bg-emerald-50 text-emerald-700",
  ],
  [
    "Pending Reports",
    "3",
    "Awaiting government review",
    Clock3,
    "bg-amber-50 text-amber-700",
  ],
  [
    "Active Volunteer Tasks",
    "2",
    "Currently in progress",
    Activity,
    "bg-sky-50 text-sky-700",
  ],
  [
    "Completed Tasks",
    "12",
    "Successfully completed",
    CheckCircle2,
    "bg-violet-50 text-violet-700",
  ],
  [
    "Total Rewards",
    "₹2,450",
    "Total earned",
    Gift,
    "bg-orange-50 text-orange-700",
  ],
  [
    "My Stars",
    "1,240",
    "Community contribution score",
    Star,
    "bg-lime-50 text-lime-700",
  ],
];

function Badge({ children, tone = "slate" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    blue: "bg-sky-50 text-sky-700 ring-sky-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Avatar({ small = false }) {
  return (
    <div
      className={`${small ? "h-9 w-9" : "h-11 w-11"} overflow-hidden rounded-full bg-emerald-100 ring-2 ring-white`}
    >
      <img
        className="h-full w-full object-cover"
        src="https://i.pravatar.cc/120?img=12"
        alt="Jatin Kumar"
      />
    </div>
  );
}

function Sidebar({
  view,
  setView,
  reportsOpen,
  setReportsOpen,
  mobileOpen,
  setMobileOpen,
  setLogout,
}) {
  const nav = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["reports", FileText, "My Reports"],
    ["volunteer", HandHeart, "Become a Volunteer"],
    ["tasks", ClipboardCheck, "My Cleanup Tasks"],
    ["map", MapIcon, "Map"],
    ["notifications", Bell, "Notifications"],
    ["profile", User, "My Profile"],
  ];
  const counts = {
    "Pending Review": 2,
    "Accepted by Government": 4,
    "Rejected by Government": 1,
    "Assigned Cleanup": 2,
    "In Progress": 1,
    Completed: 7,
  };
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform lg:translate-x-0 lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-left"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <Sparkles size={20} />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              GreenVision <span className="text-emerald-600">AI</span>
            </span>
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50/70 p-3">
          <div className="relative">
            <Avatar small />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-800">
              Jatin Kumar
            </p>
            <p className="truncate text-xs text-slate-500">Bangalore, India</p>
          </div>
          <button
            aria-label="Edit profile"
            onClick={() => setView("profile")}
            className="text-emerald-600"
          >
            <Pencil size={15} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>
          {nav.map(([key, Icon, label]) => (
            <div key={key}>
              <button
                onClick={() =>
                  key === "reports"
                    ? setReportsOpen(!reportsOpen)
                    : (setView(key), setMobileOpen(false))
                }
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${view === key || (key === "reports" && view === "reportDetail") ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{label}</span>
                {key === "reports" ? (
                  <ChevronDown
                    size={15}
                    className={`transition ${reportsOpen ? "rotate-180" : ""}`}
                  />
                ) : (
                  key === "notifications" && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                      3
                    </span>
                  )
                )}
              </button>
              {key === "reports" && reportsOpen && (
                <div className="ml-8 mt-1 space-y-0.5 border-l border-emerald-100 pl-3">
                  {navReports.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setView("reports");
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <span>{item}</span>
                      {counts[item] && (
                        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold">
                          {counts[item]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <button
            onClick={() => setView("contribution")}
            className="flex w-full items-center gap-3 rounded-xl bg-amber-50 px-3 py-3 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
              <Trophy size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-bold text-slate-700">
                My Contribution
              </span>
              <span className="block text-xs text-amber-700">1,240 Stars</span>
            </span>
            <ChevronRight size={15} className="text-amber-500" />
          </button>
          <button
            onClick={() => setLogout(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ setView, setMobileOpen, query, setQuery }) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div>
          <p className="text-sm font-medium text-slate-500">
            Welcome back, Jatin
          </p>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            Let&apos;s make our environment cleaner together.
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 sm:flex">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports"
            className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          onClick={() => setView("map")}
          className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 sm:block"
          aria-label="Open map"
        >
          <MapIcon size={18} />
        </button>
        <button
          onClick={() => setView("notifications")}
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
          aria-label="Open notifications"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <button onClick={() => setView("profile")} aria-label="Open profile">
          <Avatar small />
        </button>
      </div>
    </header>
  );
}

function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
        >
          {action}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

function Dashboard({ setView, query }) {
  const filtered = reports.filter((r) =>
    `${r.title} ${r.category} ${r.location}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-8 p-5 md:p-8">
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 p-6 text-white shadow-xl shadow-emerald-100 md:p-9">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
            <Zap size={14} />
            Small actions. Big impact.
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Make an Impact Today
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50 md:text-base">
            Report environmental issues, participate in cleanup activities, and
            help build cleaner communities.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => setView("reports")}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50"
            >
              + Add New Report
            </button>
            <button
              onClick={() => setView("volunteer")}
              className="rounded-xl bg-emerald-800/30 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-emerald-800/50"
            >
              Explore Cleanup Tasks
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-28 border-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full border-20 border-white/10" />
      </section>
      <section>
        <SectionTitle
          title="Your impact at a glance"
          subtitle="Keep up the momentum — your community is counting on you."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(([name, value, sub, Icon, color]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{name}</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>
                </div>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
                >
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionTitle
          title="My Reports"
          subtitle="Track your latest environmental reports."
          action="View All"
          onAction={() => setView("reports")}
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {filtered.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={() => setView("reportDetail")}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            No reports match your search.
          </div>
        )}
      </section>
    </div>
  );
}

function ReportCard({ report, onClick }) {
  const tone =
    report.status === "Resolved"
      ? "green"
      : report.status === "Pending Review"
        ? "amber"
        : "blue";
  return (
    <button
      onClick={onClick}
      className="group flex w-full gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <img
        src={report.image}
        alt={report.title}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="truncate font-bold text-slate-800">{report.title}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              {report.category}
            </p>
          </div>
          <MoreHorizontal size={18} className="shrink-0 text-slate-300" />
        </div>
        <p className="mt-3 flex items-center gap-1 truncate text-xs text-slate-500">
          <MapPin size={13} />
          {report.location}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={tone}>{report.status}</Badge>
          <span className="text-[11px] text-slate-400">{report.date}</span>
        </div>
      </div>
    </button>
  );
}

function ReportsView({ setView, query, setQuery }) {
  const [filter, setFilter] = useState("All");
  const list = reports.filter(
    (r) =>
      (filter === "All" || r.status.includes(filter)) &&
      `${r.title} ${r.location}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Reports"
        subtitle="A complete record of the issues you have helped surface."
        action="Add New Report"
        onAction={() => setView("reportDetail")}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
          <Filter size={15} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent font-semibold outline-none"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Resolved</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-36 outline-none"
          />
        </div>
      </div>
      <div className="space-y-4">
        {list.map((r) => (
          <ReportCard
            key={r.id}
            report={r}
            onClick={() => setView("reportDetail")}
          />
        ))}
      </div>
    </div>
  );
}

function ReportDetail({ setView }) {
  const report = reports[0];
  return (
    <div className="p-5 md:p-8">
      <button
        onClick={() => setView("reports")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={16} />
        Back to My Reports
      </button>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Report #{report.id}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {report.title}
          </h2>
        </div>
        <Badge tone="blue">{report.status}</Badge>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <img
              src={report.image}
              alt={report.title}
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {report.description}
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-2">
                  <MapPin size={17} className="text-emerald-600" />
                  {report.location}
                </p>
                <p className="flex gap-2">
                  <CalendarDays size={17} className="text-emerald-600" />
                  Submitted {report.date}
                </p>
                <p className="flex gap-2">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  12.9716° N, 77.5946° E
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
                <Sparkles size={19} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">
                  AI Environmental Analysis
                </h3>
                <p className="text-xs text-slate-500">
                  Analysis completed automatically
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Waste Type", "Plastic"],
                ["Confidence", "94%"],
                ["Severity", "High"],
                ["Estimated Waste", "35 kg"],
              ].map(([a, b]) => (
                <div key={a}>
                  <p className="text-xs text-slate-500">{a}</p>
                  <p className="mt-1 font-bold text-slate-800">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              The system identified a significant plastic waste cluster near a
              public drainage channel. Immediate removal is recommended to
              prevent waterway contamination.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Timeline />
          <CleanupPanel />
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  const steps = [
    "Report Submitted",
    "AI Analysis Completed",
    "Accepted by Government",
    "Cleanup Task Assigned",
    "Volunteer Accepted",
    "Cleanup In Progress",
    "Completion Submitted",
    "Government Review",
    "Resolved",
  ];
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="font-bold text-slate-900">Government Response</h3>
      <div className="mt-5 space-y-0">
        {steps.map((step, i) => (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${i < 6 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {i < 6 ? (
                  <Check size={13} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                )}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={`h-6 w-px ${i < 5 ? "bg-emerald-200" : "bg-slate-200"}`}
                />
              )}
            </div>
            <p
              className={`pb-2 text-sm ${i < 6 ? "font-semibold text-slate-700" : "text-slate-400"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanupPanel() {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Cleanup Task</h3>
        <Badge tone="green">In Progress</Badge>
      </div>
      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Reward</span>
          <strong>₹500</strong>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Deadline</span>
          <strong>Aug 30, 2026</strong>
        </div>
        <div>
          <span className="text-slate-400">Guideline</span>
          <p className="mt-1 leading-5 text-slate-200">
            Collect, segregate, and safely hand over waste to the partner
            center.
          </p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold hover:bg-emerald-400">
        View Task Details
      </button>
    </div>
  );
}

function VolunteerView() {
  const [tasks, setTasks] = useState(cleanupTasks);
  const [active, setActive] = useState(null);
  const update = (id, status) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Become a Volunteer"
        subtitle="Your citizen account can participate in meaningful local cleanup work."
      />
      <div className="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
        <span className="font-bold">Good to know:</span> There is no separate
        volunteer role. Accept tasks using your existing GreenVision citizen
        account.
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">{task.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={15} className="text-emerald-600" />
                  {task.location}
                </p>
              </div>
              <Badge
                tone={
                  task.priority === "High"
                    ? "red"
                    : task.priority === "Medium"
                      ? "amber"
                      : "green"
                }
              >
                {task.priority} priority
              </Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="text-xs text-slate-400">Reward</p>
                <p className="mt-1 font-bold text-emerald-700">{task.reward}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Deadline</p>
                <p className="mt-1 font-semibold text-slate-700">
                  {task.deadline}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              {task.status === "Available" && (
                <button
                  onClick={() => update(task.id, "Accepted")}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Accept Task
                </button>
              )}
              {task.status === "Accepted" && (
                <button
                  onClick={() => update(task.id, "In Progress")}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Start Task
                </button>
              )}
              {task.status === "In Progress" && (
                <button
                  onClick={() => setActive(task.id)}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Submit Completion
                </button>
              )}
              {task.status === "Assigned" && (
                <button
                  onClick={() => update(task.id, "Accepted")}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Accept Assigned Task
                </button>
              )}
              <button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600">
                View Task
              </button>
            </div>
            {task.status !== "Available" && (
              <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
                {task.status}
              </p>
            )}
            {active === task.id && (
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                  <Upload size={16} />
                  Add before / after images
                  <input type="file" className="hidden" />
                </label>
                <textarea
                  placeholder="Describe the work completed..."
                  className="min-h-20 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => {
                    update(task.id, "Under Government Review");
                    setActive(null);
                  }}
                  className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Submit Completion
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MapView({ setView }) {
  const [selected, setSelected] = useState(0);
  const markers = [
    {
      color: "bg-rose-500",
      x: "30%",
      y: "40%",
      title: "Plastic Waste",
      place: "Bangalore",
      severity: "High Severity",
      date: "Reported Aug 24",
    },
    {
      color: "bg-orange-500",
      x: "62%",
      y: "28%",
      title: "Illegal Dumping",
      place: "Bellandur",
      severity: "Medium Severity",
      date: "Reported Aug 18",
    },
    {
      color: "bg-emerald-500",
      x: "74%",
      y: "65%",
      title: "Overflowing Bin",
      place: "Indiranagar",
      severity: "Resolved",
      date: "Reported Aug 10",
    },
  ];
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Environmental Issues Map"
        subtitle="Explore community reports and cleanup activity around Bangalore."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="relative min-h-125 overflow-hidden rounded-3xl border border-emerald-100 bg-[#dcefe4] shadow-inner">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(30deg, transparent 48%, #b8dac6 49%, #b8dac6 50%, transparent 51%), linear-gradient(115deg, transparent 48%, #c1dfce 49%, #c1dfce 50%, transparent 51%)",
              backgroundSize: "100px 100px",
            }}
          />
          <div className="absolute inset-x-0 top-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/50">
            Bangalore community map
          </div>
          {markers.map((m, i) => (
            <button
              key={m.title}
              onClick={() => setSelected(i)}
              style={{ left: m.x, top: m.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 shadow-lg ring-4 ring-white/60 transition hover:scale-110 ${m.color}`}
              aria-label={`Select ${m.title}`}
            >
              <MapPin size={20} fill="currentColor" className="text-white" />
            </button>
          ))}
          <div className="absolute bottom-5 left-5 w-56 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
            <p className="font-bold text-slate-800">
              {markers[selected].title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {markers[selected].place} · {markers[selected].date}
            </p>
            <Badge
              tone={selected === 0 ? "red" : selected === 1 ? "amber" : "green"}
            >
              {markers[selected].severity}
            </Badge>
            <button
              onClick={() => setView("reportDetail")}
              className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600"
            >
              View Report <ArrowRight size={13} />
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Filter Issues</h3>
            <ListFilter size={18} className="text-slate-400" />
          </div>
          <div className="mt-5 space-y-4">
            {[
              "High Severity",
              "Medium Severity",
              "Low Severity",
              "Resolved",
              "In Progress",
            ].map((item, i) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-emerald-600"
                />
                {item}
                <span
                  className={`ml-auto h-2.5 w-2.5 rounded-full ${["bg-rose-500", "bg-orange-500", "bg-yellow-400", "bg-emerald-500", "bg-sky-500"][i]}`}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  const [items, setItems] = useState([
    {
      title: "Government accepted your report",
      body: "Plastic Waste Report #GV-1024 has been accepted.",
      time: "2 minutes ago",
      unread: true,
      icon: ShieldCheck,
    },
    {
      title: "Cleanup task assigned",
      body: "You have been assigned a cleanup task near Koramangala.",
      time: "1 hour ago",
      unread: true,
      icon: ClipboardCheck,
    },
    {
      title: "Reward received",
      body: "You earned ₹500 for completing a cleanup task.",
      time: "Yesterday",
      unread: true,
      icon: Gift,
    },
    {
      title: "Report resolved",
      body: "Your reported environmental issue has been resolved.",
      time: "2 days ago",
      unread: false,
      icon: CheckCircle2,
    },
  ]);
  const mark = (i) =>
    setItems(items.map((n, x) => (x === i ? { ...n, unread: false } : n)));
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Notifications"
        subtitle="Stay updated on your reports and cleanup activities."
        action="Mark all as read"
        onAction={() => setItems(items.map((n) => ({ ...n, unread: false })))}
      />
      <div className="max-w-3xl space-y-3">
        {items.map((n, i) => {
          const Icon = n.icon;
          return (
            <button
              key={n.title}
              onClick={() => mark(i)}
              className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition hover:border-emerald-200 ${n.unread ? "border-emerald-100 bg-emerald-50/50" : "border-slate-100 bg-white"}`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${n.unread ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap justify-between gap-2">
                  <strong className="text-sm text-slate-800">{n.title}</strong>
                  <small className="text-xs text-slate-400">{n.time}</small>
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {n.body}
                </span>
              </span>
              {n.unread && (
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfileView({ setLogout }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Profile"
        subtitle="Manage your citizen profile and personal information."
      />
      <div className="max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-5 border-b border-slate-100 pb-7">
          <Avatar />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">Jatin Kumar</h2>
            <p className="mt-1 text-sm text-slate-500">
              Bangalore, India · Citizen
            </p>
            <button className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <Upload size={14} />
              Change Photo
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(!editing)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
            <button
              onClick={() => setLogout(true)}
              className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {[
            ["Full Name", "Jatin Kumar"],
            ["Email", "jatin.kumar@example.com"],
            ["Phone Number", "+91 98765 43210"],
            ["City", "Bangalore"],
            ["Location", "Karnataka, India"],
            ["Member Since", "January 2026"],
            ["Role", "Citizen"],
          ].map(([label, value]) => (
            <label key={label} className="text-sm font-semibold text-slate-600">
              {label}
              <input
                disabled={!editing}
                defaultValue={value}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none disabled:opacity-80 focus:border-emerald-400"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContributionView() {
  const rows = [
    ["Reports Submitted", "+240"],
    ["Cleanup Tasks Completed", "+700"],
    ["Community Actions", "+200"],
    ["Resolved Issues", "+100"],
  ];
  const leaders = [
    ["Ananya Sharma", "2,450"],
    ["Rahul Mehta", "2,180"],
    ["Jatin Kumar", "1,240"],
    ["Priya Singh", "1,120"],
  ];
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Contribution"
        subtitle="Every star reflects a cleaner, healthier community."
      />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-7 text-white shadow-xl shadow-orange-100">
          <Star size={28} fill="currentColor" />
          <p className="mt-8 text-sm font-semibold text-orange-50">
            Current contribution score
          </p>
          <p className="mt-1 text-5xl font-black">1,240</p>
          <p className="mt-3 text-sm text-orange-50">
            You&apos;re in the top 12% of contributors in Bangalore.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">
            How you earned your stars
          </h3>
          <div className="mt-5 space-y-4">
            {rows.map(([a, b]) => (
              <div
                key={a}
                className="flex justify-between border-b border-slate-100 pb-3 text-sm"
              >
                <span className="text-slate-500">{a}</span>
                <strong className="text-emerald-600">{b}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Community leaderboard</h3>
          <Trophy size={19} className="text-amber-500" />
        </div>
        <div className="mt-4 space-y-2">
          {leaders.map(([name, score], i) => (
            <div
              key={name}
              className={`flex items-center gap-4 rounded-xl p-3 ${name === "Jatin Kumar" ? "bg-emerald-50 ring-1 ring-emerald-100" : ""}`}
            >
              <span className="w-5 text-center font-bold text-slate-400">
                #{i + 1}
              </span>
              <Avatar small />
              <span className="flex-1 text-sm font-semibold text-slate-700">
                {name}
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                {score} <Star size={14} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [view, setView] = useState("dashboard");
  const [reportsOpen, setReportsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [query, setQuery] = useState("");
  const content =
    view === "dashboard" ? (
      <Dashboard setView={setView} query={query} />
    ) : view === "reports" ? (
      <ReportsView setView={setView} query={query} setQuery={setQuery} />
    ) : view === "reportDetail" ? (
      <ReportDetail setView={setView} />
    ) : view === "volunteer" || view === "tasks" ? (
      <VolunteerView />
    ) : view === "map" ? (
      <MapView setView={setView} />
    ) : view === "notifications" ? (
      <NotificationsView />
    ) : view === "profile" ? (
      <ProfileView setLogout={setLogout} />
    ) : (
      <ContributionView />
    );
  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900">
      <Sidebar
        {...{
          view,
          setView,
          reportsOpen,
          setReportsOpen,
          mobileOpen,
          setMobileOpen,
          setLogout,
        }}
      />
      <div className="min-h-screen lg:pl-72">
        <Header {...{ setView, setMobileOpen, query, setQuery }} />
        <main>{content}</main>
      </div>
      {logout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <LogOut size={20} />
              </div>
              <button
                onClick={() => setLogout(false)}
                className="text-slate-400"
              >
                <X size={18} />
              </button>
            </div>
            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Are you sure you want to logout?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You can always sign back in to continue your environmental impact
              journey.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setLogout(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => setLogout(false)}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
