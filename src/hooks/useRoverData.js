import { useState, useEffect } from 'react';

export const useRoverData = () => {
    const [data, setData] = useState({
        status: "ONLINE",
        mode: "AUTONOMOUS",
        battery: 87,
        speed: 0,
        position: { lat: -14.5684, lng: 175.4726 }, // Jezero Crater approx
        temperature: -64,
        cpuLoad: 42,
        signalStrength: 98,
        heading: 0,
        logs: [
            { id: 1, timestamp: '14:30:01', level: 'INFO', message: 'System initialization complete' },
            { id: 2, timestamp: '14:30:05', level: 'INFO', message: 'Navigation module active' },
            { id: 3, timestamp: '14:30:12', level: 'SUCCESS', message: 'Link established with Orbiter' },
        ]
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const isMoving = prev.mode === "AUTONOMOUS" || prev.mode === "MANUAL_FWD";
                const newSpeed = isMoving ? Math.min(4.5, Math.max(0, prev.speed + (Math.random() - 0.4))) : Math.max(0, prev.speed - 0.5);
                const batteryDrain = isMoving ? 0.05 : 0.01;

                // Simulating heading change
                const headingChange = isMoving ? (Math.random() - 0.5) * 5 : 0;

                // Random new log
                let newLogs = prev.logs;
                if (Math.random() > 0.95) {
                    const messages = [
                        { level: 'INFO', message: 'Terrain analysis complete: Clear' },
                        { level: 'WARNING', message: 'Minor wheel slip detected' },
                        { level: 'INFO', message: 'Trajectory adjusted for obstacle' },
                        { level: 'SUCCESS', message: 'Waypoint Alpha reached' },
                        { level: 'DEBUG', message: 'LiDAR point cloud processed' }
                    ];
                    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                    const now = new Date();
                    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                    newLogs = [{
                        id: Date.now(),
                        timestamp: timeStr,
                        level: randomMsg.level,
                        message: randomMsg.message
                    }, ...prev.logs].slice(0, 50);
                }

                return {
                    ...prev,
                    battery: Math.max(0, prev.battery - batteryDrain),
                    speed: Math.abs(newSpeed), // keep positive
                    heading: (prev.heading + headingChange + 360) % 360,
                    temperature: -60 - Math.random() * 5,
                    cpuLoad: 40 + Math.random() * 20,
                    signalStrength: Math.min(100, Math.max(80, prev.signalStrength + (Math.random() - 0.5) * 5)),
                    logs: newLogs
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleMode = () => {
        setData(prev => ({
            ...prev,
            mode: prev.mode === "AUTONOMOUS" ? "MANUAL_STOP" : "AUTONOMOUS"
        }));
    };

    return { data, toggleMode };
};
