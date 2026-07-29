'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Search,
  Bell,
  Settings,
  Plus,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Eye,
  MessageSquare,
  Download,
  Filter,
  Flame,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [hoveredReport, setHoveredReport] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
  });

  const stats = [
    { label: 'My Reports', value: '28', unit: 'submitted', color: 'from-blue-400 to-blue-600', icon: MapPin },
    { label: 'Resolved', value: '18', unit: 'completed', color: 'from-green-400 to-green-600', icon: CheckCircle },
    { label: 'In Progress', value: '8', unit: 'pending', color: 'from-yellow-400 to-yellow-600', icon: Clock },
    { label: 'Contributions', value: '12', unit: 'cleanups', color: 'from-purple-400 to-purple-600', icon: Zap },
  ];

  const recentReports = [
    {
      id: 1,
      type: 'Plastic Waste',
      location: 'Sector 21, Block A',
      date: 'Today, 2:30 PM',
      status: 'Completed',
      views: 234,
      comments: 12,
      severity: 'high',
      color: 'from-blue-50 to-blue-100',
    },
    {
      id: 2,
      type: 'Construction Debris',
      location: 'Downtown Main Street',
      date: 'Yesterday, 5:15 PM',
      status: 'In Progress',
      views: 156,
      comments: 8,
      severity: 'critical',
      color: 'from-orange-50 to-orange-100',
    },
    {
      id: 3,
      type: 'Overflowing Dustbin',
      location: 'City Center Market',
      date: '2 days ago',
      status: 'Pending Review',
      views: 89,
      comments: 5,
      severity: 'medium',
      color: 'from-yellow-50 to-yellow-100',
    },
    {
      id: 4,
      type: 'Air Quality Issue',
      location: 'Industrial Park',
      date: '3 days ago',
      status: 'Resolved',
      views: 412,
      comments: 23,
      severity: 'low',
      color: 'from-green-50 to-green-100',
    },
  ];

  const communityActivity = [
    { name: 'Rahul Kumar', action: 'reported illegal dumping at Riverside Park', time: '2h ago', avatar: '👨' },
    { name: 'Neha Singh', action: 'completed community cleanup task', time: '4h ago', avatar: '👩' },
    { name: 'Authority', action: 'approved and resolved 8 reports', time: '1 day ago', avatar: '🏛️' },
    { name: 'Priya Patel', action: 'joined cleanup initiative for beach area', time: '2 days ago', avatar: '👩' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border border-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredReports = recentReports.filter(
    (report) =>
      (selectedFilter === 'all' || report.type.toLowerCase().includes(selectedFilter.toLowerCase())) &&
      (searchQuery === '' ||
        report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log('New report:', formData);
    setFormData({ title: '', type: '', location: '', description: '' });
    setReportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-2xl font-bold text-slate-900">GreenVision</h1>
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md mx-6">
            <Search className="w-5 h-5 text-slate-400 absolute ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, locations..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-sm"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-80 transition">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-4"
            >
              <nav className="space-y-1 flex-1">
                {['Dashboard', 'My Reports', 'Live Map', 'Community', 'Leaderboard'].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      item === 'Dashboard'
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-4">Quick Stats</p>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg cursor-pointer border border-green-200 hover:border-green-300 transition">
                  <p className="text-xs text-slate-600">Eco Points</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">1,240</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg cursor-pointer border border-blue-200 hover:border-blue-300 transition">
                  <p className="text-xs text-slate-600">Your Rank</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">#42</p>
                </motion.div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Welcome & Quick Action */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>
              <p className="text-slate-600 mt-1">Here's your environmental impact dashboard</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setReportModalOpen(true)}
              className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" /> Report Issue Now
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -5, boxShadow: '0 20px 25px -5rgba(0,0,0,0.1)' }}
                className="bg-white rounded-lg border border-slate-200 p-6 cursor-pointer overflow-hidden relative group"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition`}></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    <p className="text-slate-500 text-xs mt-2">{stat.unit}</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.2 }} className={`bg-linear-to-br ${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2 flex-wrap">
              {['all', 'Plastic', 'Construction', 'Air', 'Water'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedFilter === filter
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {filter === 'all' ? 'All Issues' : filter}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AnimatePresence mode="popLayout">
              {filteredReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredReport(report.id)}
                  onMouseLeave={() => setHoveredReport(null)}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition cursor-pointer"
                >
                  <div className={`bg-linear-to-br ${report.color} h-32 relative flex items-center justify-center overflow-hidden`}>
                    <MapPin className="w-16 h-16 text-slate-400 opacity-50" />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={hoveredReport === report.id ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold"
                      >
                        View Details →
                      </motion.button>
                    </motion.div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900 flex-1">{report.type}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {report.location}
                    </p>
                    <p className="text-xs text-slate-500 mb-4">{report.date}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 gap-3">
                      <div className="flex gap-4 text-sm">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1 text-slate-600 hover:text-blue-500 transition"
                        >
                          <Eye className="w-4 h-4" /> {report.views}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1 text-slate-600 hover:text-green-500 transition"
                        >
                          <MessageSquare className="w-4 h-4" /> {report.comments}
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        👍
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No reports found</p>
            </div>
          )}

          {/* Community Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-slate-200 p-6"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Community Activity</h3>
            <div className="space-y-4">
              {communityActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8 }}
                  className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0 cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.name}{' '}
                      <span className="font-normal text-slate-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReportModalOpen(false)}
              className="absolute inset-0 bg-black bg-opacity-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-linear-to-r from-green-50 to-green-100 border-b border-green-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Report Environmental Issue</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReportModalOpen(false)}
                  className="p-1 hover:bg-green-200 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleReportSubmit} className="p-6 space-y-5">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Issue Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                    placeholder="e.g., Plastic waste near park"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Issue Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                    required
                  >
                    <option value="">Select issue type</option>
                    <option value="Plastic">Plastic Waste</option>
                    <option value="Water">Water Pollution</option>
                    <option value="Air">Air Quality</option>
                    <option value="Waste">Illegal Dumping</option>
                  </select>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                    placeholder="Enter location or address"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition resize-none"
                    placeholder="Describe the environmental issue in detail..."
                    rows="4"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-4 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl"
                  >
                    Submit Report ✓
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
