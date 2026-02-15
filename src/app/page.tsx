'use client'

import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, Line, LineChart, ComposedChart,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { 
  Activity, Zap, TrendingDown, AlertCircle, Settings, LogOut, Menu, 
  Download, Filter, Bell, Gauge, Wind
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [timeRange, setTimeRange] = useState('24h')

  // Data for Energy Consumption
  const energyData = [
    { time: '00:00', usage: 45, target: 50, renewable: 20, cost: 5.4 },
    { time: '04:00', usage: 35, target: 50, renewable: 15, cost: 4.2 },
    { time: '08:00', usage: 65, target: 50, renewable: 35, cost: 7.8 },
    { time: '12:00', usage: 85, target: 50, renewable: 55, cost: 10.2 },
    { time: '16:00', usage: 78, target: 50, renewable: 45, cost: 9.4 },
    { time: '20:00', usage: 95, target: 50, renewable: 30, cost: 11.4 },
    { time: '24:00', usage: 72, target: 50, renewable: 25, cost: 8.6 },
  ]

  // Data for Monthly Comparison with trend
  const monthlyData = [
    { month: 'Jan', consumption: 1200, cost: 150, forecast: 1180, renewable: 400 },
    { month: 'Feb', consumption: 1400, cost: 175, forecast: 1450, renewable: 480 },
    { month: 'Mar', consumption: 1100, cost: 138, forecast: 1090, renewable: 520 },
    { month: 'Apr', consumption: 1300, cost: 163, forecast: 1320, renewable: 580 },
    { month: 'May', consumption: 1600, cost: 200, forecast: 1620, renewable: 720 },
    { month: 'Jun', consumption: 1900, cost: 238, forecast: 1880, renewable: 850 },
  ]

  // Hourly detailed data
  const hourlyDetailData = [
    { hour: '00', load: 45, supply: 48, temp: 22, humidity: 65 },
    { hour: '04', load: 35, supply: 38, temp: 20, humidity: 72 },
    { hour: '08', load: 65, supply: 70, temp: 24, humidity: 58 },
    { hour: '12', load: 85, supply: 82, temp: 28, humidity: 52 },
    { hour: '16', load: 78, supply: 80, temp: 27, humidity: 55 },
    { hour: '20', load: 95, supply: 98, temp: 25, humidity: 68 },
    { hour: '24', load: 72, supply: 75, temp: 23, humidity: 70 },
  ]

  // Device Performance Data
  const devicePerformance = [
    { device: 'AC Unit', efficiency: 85, uptime: 98, power: 2.5, status: 'Optimal' },
    { device: 'Fridge', efficiency: 92, uptime: 99, power: 0.8, status: 'Optimal' },
    { device: 'Heater', efficiency: 78, uptime: 92, power: 4.2, status: 'Warning' },
    { device: 'Lighting', efficiency: 88, uptime: 99, power: 1.2, status: 'Optimal' },
  ]

  // Energy Sources
  const energySources = [
    { name: 'Solar', value: 35, color: '#F59E0B' },
    { name: 'Wind', value: 25, color: '#3B82F6' },
    { name: 'Grid', value: 30, color: '#EF4444' },
    { name: 'Battery', value: 10, color: '#10B981' },
  ]

  // Data for Device Status
  const devices = [
    { id: 1, name: 'AC Unit', power: 2.5, status: 'active', efficiency: 85, temp: 22, location: 'Living Room' },
    { id: 2, name: 'Refrigerator', power: 0.8, status: 'active', efficiency: 92, temp: 4, location: 'Kitchen' },
    { id: 3, name: 'Water Heater', power: 4.2, status: 'idle', efficiency: 78, temp: 60, location: 'Basement' },
    { id: 4, name: 'Lighting', power: 1.2, status: 'active', efficiency: 88, temp: 35, location: 'All Areas' },
    { id: 5, name: 'Washing Machine', power: 2.1, status: 'idle', efficiency: 84, temp: 25, location: 'Laundry' },
    { id: 6, name: 'Electric Car Charger', power: 7.5, status: 'idle', efficiency: 95, temp: 28, location: 'Garage' },
  ]

  // Demand Forecast
  const forecastData = [
    { day: 'Mon', predicted: 85, actual: 82, efficiency: 96 },
    { day: 'Tue', predicted: 88, actual: 91, efficiency: 94 },
    { day: 'Wed', predicted: 78, actual: 76, efficiency: 98 },
    { day: 'Thu', predicted: 92, actual: 95, efficiency: 92 },
    { day: 'Fri', predicted: 98, actual: 100, efficiency: 90 },
    { day: 'Sat', predicted: 75, actual: 73, efficiency: 97 },
    { day: 'Sun', predicted: 65, actual: 68, efficiency: 99 },
  ]

  // Radar data for device comparison
  const radarData = [
    { metric: 'Efficiency', AC: 85, Fridge: 92, Heater: 78, Lighting: 88 },
    { metric: 'Uptime', AC: 98, Fridge: 99, Heater: 92, Lighting: 99 },
    { metric: 'Safety', AC: 95, Fridge: 100, Heater: 85, Lighting: 98 },
    { metric: 'Performance', AC: 88, Fridge: 94, Heater: 75, Lighting: 90 },
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
          {sidebarOpen && (
            <h1 className="text-2xl font-bold">SmartEnergy</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/20 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <NavItem icon={<Activity size={20} />} label="Dasbor" active sidebarOpen={sidebarOpen} href="/" />
          <NavItem icon={<Zap size={20} />} label="Perangkat" sidebarOpen={sidebarOpen} href="/devices" />
          <NavItem icon={<TrendingDown size={20} />} label="Analitik" sidebarOpen={sidebarOpen} href="/analytics" />
          <NavItem icon={<AlertCircle size={20} />} label="Pemberitahuan" sidebarOpen={sidebarOpen} href="/alerts" />
        </nav>

        <div className="px-3 pb-6 space-y-2 border-t border-white/20 pt-4">
          <NavItem icon={<Settings size={20} />} label="Pengaturan" sidebarOpen={sidebarOpen} href="/settings" />
          <NavItem icon={<LogOut size={20} />} label="Keluar" sidebarOpen={sidebarOpen} href="/" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header dengan Filter */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard Energi Cerdas</h2>
                <p className="text-gray-500 mt-1">Pemantauan real-time lanjutan dan analitik prediktif</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Penggunaan Saat Ini</p>
                  <p className="text-2xl font-bold text-primary">8.5 kW</p>
                  <p className="text-xs text-green-600">↓ 12% vs kemarin</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {['24h', '7d', '30d', '1y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                      timeRange === range
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2 smooth-transition">
                <Filter size={18} />
                <span>Saring</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-2 smooth-transition">
                <Download size={18} />
                <span>Ekspor</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <KPICard
              title="Penggunaan Hari Ini"
              value="45.2 kWh"
              change="+12%"
              icon={<Zap className="text-orange-500" size={20} />}
              bgColor="bg-orange-50"
            />
            <KPICard
              title="Biaya Bulanan"
              value="Rp 2.45M"
              change="-5%"
              icon={<TrendingDown className="text-green-500" size={20} />}
              bgColor="bg-green-50"
            />
            <KPICard
              title="Penggunaan Puncak"
              value="12.3 kW"
              change="18:30"
              icon={<Activity className="text-blue-500" size={20} />}
              bgColor="bg-blue-50"
            />
            <KPICard
              title="Efisiensi"
              value="87%"
              change="+3%"
              icon={<Gauge className="text-purple-500" size={20} />}
              bgColor="bg-purple-50"
            />
            <KPICard
              title="Terbarukan %"
              value="42%"
              change="+8%"
              icon={<Wind className="text-teal-500" size={20} />}
              bgColor="bg-teal-50"
            />
          </div>

          {/* Advanced Analytics Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Energy Consumption with Forecast */}
            <div className="lg:col-span-2 bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Konsumsi Energi & Prakiraan</h3>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" yAxisId="left" />
                  <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="renewable"
                    fill="#10B981"
                    stroke="#10B981"
                    fillOpacity={0.3}
                  />
                  <Bar yAxisId="left" dataKey="usage" fill="#0F766E" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#F59E0B" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Energy Sources Distribution */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bauran Energi</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={energySources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {energySources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {energySources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-gray-600">{source.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Analytics Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Trend & Forecast */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tren Bulanan & Prakiraan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="consumption" stroke="#0F766E" strokeWidth={2} />
                  <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeDasharray="5 5" strokeWidth={2} />
                  <Line type="monotone" dataKey="renewable" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Demand Forecast */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Akurasi Prakiraan Mingguan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="predicted" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="#0F766E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Advanced Analytics Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Hourly Load Profile */}
            <div className="lg:col-span-2 bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profil Beban Per Jam</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={hourlyDetailData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="load" fill="#0F766E" stroke="#0F766E" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="supply" fill="#10B981" stroke="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Device Performance Overview */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kinerja Perangkat</h3>
              <div className="space-y-3">
                {devicePerformance.map((device, idx) => (
                  <div key={idx} className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-900 text-sm">{device.device}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        device.status === 'Optimal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <ProgressBar label="Efficiency" value={device.efficiency} />
                      <ProgressBar label="Uptime" value={device.uptime} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device Management & Alerts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Active Devices Table */}
            <div className="lg:col-span-2 bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Perangkat Terhubung</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Perangkat</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Lokasi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Daya</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Suhu</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Efisiensi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device) => (
                      <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50 smooth-transition">
                        <td className="py-3 px-4 font-medium text-gray-900">{device.name}</td>
                        <td className="py-3 px-4 text-gray-600">{device.location}</td>
                        <td className="py-3 px-4 text-gray-900 font-semibold">{device.power} kW</td>
                        <td className="py-3 px-4 text-gray-600">{device.temp}°C</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-teal-500" 
                                style={{ width: `${device.efficiency}%` }}
                              />
                            </div>
                            <span className="text-gray-900 font-semibold text-sm">{device.efficiency}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            device.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {device.status === 'active' ? '● Aktif' : '○ Idle'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pemberitahuan Cerdas</h3>
                <Bell size={20} className="text-red-500" />
              </div>
              <div className="space-y-3">
                <AlertItem
                  type="warning"
                  title="Konsumsi Tinggi"
                  message="AC Unit melebihi ambang"
                  time="5 mnt"
                />
                <AlertItem
                  type="info"
                  title="Pemeliharaan Diperlukan"
                  message="Pemeriksaan pemanas air"
                  time="2 jam"
                />
                <AlertItem
                  type="success"
                  title="Puncak Solar"
                  message="Efisiensi solar optimal"
                  time="1 jam"
                />
                <AlertItem
                  type="warning"
                  title="Peringatan Suhu"
                  message="Pemanas berjalan panas"
                  time="3 jam"
                />
              </div>
            </div>
          </div>

          {/* Comparison & Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Comparison Radar */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Perbandingan Perangkat</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                  <Radar name="AC Unit" dataKey="AC" stroke="#0F766E" fill="#0F766E" fillOpacity={0.25} />
                  <Radar name="Fridge" dataKey="Fridge" stroke="#10B981" fill="#10B981" fillOpacity={0.25} />
                  <Radar name="Lighting" dataKey="Lighting" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Environmental Conditions */}
            <div className="bg-white rounded-xl card-shadow p-6 hover:shadow-xl smooth-transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dampak Lingkungan</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={hourlyDetailData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" yAxisId="left" />
                  <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#EF4444" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  sidebarOpen,
  href = '#'
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  sidebarOpen: boolean
  href?: string
}) {
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

function KPICard({
  title,
  value,
  change,
  icon,
  bgColor,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  bgColor: string
}) {
  return (
    <div className="bg-white rounded-lg card-shadow p-4 hover:shadow-lg smooth-transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-green-600 font-medium mt-2">{change}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  )
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-600">{label}</span>
      <div className="flex-1 mx-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 to-blue-500" 
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8">{value}%</span>
    </div>
  )
}

function AlertItem({
  type,
  title,
  message,
  time,
}: {
  type: 'warning' | 'info' | 'success'
  title: string
  message: string
  time: string
}) {
  const bgColor = {
    warning: 'bg-yellow-50 border-l-4 border-yellow-400',
    info: 'bg-blue-50 border-l-4 border-blue-400',
    success: 'bg-green-50 border-l-4 border-green-400',
  }

  const textColor = {
    warning: 'text-yellow-900',
    info: 'text-blue-900',
    success: 'text-green-900',
  }

  return (
    <div className={`${bgColor[type]} p-4 rounded-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-semibold ${textColor[type]}`}>{title}</p>
          <p className={`text-sm ${textColor[type]} opacity-80 mt-1`}>{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}
