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
//   Calendar,
//   Clock,
//   Download,
//   Filter,
//   Grid3x3,
//   List,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   Edit,
//   Trash2,
//   Share2,
//   FileText,
//   AlertCircle,
//   CheckCircle,
//   TrendingUp,
// } from 'lucide-react';

// const MyReports = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const reportsData = [
//     {
//       id: 'GV-2026-00128',
//       type: 'Plastic Waste',
//       location: 'Near PES University Gate 2',
//       date: '15 July 2026',
//       time: '10:45 AM',
//       image: 'bg-linear-to-br from-blue-400 to-blue-600',
//       status: 'Resolved',
//       severity: 'High',
//       description: 'Large pile of plastic waste accumulating near university entrance',
//       aiAnalysis: {
//         wasteType: 'Plastic Bottles',
//         confidence: '98%',
//         severity: 'High',
//         estimatedWaste: '35 kg',
//         environmentalRisk: 'Medium',
//       },
//       ecoPoints: 120,
//       pointStatus: 'Credited',
//       timeline: [
//         { stage: 'Report Submitted', completed: true },
//         { stage: 'AI Analysis Completed', completed: true },
//         { stage: 'Government Review', completed: true },
//         { stage: 'Cleanup Assigned', completed: true },
//         { stage: 'Completed', completed: true },
//       ],
//       governmentNotes: 'Cleanup team deployed. Area cleared successfully.',
//       volunteerUpdates: 'Team completed cleanup on 18 July 2026',
//     },
//     {
//       id: 'GV-2026-00127',
//       type: 'Water Pollution',
//       location: 'Riverside Park, Downtown',
//       date: '12 July 2026',
//       time: '2:30 PM',
//       image: 'bg-linear-to-br from-cyan-400 to-cyan-600',
//       status: 'In Progress',
//       severity: 'Critical',
//       description: 'Water contamination detected in river section',
//       aiAnalysis: {
//         wasteType: 'Chemical Waste',
//         confidence: '85%',
//         severity: 'Critical',
//         estimatedWaste: '200 L',
//         environmentalRisk: 'High',
//       },
//       ecoPoints: 150,
//       pointStatus: 'Pending',
//       timeline: [
//         { stage: 'Report Submitted', completed: true },
//         { stage: 'AI Analysis Completed', completed: true },
//         { stage: 'Government Review', completed: true },
//         { stage: 'Cleanup Assigned', completed: false },
//         { stage: 'Completed', completed: false },
//       ],
//       governmentNotes: 'Under investigation by environmental department',
//       volunteerUpdates: 'Awaiting cleanup team assignment',
//     },
//     {
//       id: 'GV-2026-00126',
//       type: 'Air Quality',
//       location: 'Industrial Area Zone 5',
//       date: '10 July 2026',
//       time: '11:20 AM',
//       image: 'bg-linear-to-br from-amber-400 to-amber-600',
//       status: 'Pending',
//       severity: 'Medium',
//       description: 'Unusual smoke emissions from industrial facility',
//       aiAnalysis: {
//         wasteType: 'Industrial Emission',
//         confidence: '72%',
//         severity: 'Medium',
//         estimatedWaste: 'N/A',
//         environmentalRisk: 'Medium',
//       },
//       ecoPoints: 80,
//       pointStatus: 'Pending',
//       timeline: [
//         { stage: 'Report Submitted', completed: true },
//         { stage: 'AI Analysis Completed', completed: false },
//         { stage: 'Government Review', completed: false },
//         { stage: 'Cleanup Assigned', completed: false },
//         { stage: 'Completed', completed: false },
//       ],
//       governmentNotes: 'Pending AI analysis review',
//       volunteerUpdates: 'No updates yet',
//     },
//     {
//       id: 'GV-2026-00125',
//       type: 'Littering',
//       location: 'City Center Market',
//       date: '8 July 2026',
//       time: '3:45 PM',
//       image: 'bg-linear-to-br from-orange-400 to-orange-600',
//       status: 'AI Reviewing',
//       severity: 'Low',
//       description: 'Scattered litter and garbage around market area',
//       aiAnalysis: {
//         wasteType: 'Mixed Waste',
//         confidence: '91%',
//         severity: 'Low',
//         estimatedWaste: '15 kg',
//         environmentalRisk: 'Low',
//       },
//       ecoPoints: 60,
//       pointStatus: 'Approved',
//       timeline: [
//         { stage: 'Report Submitted', completed: true },
//         { stage: 'AI Analysis Completed', completed: true },
//         { stage: 'Government Review', completed: false },
//         { stage: 'Cleanup Assigned', completed: false },
//         { stage: 'Completed', completed: false },
//       ],
//       governmentNotes: 'Awaiting government review',
//       volunteerUpdates: 'Under AI analysis',
//     },
//   ];

//   const stats = [
//     { label: 'Total Reports', value: '28', icon: FileText, color: 'from-blue-400 to-blue-600' },
//     { label: 'Pending', value: '8', icon: AlertCircle, color: 'from-yellow-400 to-yellow-600', badge: 'yellow' },
//     { label: 'In Progress', value: '10', icon: TrendingUp, color: 'from-blue-500 to-blue-700', badge: 'blue' },
//     { label: 'Resolved', value: '10', icon: CheckCircle, color: 'from-green-400 to-green-600', badge: 'green' },
//   ];

//   const recentActivity = [
//     { action: 'Government approved your report', report: 'GV-2026-00128', time: '2h ago' },
//     { action: 'AI completed waste detection', report: 'GV-2026-00127', time: '5h ago' },
//     { action: 'Cleanup team assigned', report: 'GV-2026-00125', time: '1 day ago' },
//     { action: 'Eco Points credited to account', report: 'GV-2026-00128', time: '2 days ago' },
//   ];

//   const aiInsights = [
//     { label: 'Most Common Issue', value: 'Plastic Waste', percentage: '45%' },
//     { label: 'Avg Resolution Time', value: '3.2 days', percentage: 'High' },
//     { label: 'Reports This Month', value: '28', percentage: '+12%' },
//     { label: 'Eco Points Earned', value: '410', percentage: 'Gold Tier' },
//   ];

//   const filteredReports = reportsData.filter(
//     (report) =>
//       (selectedStatus === 'all' || report.status === selectedStatus) &&
//       (searchQuery === '' ||
//         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         report.location.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
//       case 'AI Reviewing':
//         return 'bg-purple-100 text-purple-800 border border-purple-300';
//       case 'Government Review':
//         return 'bg-blue-100 text-blue-800 border border-blue-300';
//       case 'Assigned':
//         return 'bg-orange-100 text-orange-800 border border-orange-300';
//       case 'In Progress':
//         return 'bg-indigo-100 text-indigo-800 border border-indigo-300';
//       case 'Resolved':
//         return 'bg-green-100 text-green-800 border border-green-300';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800 border border-red-300';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'Critical':
//         return 'bg-red-100 text-red-800 border border-red-300';
//       case 'High':
//         return 'bg-orange-100 text-orange-800 border border-orange-300';
//       case 'Medium':
//         return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
//       case 'Low':
//         return 'bg-green-100 text-green-800 border border-green-300';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
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
//               placeholder="Search reports..."
//               className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-sm"
//             />
//           </div>

//           <div className="flex items-center gap-3 md:gap-4">
//             <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
//               <Bell className="w-5 h-5 text-slate-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </motion.button>
//             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
//               <Settings className="w-5 h-5" />
//             </button>
//             <div className="w-9 h-9 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
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
//                 {['Dashboard', 'Report Issue', 'My Reports', 'Community Tasks', 'Live Map', 'Leaderboard', 'Notifications', 'Profile', 'Settings'].map((item) => (
//                   <motion.button
//                     key={item}
//                     whileHover={{ x: 4 }}
//                     className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
//                       item === 'My Reports'
//                         ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
//                         : 'text-slate-700 hover:bg-slate-100'
//                     }`}
//                   >
//                     {item}
//                   </motion.button>
//                 ))}
//               </nav>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-4 md:p-8">
//           {/* Page Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
//             <div>
//               <h2 className="text-4xl font-bold text-slate-900">My Reports</h2>
//               <p className="text-slate-600 mt-2">View, track and manage every environmental report you have submitted.</p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition w-fit"
//             >
//               <Plus className="w-5 h-5" /> Report New Issue
//             </motion.button>
//           </div>

//           {/* Statistics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ translateY: -5 }}
//                 className="bg-white rounded-2xl border border-slate-200 p-6 cursor-pointer overflow-hidden relative group"
//               >
//                 <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition`}></div>
//                 <div className="relative flex items-start justify-between">
//                   <div>
//                     <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
//                     <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
//                   </div>
//                   <motion.div whileHover={{ scale: 1.2 }} className={`bg-linear-to-br ${stat.color} p-3 rounded-xl text-white`}>
//                     <stat.icon className="w-6 h-6" />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Search & Filter Toolbar */}
//           <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-8">
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
//               <div className="flex gap-2 flex-wrap">
//                 {['all', 'Pending', 'In Progress', 'Resolved', 'Rejected'].map((status) => (
//                   <motion.button
//                     key={status}
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() => setSelectedStatus(status)}
//                     className={`px-4 py-2 rounded-lg font-medium transition ${
//                       selectedStatus === status
//                         ? 'bg-green-500 text-white shadow-lg'
//                         : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                     }`}
//                   >
//                     {status === 'all' ? 'All Reports' : status}
//                   </motion.button>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:border-slate-400 focus:outline-none focus:border-green-500 transition">
//                   <option>Sort by: Newest</option>
//                   <option>Oldest</option>
//                   <option>Highest Severity</option>
//                   <option>Recently Updated</option>
//                 </select>
//                 <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition" title="Grid view" onClick={() => setViewMode('grid')}>
//                   <Grid3x3 className={`w-5 h-5 ${viewMode === 'grid' ? 'text-green-600' : 'text-slate-600'}`} />
//                 </button>
//                 <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition" title="List view" onClick={() => setViewMode('list')}>
//                   <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-green-600' : 'text-slate-600'}`} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Reports Grid */}
//           {filteredReports.length > 0 ? (
//             <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
//               <AnimatePresence>
//                 {filteredReports.map((report, idx) => (
//                   <motion.div
//                     key={report.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ y: -8 }}
//                     className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition cursor-pointer"
//                   >
//                     {/* Report Image */}
//                     <div className={`${report.image} h-40 relative flex items-center justify-center overflow-hidden`}>
//                       <MapPin className="w-16 h-16 text-white opacity-50" />
//                     </div>

//                     {/* Report Content */}
//                     <div className="p-6">
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <h3 className="text-xl font-bold text-slate-900">{report.type}</h3>
//                           <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
//                             <MapPin className="w-4 h-4" /> {report.location}
//                           </p>
//                         </div>
//                         <span className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ml-2 ${getStatusStyle(report.status)}`}>
//                           {report.status}
//                         </span>
//                       </div>

//                       {/* Date & Time */}
//                       <div className="flex gap-4 text-xs text-slate-600 mb-4">
//                         <span className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" /> {report.date}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" /> {report.time}
//                         </span>
//                         <span className="font-mono text-slate-800 bg-slate-100 px-2 py-1 rounded">{report.id}</span>
//                       </div>

//                       {/* AI Analysis */}
//                       <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 mb-4 border border-slate-200">
//                         <h4 className="font-semibold text-slate-900 text-sm mb-3">AI Analysis</h4>
//                         <div className="grid grid-cols-2 gap-3">
//                           <div>
//                             <p className="text-xs text-slate-600">Waste Type</p>
//                             <p className="font-semibold text-slate-900">{report.aiAnalysis.wasteType}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-600">Confidence</p>
//                             <p className="font-semibold text-green-600">{report.aiAnalysis.confidence}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-600">Estimated Waste</p>
//                             <p className="font-semibold text-slate-900">{report.aiAnalysis.estimatedWaste}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-slate-600">Risk Level</p>
//                             <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(report.aiAnalysis.environmentalRisk)}`}>
//                               {report.aiAnalysis.environmentalRisk}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Eco Points */}
//                       <div className="flex items-center justify-between mb-4 bg-linear-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
//                         <div>
//                           <p className="text-xs text-green-700 font-medium">Eco Points Earned</p>
//                           <p className="text-2xl font-bold text-green-600">+{report.ecoPoints}</p>
//                         </div>
//                         <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
//                           report.pointStatus === 'Credited'
//                             ? 'bg-green-100 text-green-800 border border-green-300'
//                             : report.pointStatus === 'Approved'
//                             ? 'bg-blue-100 text-blue-800 border border-blue-300'
//                             : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
//                         }`}>
//                           {report.pointStatus}
//                         </span>
//                       </div>

//                       {/* Progress Timeline */}
//                       <div className="mb-6">
//                         <h4 className="font-semibold text-slate-900 text-sm mb-3">Progress</h4>
//                         <div className="flex gap-1 overflow-x-auto">
//                           {report.timeline.map((step, idx) => (
//                             <motion.div
//                               key={idx}
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               transition={{ delay: idx * 0.1 }}
//                               className="flex flex-col items-center gap-2 shrink-0"
//                             >
//                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition ${
//                                 step.completed ? 'bg-green-500' : 'bg-slate-300'
//                               }`}>
//                                 {step.completed ? '✓' : idx + 1}
//                               </div>
//                               <p className="text-xs text-slate-600 text-center w-16 truncate">{step.stage}</p>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="grid grid-cols-2 gap-3">
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => {
//                             setSelectedReport(report);
//                             setModalOpen(true);
//                           }}
//                           className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition border border-green-200 flex items-center justify-center gap-2"
//                         >
//                           <Eye className="w-4 h-4" /> View
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
//                         >
//                           <Download className="w-4 h-4" /> PDF
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
//                         >
//                           <Share2 className="w-4 h-4" /> Share
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
//                         >
//                           <Trash2 className="w-4 h-4" /> Delete
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
//               <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//               <p className="text-slate-600 font-medium text-lg mb-4">You haven&apos;t submitted any environmental reports yet.</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
//               >
//                 Report Your First Issue
//               </motion.button>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredReports.length > 0 && (
//             <div className="flex items-center justify-center gap-2 mb-8">
//               <motion.button whileHover={{ scale: 1.1 }} className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50">
//                 <ChevronLeft className="w-5 h-5" />
//               </motion.button>
//               {[1, 2, 3].map((page) => (
//                 <motion.button
//                   key={page}
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => setCurrentPage(page)}
//                   className={`w-10 h-10 rounded-lg font-medium transition ${
//                     currentPage === page
//                       ? 'bg-green-500 text-white'
//                       : 'border border-slate-300 hover:bg-slate-50'
//                   }`}
//                 >
//                   {page}
//                 </motion.button>
//               ))}
//               <motion.button whileHover={{ scale: 1.1 }} className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50">
//                 <ChevronRight className="w-5 h-5" />
//               </motion.button>
//             </div>
//           )}

//           {/* Two Column Layout - Activity & Insights */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Recent Activity */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6"
//             >
//               <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, idx) => (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ x: 8 }}
//                     className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0 cursor-pointer group"
//                   >
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition">
//                       <CheckCircle className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-slate-900">{activity.action}</p>
//                       <div className="flex justify-between items-center mt-1">
//                         <p className="text-xs text-slate-600">{activity.report}</p>
//                         <p className="text-xs text-slate-500">{activity.time}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* AI Insights */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-2xl border border-slate-200 p-6"
//             >
//               <h3 className="text-lg font-bold text-slate-900 mb-6">AI Insights</h3>
//               <div className="space-y-4">
//                 {aiInsights.map((insight, idx) => (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ scale: 1.02 }}
//                     className="p-4 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 cursor-pointer hover:border-green-300 transition"
//                   >
//                     <p className="text-xs font-medium text-slate-600 mb-1">{insight.label}</p>
//                     <p className="text-lg font-bold text-slate-900">{insight.value}</p>
//                     <p className="text-xs text-green-600 font-medium mt-2">{insight.percentage}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </main>
//       </div>

//       {/* Report Preview Modal */}
//       <AnimatePresence>
//         {modalOpen && selectedReport && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setModalOpen(false)}
//               className="absolute inset-0 bg-black bg-opacity-50"
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               {/* Modal Header */}
//               <div className="sticky top-0 bg-linear-to-r from-green-50 to-green-100 border-b border-green-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-slate-900">Report Details</h2>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setModalOpen(false)}
//                   className="p-1 hover:bg-green-200 rounded-lg transition"
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               {/* Modal Content */}
//               <div className="p-6 space-y-6">
//                 {/* Large Image */}
//                 <div className={`${selectedReport.image} h-64 rounded-xl flex items-center justify-center`}>
//                   <MapPin className="w-20 h-20 text-white opacity-50" />
//                 </div>

//                 {/* Report Info */}
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-900">{selectedReport.type}</h3>
//                   <p className="text-slate-600 mt-2">{selectedReport.description}</p>
//                 </div>

//                 {/* Location & Date */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
//                     <p className="text-xs text-slate-600 font-medium mb-1">Location</p>
//                     <p className="font-semibold text-slate-900">{selectedReport.location}</p>
//                   </div>
//                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
//                     <p className="text-xs text-slate-600 font-medium mb-1">Report ID</p>
//                     <p className="font-mono font-semibold text-slate-900">{selectedReport.id}</p>
//                   </div>
//                 </div>

//                 {/* AI Analysis */}
//                 <div>
//                   <h4 className="font-semibold text-slate-900 mb-4">AI Analysis</h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
//                       <p className="text-xs text-slate-600 font-medium mb-1">Waste Type</p>
//                       <p className="font-semibold text-slate-900">{selectedReport.aiAnalysis.wasteType}</p>
//                     </div>
//                     <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
//                       <p className="text-xs text-green-700 font-medium mb-1">Confidence</p>
//                       <p className="font-semibold text-green-600">{selectedReport.aiAnalysis.confidence}</p>
//                     </div>
//                     <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
//                       <p className="text-xs text-orange-700 font-medium mb-1">Severity</p>
//                       <p className="font-semibold text-orange-600">{selectedReport.aiAnalysis.severity}</p>
//                     </div>
//                     <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
//                       <p className="text-xs text-slate-600 font-medium mb-1">Estimated Waste</p>
//                       <p className="font-semibold text-slate-900">{selectedReport.aiAnalysis.estimatedWaste}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Timeline */}
//                 <div>
//                   <h4 className="font-semibold text-slate-900 mb-4">Timeline</h4>
//                   <div className="space-y-3">
//                     {selectedReport.timeline.map((step, idx) => (
//                       <div key={idx} className="flex gap-4 items-start">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
//                           step.completed ? 'bg-green-500' : 'bg-slate-300'
//                         }`}>
//                           {step.completed ? '✓' : idx + 1}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-slate-900">{step.stage}</p>
//                           <p className="text-xs text-slate-600">{step.completed ? 'Completed' : 'Pending'}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Government Notes & Volunteer Updates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
//                     <h4 className="font-semibold text-blue-900 mb-2">Government Notes</h4>
//                     <p className="text-sm text-blue-800">{selectedReport.governmentNotes}</p>
//                   </div>
//                   <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
//                     <h4 className="font-semibold text-purple-900 mb-2">Volunteer Updates</h4>
//                     <p className="text-sm text-purple-800">{selectedReport.volunteerUpdates}</p>
//                   </div>
//                 </div>

//                 {/* Eco Points Summary */}
//                 <div className="bg-linear-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
//                   <p className="text-sm text-green-700 font-medium mb-2">Reward Details</p>
//                   <p className="text-3xl font-bold text-green-600 mb-2">+{selectedReport.ecoPoints} Eco Points</p>
//                   <p className="text-sm text-green-700">Status: <span className="font-semibold">{selectedReport.pointStatus}</span></p>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex gap-3 pt-4 border-t border-slate-200">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setModalOpen(false)}
//                     className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition"
//                   >
//                     Close
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex-1 px-4 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-2"
//                   >
//                     <Download className="w-4 h-4" /> Download PDF
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MyReports;
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  Check,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Info,
  Leaf,
  Loader2,
  MapPin,
  Navigation,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const mockAnalysis = {
  wasteType: "Plastic Waste",
  confidence: 94,
  estimatedQuantity: "Approximately 35 kg",
  estimatedDegradation: "High",
  environmentalImpact:
    "High — the accumulated plastic waste may contaminate nearby soil and water and can persist in the environment for many years.",
  severity: "High",
  recommendedAction:
    "Immediate removal, segregation, and proper disposal or recycling of the plastic waste.",
  recommendedPriority: "High",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

function FieldLabel({ children, required = false }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children} {required && <span className="text-emerald-600">*</span>}
    </label>
  );
}

function ProcessingPanel() {
  const stages = [
    "Image uploaded",
    "Image processed",
    "Detecting environmental issue",
    "Estimating severity",
    "Generating recommendations",
  ];
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <Loader2 className="size-6 animate-spin" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Analyzing Your Report
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            GreenVision AI is analyzing your image and environmental
            information.
          </p>
        </div>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-700"
          style={{ width: "68%" }}
        />
      </div>
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3 text-sm">
            <span
              className={`flex size-5 items-center justify-center rounded-full ${index < 2 ? "bg-emerald-600 text-white" : index === 2 ? "border-2 border-emerald-600 text-emerald-600" : "border border-slate-300 text-slate-400"}`}
            >
              {index < 2 ? (
                <Check className="size-3" />
              ) : index === 2 ? (
                <span className="size-1.5 rounded-full bg-emerald-600" />
              ) : null}
            </span>
            <span
              className={
                index <= 2 ? "font-medium text-slate-800" : "text-slate-500"
              }
            >
              {stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisResults({ result, setResult }) {
  const update = (key, value) =>
    setResult((current) => ({ ...current, [key]: value }));
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">
              AI Environmental Analysis
            </h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review the AI-generated information before submitting your report.
            You can edit the results if necessary.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
          <Sparkles className="size-3" /> AI Generated
        </span>
      </div>
      <div className="space-y-5">
        <div>
          <FieldLabel>Waste Type</FieldLabel>
          <div className="relative">
            <Trash2 className="pointer-events-none absolute left-3 top-3.5 size-4 text-emerald-600" />
            <input
              value={result.wasteType}
              onChange={(e) => update("wasteType", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <FieldLabel>Confidence</FieldLabel>
            <span className="text-sm font-bold text-emerald-700">
              {result.confidence}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">AI Confidence</p>
        </div>
        <div>
          <FieldLabel>Estimated Quantity</FieldLabel>
          <input
            value={result.estimatedQuantity}
            onChange={(e) => update("estimatedQuantity", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Estimated Degradation</FieldLabel>
          <select
            value={result.estimatedDegradation}
            onChange={(e) => update("estimatedDegradation", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Very High</option>
          </select>
        </div>
        <div>
          <FieldLabel>Environmental Impact</FieldLabel>
          <textarea
            value={result.environmentalImpact}
            onChange={(e) => update("environmentalImpact", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <FieldLabel>Severity</FieldLabel>
          <select
            value={result.severity}
            onChange={(e) => update("severity", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        <div>
          <FieldLabel>Recommended Action</FieldLabel>
          <textarea
            value={result.recommendedAction}
            onChange={(e) => update("recommendedAction", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <FieldLabel>Recommended Priority</FieldLabel>
          <select
            value={result.recommendedPriority}
            onChange={(e) => update("recommendedPriority", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-xl bg-white/70 p-4 text-xs leading-5 text-slate-600">
        <Info className="mt-0.5 size-4 shrink-0 text-emerald-600" />{" "}
        AI-generated information should be reviewed before submission. You are
        responsible for confirming that the information accurately represents
        the environmental issue.
      </div>
    </div>
  );
}

export default function CreateReport() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Plastic Waste");
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [result, setResult] = useState(mockAnalysis);

  useEffect(
    () => () => image?.preview && URL.revokeObjectURL(image.preview),
    [image],
  );

  const chooseImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage({ file, preview: URL.createObjectURL(file) });
    setErrors((e) => ({ ...e, image: "" }));
  };
  const validate = () => {
    const next = {};
    if (!image) next.image = "Please upload an image.";
    if (!address.trim()) next.address = "Address is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!description.trim()) next.description = "Description is required.";
    setErrors(next);
    return !Object.keys(next).length;
  };
  const analyze = () => {
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setAnalyzed(true);
    }, 2600);
  };
  const locate = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoordinates({
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }),
        () => setCoordinates({ latitude: "40.7128", longitude: "-74.0060" }),
      );
    else setCoordinates({ latitude: "40.7128", longitude: "-74.0060" });
  };
  const submit = () => {
    if (
      !result.wasteType ||
      !result.estimatedQuantity ||
      !result.recommendedAction
    )
      return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1600);
  };

  if (submitted)
    return (
      <main className="min-h-screen bg-[#f7fbf8] px-5 py-8 text-slate-900 sm:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Report Submitted Successfully!
            </h1>
            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
              Your report has been submitted and is now waiting for government
              review.
            </p>
            <div className="mt-8 rounded-2xl bg-emerald-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Report ID
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">
                GV-1024
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="/reports"
                className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                View My Reports
              </a>
              <a
                href="/dashboard"
                className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f7fbf8] px-4 py-5 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-emerald-100 pb-5">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </a>
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-emerald-700">
            <Leaf className="size-5 fill-emerald-100" /> GreenVision AI
          </div>
        </header>
        <section className="py-10 text-center sm:py-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Community powered environmental care
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Report an Environmental Issue
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-7 text-slate-600">
            Help your community identify environmental problems and make your
            neighborhood cleaner.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                01
              </span>
              <span className="hidden sm:inline">Report Details</span>
            </div>
            <span className="h-px w-8 bg-emerald-200 sm:w-14" />
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${analyzed ? "text-emerald-700" : "text-slate-400"}`}
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full text-xs ${analyzed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}
              >
                02
              </span>
              <span className="hidden sm:inline">AI Analysis</span>
            </div>
            <span className="h-px w-8 bg-slate-200 sm:w-14" />
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
              <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500">
                03
              </span>
              <span className="hidden sm:inline">Submit</span>
            </div>
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-7 flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Report Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us about the environmental issue you found.
                </p>
              </div>
            </div>
            <div className="space-y-7">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <FieldLabel required>Upload Image</FieldLabel>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Required
                  </span>
                </div>
                <p className="mb-3 text-sm text-slate-500">
                  Upload a clear photo of the environmental issue.
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => chooseImage(e.target.files?.[0])}
                />
                {image ? (
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
                    <img
                      src={image.preview}
                      alt="Selected environmental issue"
                      className="h-52 w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {image.file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(image.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          aria-label="Remove image"
                          onClick={() => {
                            URL.revokeObjectURL(image.preview);
                            setImage(null);
                          }}
                          className="rounded-lg bg-white p-2 text-slate-500 shadow-sm hover:text-red-600"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
                  >
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <ImageIcon className="size-7" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Drag & drop your image here
                    </p>
                    <p className="my-1 text-sm text-slate-500">
                      or{" "}
                      <span className="font-semibold text-emerald-700">
                        Browse from your device
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      PNG, JPG or WEBP • Max 10MB
                    </p>
                    <Upload className="mt-4 size-4 text-emerald-500" />
                  </button>
                )}
                {errors.image && (
                  <p className="mt-2 text-xs text-red-600">{errors.image}</p>
                )}
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <FieldLabel required>Location</FieldLabel>
                    <p className="text-sm text-slate-500">
                      Where did you find the issue?
                    </p>
                  </div>
                  <MapPin className="size-5 text-emerald-600" />
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter the location where you found the issue"
                      className={inputClass}
                    />
                    {errors.address && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className={inputClass}
                    />
                    {errors.city && (
                      <p className="mt-2 text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={coordinates.latitude}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          latitude: e.target.value,
                        })
                      }
                      placeholder="Latitude"
                      className={inputClass}
                    />
                    <input
                      value={coordinates.longitude}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          longitude: e.target.value,
                        })
                      }
                      placeholder="Longitude"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={locate}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <Navigation className="size-4" /> Use My Current Location
                  </button>
                </div>
              </div>
              <div>
                <FieldLabel required>Description</FieldLabel>
                <textarea
                  value={description}
                  maxLength={500}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you observed..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                {errors.description && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.description}
                  </p>
                )}
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>
                    Tell us what you noticed, where it is located, and any
                    details that might help identify the problem.
                  </span>
                  <span className="shrink-0 pl-3">
                    {description.length} / 500
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setAdditionalOpen(!additionalOpen)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span>
                    <span className="font-semibold text-slate-800">
                      Additional Information
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      Optional
                    </span>
                  </span>
                  <span className="text-xl text-emerald-600">
                    {additionalOpen ? "−" : "+"}
                  </span>
                </button>
                {additionalOpen && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Estimated Quantity</FieldLabel>
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Example: 20 kg"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel>Issue Category</FieldLabel>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClass}
                      >
                        <option>Plastic Waste</option>
                        <option>Organic Waste</option>
                        <option>Construction Waste</option>
                        <option>Water Pollution</option>
                        <option>Air Pollution</option>
                        <option>E-Waste</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              disabled={processing || analyzed}
              onClick={analyze}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <BrainCircuit className="size-5" />{" "}
              {processing
                ? "Analyzing..."
                : analyzed
                  ? "Report Analyzed"
                  : "Analyze Report"}{" "}
              <Sparkles className="size-4" />
            </button>
          </section>
          <aside className="lg:sticky lg:top-6">
            {processing ? (
              <ProcessingPanel />
            ) : analyzed ? (
              <>
                <AnalysisResults result={result} setResult={setResult} />
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Everything looks correct?
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Submit your report to GreenVision AI.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={
                      submitting ||
                      !result.wasteType ||
                      !result.estimatedQuantity ||
                      !result.recommendedAction
                    }
                    onClick={submit}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-green-700 px-5 py-4 text-sm font-bold text-white transition hover:from-emerald-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" /> Submitting
                        Report...
                      </>
                    ) : (
                      <>
                        <Send className="size-5" /> Submit Report
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <BrainCircuit className="size-8" />
                </div>
                <h2 className="mt-5 text-xl font-bold">AI Analysis</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Upload your report and click &quot;Analyze Report&quot; to see
                  AI-generated insights.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                  <AlertTriangle className="size-4" /> Results are editable
                  before submission
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
