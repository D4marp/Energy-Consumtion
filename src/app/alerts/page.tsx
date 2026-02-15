'use client'

import { useState } from 'react'
import { Menu, Settings, Bell, AlertCircle, Trash2, Eye, EyeOff, Archive, Filter, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Power Consumption Detected',
      message: 'AC Unit consumption exceeded 3.0 kW threshold',
      device: 'AC Unit - Living Room',
      time: '5 minutes ago',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      severity: 'high'
    },
    {
      id: 2,
      type: 'error',
      title: 'Device Offline',
      message: 'Water Heater lost connection',
      device: 'Water Heater - Basement',
      time: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: false,
      severity: 'critical'
    },
    {
      id: 3,
      type: 'success',
      title: 'Solar Panel Efficiency Peak',
      message: 'Solar panels operating at 100% capacity',
      device: 'Solar Array',
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 1 * 3600000),
      read: true,
      severity: 'info'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Temperature Alert',
      message: 'Heater temperature exceeds safe limit',
      device: 'Water Heater - Basement',
      time: '3 hours ago',
      timestamp: new Date(Date.now() - 3 * 3600000),
      read: true,
      severity: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Maintenance Reminder',
      message: 'Scheduled maintenance due for AC Unit',
      device: 'AC Unit - Living Room',
      time: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: true,
      severity: 'info'
    },
    {
      id: 6,
      type: 'warning',
      title: 'Energy Usage Peak',
      message: 'Daily peak energy usage recorded',
      device: 'Entire System',
      time: '2 days ago',
      timestamp: new Date(Date.now() - 2 * 24 * 3600000),
      read: true,
      severity: 'medium'
    },
    {
      id: 7,
      type: 'success',
      title: 'Efficiency Improved',
      message: 'Overall system efficiency increased by 3%',
      device: 'Entire System',
      time: '3 days ago',
      timestamp: new Date(Date.now() - 3 * 24 * 3600000),
      read: true,
      severity: 'info'
    },
    {
      id: 8,
      type: 'error',
      title: 'Sensor Malfunction',
      message: 'Sensor reading inconsistency detected',
      device: 'Lighting System',
      time: '4 days ago',
      timestamp: new Date(Date.now() - 4 * 24 * 3600000),
      read: true,
      severity: 'high'
    },
  ]

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filterType === 'all' || alert.type === filterType
    const statusMatch = filterStatus === 'all' || (filterStatus === 'unread' ? !alert.read : alert.read)
    return typeMatch && statusMatch
  })

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    unread: alerts.filter(a => !a.read).length,
    resolved: alerts.filter(a => a.read).length,
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="text-red-500" size={20} />
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />
      default:
        return <Clock className="text-blue-500" size={20} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-l-4 border-red-500'
      case 'high':
        return 'bg-orange-100 border-l-4 border-orange-500'
      case 'medium':
        return 'bg-yellow-100 border-l-4 border-yellow-500'
      default:
        return 'bg-blue-100 border-l-4 border-blue-500'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } gradient-primary text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">SmartEnergy</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/20 rounded-lg">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <NavLink href="/" icon={<Settings size={20} />} label="Dasbor" sidebarOpen={sidebarOpen} />
          <NavLink href="/devices" icon={<Menu size={20} />} label="Perangkat" sidebarOpen={sidebarOpen} />
          <NavLink href="/analytics" icon={<Filter size={20} />} label="Analitik" sidebarOpen={sidebarOpen} />
          <NavLink href="/alerts" icon={<Bell size={20} />} label="Pemberitahuan" active sidebarOpen={sidebarOpen} />
        </nav>

        <div className="px-3 pb-6 space-y-2 border-t border-white/20 pt-4">
          <NavLink href="/settings" icon={<Settings size={20} />} label="Pengaturan" sidebarOpen={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Pemberitahuan & Notifikasi</h2>
              <p className="text-gray-500 mt-1">Pantau dan kelola pemberitahuan sistem</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Belum Dibaca</p>
                <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2">
                <Bell size={20} />
                <span>Pengaturan</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="all">Semua Tipe</option>
              <option value="error">Kesalahan</option>
              <option value="warning">Peringatan</option>
              <option value="success">Berhasil</option>
              <option value="info">Info</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="all">Semua Status</option>
              <option value="unread">Belum Dibaca</option>
              <option value="read">Sudah Dibaca</option>
            </select>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Pemberitahuan" value={stats.total} color="bg-blue-100 text-blue-600" />
            <StatCard title="Kritis" value={stats.critical} color="bg-red-100 text-red-600" />
            <StatCard title="Belum Dibaca" value={stats.unread} color="bg-yellow-100 text-yellow-600" />
            <StatCard title="Diselesaikan" value={stats.resolved} color="bg-green-100 text-green-600" />
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="bg-white rounded-xl card-shadow p-12 text-center">
                <Bell size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Tidak ada pemberitahuan</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`${getSeverityColor(alert.severity)} rounded-lg p-4 hover:shadow-md smooth-transition`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-2 bg-white/50 rounded-lg mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          {!alert.read && (
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="font-medium">{alert.device}</span>
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 hover:bg-white/50 rounded-lg smooth-transition" title="Mark as read">
                        {alert.read ? (
                          <Eye size={18} className="text-gray-600" />
                        ) : (
                          <EyeOff size={18} className="text-gray-400" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-white/50 rounded-lg smooth-transition" title="Archive">
                        <Archive size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-200 rounded-lg smooth-transition" title="Delete">
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function NavLink({ href, icon, label, active = false, sidebarOpen }: any) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg smooth-transition ${
        active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
      }`}
    >
      {icon}
      {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
    </Link>
  )
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white rounded-lg card-shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  )
}
