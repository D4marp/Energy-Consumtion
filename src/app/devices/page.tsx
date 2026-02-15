'use client'

import { useState } from 'react'
import { Power, AlertCircle, Settings, Trash2, Edit2, Plus, Search, Cpu, Thermometer, Zap, Clock, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import Link from 'next/link'

export default function DevicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Devices dengan data lengkap
  const devices = [
    {
      id: 1,
      name: 'Unit AC - Ruang Tamu',
      type: 'Pendingin Udara',
      status: 'active',
      power: 2.5,
      efficiency: 85,
      uptime: 98,
      temp: 22,
      location: 'Ruang Tamu',
      lastMaintenance: '2026-01-15',
      energyToday: 45.2,
      costToday: 5.42,
      consumption: [
        { time: '00:00', power: 2.1 },
        { time: '04:00', power: 1.8 },
        { time: '08:00', power: 2.6 },
        { time: '12:00', power: 2.8 },
        { time: '16:00', power: 3.0 },
        { time: '20:00', power: 2.4 },
        { time: '24:00', power: 2.2 },
      ]
    },
    {
      id: 2,
      name: 'Kulkas - Dapur',
      type: 'Kulkas',
      status: 'active',
      power: 0.8,
      efficiency: 92,
      uptime: 99.5,
      temp: 4,
      location: 'Dapur',
      lastMaintenance: '2026-01-10',
      energyToday: 18.5,
      costToday: 2.22,
      consumption: [
        { time: '00:00', power: 0.75 },
        { time: '04:00', power: 0.85 },
        { time: '08:00', power: 0.8 },
        { time: '12:00', power: 0.9 },
        { time: '16:00', power: 0.85 },
        { time: '20:00', power: 0.8 },
        { time: '24:00', power: 0.75 },
      ]
    },
    {
      id: 3,
      name: 'Pemanas Air - Ruang Bawah',
      type: 'Pemanas Air',
      status: 'idle',
      power: 4.2,
      efficiency: 78,
      uptime: 92,
      temp: 60,
      location: 'Ruang Bawah',
      lastMaintenance: '2025-12-20',
      energyToday: 0,
      costToday: 0,
      consumption: [
        { time: '00:00', power: 0 },
        { time: '04:00', power: 0 },
        { time: '08:00', power: 0 },
        { time: '12:00', power: 0 },
        { time: '16:00', power: 0 },
        { time: '20:00', power: 4.2 },
        { time: '24:00', power: 0 },
      ]
    },
    {
      id: 4,
      name: 'Sistem Pencahayaan',
      type: 'Pencahayaan',
      status: 'active',
      power: 1.2,
      efficiency: 88,
      uptime: 99,
      temp: 35,
      location: 'Semua Area',
      lastMaintenance: '2026-01-25',
      energyToday: 8.4,
      costToday: 1.01,
      consumption: [
        { time: '00:00', power: 0.3 },
        { time: '04:00', power: 0.2 },
        { time: '08:00', power: 0.8 },
        { time: '12:00', power: 1.2 },
        { time: '16:00', power: 1.5 },
        { time: '20:00', power: 1.8 },
        { time: '24:00', power: 1.0 },
      ]
    },
    {
      id: 5,
      name: 'Mesin Cuci',
      type: 'Mesin Cuci',
      status: 'idle',
      power: 2.1,
      efficiency: 84,
      uptime: 88,
      temp: 25,
      location: 'Ruang Cuci',
      lastMaintenance: '2026-01-05',
      energyToday: 0,
      costToday: 0,
      consumption: [
        { time: '00:00', power: 0 },
        { time: '04:00', power: 0 },
        { time: '08:00', power: 2.1 },
        { time: '12:00', power: 0 },
        { time: '16:00', power: 0 },
        { time: '20:00', power: 0 },
        { time: '24:00', power: 0 },
      ]
    },
    {
      id: 6,
      name: 'Pengisi Daya EV',
      type: 'Pengisi Daya',
      status: 'active',
      power: 7.5,
      efficiency: 95,
      uptime: 96,
      temp: 28,
      location: 'Garasi',
      lastMaintenance: '2026-01-20',
      energyToday: 22.5,
      costToday: 2.70,
      consumption: [
        { time: '00:00', power: 0 },
        { time: '04:00', power: 0 },
        { time: '08:00', power: 0 },
        { time: '12:00', power: 7.5 },
        { time: '16:00', power: 7.5 },
        { time: '20:00', power: 0 },
        { time: '24:00', power: 0 },
      ]
    },
  ]

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const deviceTypeStats = [
    { name: 'AC', value: 1, color: '#0F766E' },
    { name: 'Fridge', value: 1, color: '#10B981' },
    { name: 'Heating', value: 1, color: '#EF4444' },
    { name: 'Lighting', value: 1, color: '#F59E0B' },
    { name: 'Other', value: 2, color: '#3B82F6' },
  ]

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
            <Cpu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <NavLink href="/" icon={<AlertCircle size={20} />} label="Dashboard" sidebarOpen={sidebarOpen} />
          <NavLink href="/devices" icon={<Cpu size={20} />} label="Devices" active sidebarOpen={sidebarOpen} />
          <NavLink href="/analytics" icon={<BarChart3 size={20} />} label="Analytics" sidebarOpen={sidebarOpen} />
          <NavLink href="/alerts" icon={<AlertCircle size={20} />} label="Alerts" sidebarOpen={sidebarOpen} />
        </nav>

        <div className="px-3 pb-6 space-y-2 border-t border-white/20 pt-4">
          <NavLink href="/settings" icon={<Settings size={20} />} label="Settings" sidebarOpen={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Manajemen Perangkat</h2>
              <p className="text-gray-500 mt-1">{filteredDevices.length} perangkat terhubung</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2 smooth-transition">
              <Plus size={20} />
              <span>Tambah Perangkat</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Search & Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari perangkat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="idle">Idle</option>
            </select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Perangkat" value={devices.length} icon={<Cpu className="text-blue-500" />} />
            <StatCard title="Aktif" value={devices.filter(d => d.status === 'active').length} icon={<Power className="text-green-500" />} />
            <StatCard title="Idle" value={devices.filter(d => d.status === 'idle').length} icon={<Clock className="text-gray-500" />} />
            <StatCard title="Efisiensi Rata-rata" value="88.7%" icon={<Zap className="text-yellow-500" />} />
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {filteredDevices.map((device) => (
              <div key={device.id} className="bg-white rounded-xl card-shadow p-6 hover:shadow-lg smooth-transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-500">{device.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 size={18} className="text-blue-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Device Status */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="font-medium text-gray-700">{device.status === 'active' ? 'Aktif' : 'Idle'}</span>
                    </div>
                    <span className="text-sm text-gray-500">{device.location}</span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <MetricBox label="Daya" value={`${device.power} kW`} icon={<Zap size={16} />} />
                    <MetricBox label="Suhu" value={`${device.temp}°C`} icon={<Thermometer size={16} />} />
                    <MetricBox label="Efisiensi" value={`${device.efficiency}%`} icon={<Cpu size={16} />} />
                    <MetricBox label="Uptime" value={`${device.uptime}%`} icon={<Clock size={16} />} />
                  </div>
                </div>

                {/* Daily Stats */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Penggunaan Hari Ini</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{device.energyToday} kWh</span>
                    <span className="font-semibold text-gray-900">Rp {(device.costToday * 1000).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Mini Chart */}
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={device.consumption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="power" fill="#0F766E" stroke="#0F766E" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Device Type Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tren Kinerja Perangkat</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredDevices[0]?.consumption || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="power" stroke="#0F766E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipe Perangkat</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={deviceTypeStats} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {deviceTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
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

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-lg card-shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      </div>
    </div>
  )
}

function MetricBox({ label, value, icon }: any) {
  return (
    <div className="bg-gray-50 rounded-lg p-2 flex items-start space-x-2">
      <div className="p-1.5 bg-primary/10 rounded text-primary">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}
