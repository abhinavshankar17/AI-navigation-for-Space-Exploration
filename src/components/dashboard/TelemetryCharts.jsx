import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataPoints = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 40 + Math.random() * 30,
    value2: 20 + Math.random() * 10
}));

export default function TelemetryCharts() {
    return (
        <div className="glass-panel p-5 h-full flex flex-col">
            <h3 className="text-[10px] tracking-[0.2em] font-mono text-gray-400 mb-4 uppercase flex items-center justify-between border-b border-[#333] pb-3">
                <span>SYS.PWR_CNSMPT_CHRT</span>
                <span className="text-[10px] text-neon-blue bg-[#111] border border-[#222] px-2 py-0.5">LIVE</span>
            </h3>

            <div className="flex-1 w-full min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataPoints}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffaa00" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#ffaa00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4fa8ff" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#4fa8ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 4" stroke="#222" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #333', color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="stepAfter" dataKey="value" stroke="#ffaa00" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        <Area type="stepAfter" dataKey="value2" stroke="#4fa8ff" strokeWidth={2} fillOpacity={1} fill="url(#colorValue2)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
