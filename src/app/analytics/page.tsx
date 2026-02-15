'use client'

import { useState } from 'react'
import { Menu, Settings, Download, Filter, TrendingUp, Target, BarChart3, Cpu } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import Link from 'next/link'

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  // Monthly Data
  const monthlyData = [
    { month: 'Jan', consumption: 1200, cost: 150, renewable: 400, forecast: 1180 },
    { month: 'Feb', consumption: 1400, cost: 175, renewable: 480, forecast: 1450 },
    { month: 'Mar', consumption: 1100, cost: 138, renewable: 520, forecast: 1090 },
    { month: 'Apr', consumption: 1300, cost: 163, renewable: 580, forecast: 1320 },
    { month: 'May', consumption: 1600, cost: 200, renewable: 720, forecast: 1620 },
    { month: 'Jun', consumption: 1900, cost: 238, renewable: 850, forecast: 1880 },
  ]

  // Daily trends
  const dailyTrends = [
    { day: 'Mon', peak: 85, average: 72, minimum: 45, demand: 80 },
    { day: 'Tue', peak: 88, average: 75, minimum: 48, demand: 83 },
    { day: 'Wed', peak: 78, average: 68, minimum: 42, demand: 73 },
    { day: 'Thu', peak: 92, average: 80, minimum: 50, demand: 88 },
    { day: 'Fri', peak: 98, average: 85, minimum: 55, demand: 93 },
    { day: 'Sat', peak: 75, average: 65, minimum: 40, demand: 70 },
    { day: 'Sun', peak: 65, average: 58, minimum: 35, demand: 60 },
  ]

  // Device Comparison
  const deviceComparison = [
    { device: 'AC Unit', efficiency: 85, consumption: 45, cost: 5.4 },
    { device: 'Fridge', efficiency: 92, consumption: 18, cost: 2.2 },
    { device: 'Heater', efficiency: 78, consumption: 0, cost: 0 },
    { device: 'Lighting', efficiency: 88, consumption: 8, cost: 1.0 },
    { device: 'Washer', efficiency: 84, consumption: 0, cost: 0 },
    { device: 'EV Charger', efficiency: 95, consumption: 22, cost: 2.7 },
  ]

  // Hourly pattern
  const hourlyPattern = [
    { hour: '00', load: 35, renewable: 2 },
    { hour: '04', load: 28, renewable: 1 },
    { hour: '08', load: 52, renewable: 15 },
    { hour: '12', load: 75, renewable: 45 },
    { hour: '16', load: 68, renewable: 52 },
    { hour: '20', load: 88, renewable: 25 },
    { hour: '24', load: 55, renewable: 5 },
  ]

  // Cost breakdown
  const costBreakdown = [
    { category: 'Peak Hours', cost: 120, percentage: 50 },
    { category: 'Off-Peak', cost: 80, percentage: 33 },
    { category: 'Renewable', cost: 40, percentage: 17 },
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
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <NavLink href="/" icon={<BarChart3 size={20} />} label="Dasbor" sidebarOpen={sidebarOpen} />
          <NavLink href="/devices" icon={<Cpu size={20} />} label="Perangkat" sidebarOpen={sidebarOpen} />
          <NavLink href="/analytics" icon={<TrendingUp size={20} />} label="Analitik" active sidebarOpen={sidebarOpen} />
          <NavLink href="/alerts" icon={<Filter size={20} />} label="Pemberitahuan" sidebarOpen={sidebarOpen} />
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
              <h2 className="text-3xl font-bold text-gray-900">Analitik & Wawasan</h2>
              <p className="text-gray-500 mt-1">Analisis konsumsi energi terperinci</p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                    timeRange === range ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2">
              <Download size={18} />
              <span>Ekspor</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard
              title="Total Konsumsi"
              value="8,500 kWh"
              change="+5.2%"
              icon={<TrendingUp className="text-blue-500" />}
            />
            <AnalyticsCard
              title="Rata-rata Harian"
              value="283 kWh"
              change="-2.1%"
              icon={<Target className="text-green-500" />}
            />
            <AnalyticsCard
              title="Beban Puncak"
              value="12.3 kW"
              change="18:45 Hari Ini"
              icon={<BarChart3 className="text-orange-500" />}
            />
            <AnalyticsCard
              title="Terbarukan %"
              value="42%"
              change="+8.3%"
              icon={<TrendingUp className="text-teal-500" />}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Trend */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tren Konsumsi Bulanan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" yAxisId="left" />
                  <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="consumption" fill="#0F766E" radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="forecast" stroke="#F59E0B" strokeDasharray="5 5" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Patterns */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pola Beban Harian</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="peak" fill="#EF4444" stroke="#EF4444" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="average" fill="#0F766E" stroke="#0F766E" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Device Efficiency */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analisis Efisiensi Perangkat</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deviceComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="device" type="category" stroke="#6b7280" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#10B981" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Pattern */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Beban Per Jam vs Terbarukan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" yAxisId="left" />
                  <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="load" stroke="#0F766E" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="renewable" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Consumers */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Konsumen Energi Teratas</h3>
              <div className="space-y-3">
                {deviceComparison
                  .sort((a, b) => b.consumption - a.consumption)
                  .map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{device.device}</p>
                        <p className="text-sm text-gray-500">{device.consumption} kWh hari ini</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">Rp {(device.cost * 1000).toLocaleString('id-ID')}</p>
                        <p className="text-sm text-gray-500">{device.efficiency}% efisien</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl card-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analisis Rincian Biaya</h3>
              <div className="space-y-4">
                {costBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm font-semibold text-gray-700">Rp {(item.cost * 1000).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.percentage}% dari total</p>
                  </div>
                ))}
              </div>
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

function AnalyticsCard({ title, value, change, icon }: any) {
  return (
    <div className="bg-white rounded-lg card-shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-green-600 font-medium mt-2">{change}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      </div>
    </div>
  )
}
