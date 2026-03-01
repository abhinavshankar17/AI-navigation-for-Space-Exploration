import { Battery, Zap, Wifi, Cpu, Thermometer } from 'lucide-react'

const StatusItem = ({ icon: Icon, label, value, unit, color = "text-white" }) => (
    <div className="flex flex-col p-3 bg-[#0a0a0c] border border-[#222] border-l-2" style={{ borderLeftColor: color !== 'text-white' ? 'var(--color-neon-blue)' : '#333' }}>
        <div className="flex items-center gap-2 mb-2 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            <Icon size={12} className={color} /> {label}
        </div>
        <div className={`text-lg font-mono tracking-wider ${color}`}>
            {value} <span className="text-xs text-gray-600 ml-1">{unit}</span>
        </div>
    </div>
)

export default function RoverStatus({ data }) {
    return (
        <div className="glass-panel p-5 h-full flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#333] pb-3">
                <h2 className="text-sm font-bold text-gray-300 tracking-[0.2em] flex items-center gap-3">
                    SYSTEM DIAGNOSTICS
                    <span className={`text-[10px] font-mono tracking-widest ${data.status === 'ONLINE' ? 'text-neon-green' : 'text-neon-alert'}`}>
                        [{data.status}]
                    </span>
                </h2>
                <div className="text-[10px] tracking-[0.2em] font-mono text-neon-blue bg-[#111] px-2 py-1 border border-[#222]">MOD:{data.mode}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <StatusItem
                    icon={Battery}
                    label="Battery"
                    value={data.battery.toFixed(1)}
                    unit="%"
                    color={data.battery < 20 ? "text-neon-alert" : "text-neon-green"}
                />
                <StatusItem
                    icon={Zap}
                    label="Speed"
                    value={data.speed.toFixed(2)}
                    unit="cm/s"
                    color="text-neon-blue"
                />
                <StatusItem
                    icon={Wifi}
                    label="Signal"
                    value={data.signalStrength.toFixed(0)}
                    unit="dBm"
                    color="text-neon-purple"
                />
                <StatusItem
                    icon={Thermometer}
                    label="Temp"
                    value={data.temperature.toFixed(1)}
                    unit="°C"
                    color="text-orange-400"
                />
            </div>

            <div className="mt-auto border-t border-[#333] pt-3">
                <div className="flex justify-between text-[10px] text-gray-500 mb-2 tracking-[0.2em]">
                    <span>CORE.CPU_LOAD</span>
                    <span className="text-gray-300 font-mono">{data.cpuLoad.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 bg-[#111] border border-[#222] relative overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 left-0 bg-neon-blue transition-all duration-500 opacity-80"
                        style={{ width: `${data.cpuLoad}%` }}
                    />
                    {/* Add grid dashes over progress bar for technical look */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,#111_90%)] bg-[length:4px_100%] pointer-events-none"></div>
                </div>
            </div>
        </div>
    )
}
