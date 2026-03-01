import { useState } from 'react'
import { Monitor, Map, Radio, Activity, Terminal, Battery, Shield } from 'lucide-react'
import RoverStatus from './components/dashboard/RoverStatus'
import CameraFeed from './components/dashboard/CameraFeed'
import MapPanel from './components/dashboard/MapPanel'
import TelemetryCharts from './components/dashboard/TelemetryCharts'
import LogsPanel from './components/dashboard/LogsPanel'
import ControlPanel from './components/dashboard/ControlPanel'
import { useRoverData } from './hooks/useRoverData'

// Industrial Space Agency Header
const Header = () => (
  <header className="glass-panel sticky top-0 z-40 flex items-center justify-between px-6 py-4 mb-6 border-b-2 border-b-neon-blue/20">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-space-800 border-l-2 border-neon-blue text-neon-blue">
        <Activity size={24} className="opacity-80" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-[0.2em] text-white">MANGALYAN-2 COMMAND</h1>
        <p className="text-[10px] text-gray-500 tracking-[0.3em] mt-1 uppercase">ARES • Autonomous Rover Exploration System</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex flex-col items-end text-right border-r border-[#333] pr-6">
        <div className="text-[10px] text-gray-500 tracking-[0.2em]">MISSION TIME [UTC]</div>
        <div className="text-lg font-mono text-gray-300">14:32:05.420</div>
      </div>
      <div className="text-right hidden sm:flex flex-col items-end">
        <div className="text-[10px] text-gray-500 tracking-[0.2em]">LOCAL SOLAR DAY</div>
        <div className="text-lg font-mono text-neon-blue">SOL-0142</div>
      </div>
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#111] border border-red-900/50 text-red-500 text-[10px] tracking-widest font-mono">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> [ LIVE DATA LINK ]
      </div>
    </div>
  </header>
)

const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-6 gap-8 z-50 bg-[#0a0a0c] border-r border-[#222]">
    <div className="text-neon-blue mb-4 opacity-80 border-b border-[#333] pb-6 w-full flex justify-center">
      <Shield size={28} />
    </div>
    <nav className="flex flex-col gap-6 w-full items-center">
      {['Dashboard', 'Map', 'Telemetry', 'Logs', 'Settings'].map((item) => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={`relative group p-3 transition-all duration-200 border-l-2 ${activeTab === item ? 'border-neon-blue bg-[#1a1b26] text-neon-blue' : 'border-transparent text-gray-600 hover:text-gray-300 hover:bg-[#111]'}`}
        >
          {item === 'Dashboard' ? <Monitor size={24} /> :
            item === 'Map' ? <Map size={24} /> :
              item === 'Telemetry' ? <Activity size={24} /> :
                item === 'Logs' ? <Terminal size={24} /> :
                  <Battery size={24} />}
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-space-800 text-white px-2 py-1 rounded-md text-sm transition-opacity whitespace-nowrap z-50 border border-white/10 pointer-events-none">
            {item}
          </span>
        </button>
      ))}
    </nav>
  </aside>
)

function App() {
  const { data, toggleMode } = useRoverData();
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-neon-blue/30 selection:text-neon-blue overflow-x-hidden overflow-y-auto w-full relative">
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-10"></div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pl-24 pr-4 py-4 min-h-screen flex flex-col pt-6 font-mono">
        <Header />

        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[calc(100vh-140px)] min-h-[800px] md:min-h-[600px] pb-10">
            {/* Left Column: Status & Map */}
            <div className="col-span-1 md:col-span-8 flex flex-col gap-6 h-[800px] md:h-full">
              {/* Map takes up top 50% */}
              <div className="h-[55%] w-full">
                <MapPanel position={data.position} obstacles={data.obstacles || []} />
              </div>

              {/* Bottom Split: Camera & Charts */}
              <div className="h-[45%] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-full">
                  <CameraFeed />
                </div>
                <div className="h-full">
                  <TelemetryCharts />
                </div>
              </div>
            </div>

            {/* Right Column: Controls & Logs */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-6 h-[800px] md:h-full">
              <div className="h-[30%]">
                <RoverStatus data={data} />
              </div>
              <div className="h-[25%]">
                <ControlPanel mode={data.mode} onToggleMode={toggleMode} />
              </div>
              <div className="h-[45%]">
                <LogsPanel logs={data.logs} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Map' && (
          <div className="h-[calc(100vh-140px)] min-h-[600px] w-full pb-10">
            <MapPanel position={data.position} obstacles={data.obstacles || []} />
          </div>
        )}

        {activeTab === 'Telemetry' && (
          <div className="h-[calc(100vh-140px)] min-h-[600px] w-full gap-6 flex flex-col pb-10">
            <div className="h-full">
              <TelemetryCharts />
            </div>
          </div>
        )}

        {activeTab === 'Logs' && (
          <div className="h-[calc(100vh-140px)] min-h-[600px] w-full pb-10">
            <LogsPanel logs={data.logs} />
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="h-[calc(100vh-140px)] min-h-[600px] w-full flex items-center justify-center glass-panel rounded-lg mb-10">
            <h2 className="text-xl text-slate-400 font-mono flex items-center gap-3">
              <Battery size={24} className="text-neon-blue animate-pulse" /> Settings Module Offline
            </h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
