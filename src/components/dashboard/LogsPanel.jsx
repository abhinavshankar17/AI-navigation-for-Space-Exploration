import { Terminal, Clock } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function LogsPanel({ logs }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [logs]);

    return (
        <div className="glass-panel p-5 h-full flex flex-col">
            <div className="flex items-center gap-2 text-gray-400 mb-3 border-b border-[#333] pb-3">
                <Terminal size={14} className="text-neon-blue" />
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em]">SYS.EVENT_LOGS</h3>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-1 font-mono text-[10px] bg-[#050505] border border-[#222] p-2"
            >
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 hover:bg-[#111] p-1 border-l-2 border-transparent hover:border-neon-blue transition-colors cursor-default">
                        <span className="text-gray-600 shrink-0">{log.timestamp}</span>
                        <span className={`shrink-0 w-20 
                            ${log.level === 'INFO' ? 'text-blue-400' :
                                log.level === 'WARNING' ? 'text-yellow-400 font-bold' :
                                    log.level === 'SUCCESS' ? 'text-neon-green' :
                                        log.level === 'DEBUG' ? 'text-purple-400' : 'text-gray-400'
                            }`}>[{log.level}]</span>
                        <span className="text-gray-300 break-words tracking-wide">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
