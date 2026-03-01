import { Power, Crosshair, Navigation } from 'lucide-react'

export default function ControlPanel({ mode, onToggleMode }) {
    const isAuto = mode === 'AUTONOMOUS';

    return (
        <div className="glass-panel p-5 h-full flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2 border-b border-[#333] pb-3">
                <Crosshair size={14} className="text-neon-blue" />
                <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase">SYSTEM.NAV_CONTROL</h3>
            </div>

            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={onToggleMode}
                    className={`flex-1 py-6 border-2 font-mono text-[10px] tracking-[0.2em] flex flex-col items-center gap-3 transition-colors duration-150 relative overflow-hidden group ${isAuto ? 'bg-[#111] text-neon-blue border-neon-blue shadow-[inset_0_0_10px_rgba(79,168,255,0.2)]' : 'bg-[#050505] text-gray-600 border-[#222] hover:border-[#444]'}`}
                >
                    <Navigation size={20} className={isAuto ? "animate-pulse" : ""} />
                    <span>AUTONOMOUS</span>
                    {isAuto && <div className="absolute top-0 right-0 w-2 h-2 bg-neon-blue m-1"></div>}
                </button>

                <button
                    onClick={onToggleMode}
                    className={`flex-1 py-6 border-2 font-mono text-[10px] tracking-[0.2em] flex flex-col items-center gap-3 transition-colors duration-150 relative ${!isAuto ? 'bg-[#111] text-neon-orange border-neon-orange shadow-[inset_0_0_10px_rgba(255,170,0,0.2)]' : 'bg-[#050505] text-gray-600 border-[#222] hover:border-[#444]'}`}
                >
                    <Power size={20} />
                    <span>MANUAL_OVR</span>
                    {!isAuto && <div className="absolute top-0 left-0 w-2 h-2 bg-neon-orange m-1"></div>}
                </button>
            </div>

            <div className="mt-2 text-center bg-[#111] border border-[#222] p-2">
                <div className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] mb-1">ACTIVEPROTOCOL</div>
                <div className={`text-xs font-mono tracking-widest ${isAuto ? 'text-neon-blue' : 'text-neon-orange'}`}>
                    [{mode}]
                </div>
            </div>
        </div>
    )
}
