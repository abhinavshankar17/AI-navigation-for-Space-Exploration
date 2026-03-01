import { Maximize, Disc } from 'lucide-react'

export default function CameraFeed() {
    return (
        <div className="glass-panel p-1 w-full h-full relative overflow-hidden flex flex-col group bg-[#050505]">
            <div className="absolute top-1 left-1 bottom-1 right-1 bg-[url('https://images.unsplash.com/photo-1614728853970-32a227f7d373?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700">
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4fa8ff]/5 to-transparent h-[5%] w-full animate-[scan_3s_linear_infinite] pointer-events-none" />
            </div>

            {/* Overlay UI */}
            <div className="relative z-10 flex flex-col h-full p-4 justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="bg-black/80 px-2 py-1 text-red-500 text-[10px] tracking-widest font-mono flex items-center gap-2 border border-red-900/50">
                        <Disc size={10} className="animate-pulse" /> REC
                    </div>
                    <div className="bg-black/80 px-2 py-1 text-gray-300 text-[10px] tracking-widest font-mono border border-[#333]">
                        OPTICAL_SNS_01 / FRONT
                    </div>
                </div>

                {/* Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                    <div className="w-[1px] h-full bg-white/20 absolute left-1/2 -translate-x-1/2"></div>
                    <div className="w-1 h-1 bg-neon-blue absolute" />
                </div>

                <div className="flex justify-between items-end">
                    <div className="font-mono text-[9px] text-[#4fa8ff] tracking-widest bg-black/80 p-2 border border-[#333]">
                        EXP: AUTO <br />
                        F/1.8 <br />
                        ISO: 800 <br />
                        FL: 35MM
                    </div>
                    <button className="pointer-events-auto bg-black/80 border border-[#333] hover:border-neon-blue hover:text-neon-blue p-2 text-gray-400 transition-colors">
                        <Maximize size={14} />
                    </button>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 25% 100%, linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 100% 25%' }}
            />
        </div>
    )
}
