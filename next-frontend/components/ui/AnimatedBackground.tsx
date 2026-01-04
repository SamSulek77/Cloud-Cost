'use client';

import React, { useMemo } from 'react';
import { Cloud, DollarSign, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface FloatingIconProps {
    icon: React.ElementType;
    delay: number;
    duration: number;
    size: number;
    top: string;
    left: string;
    opacity: number;
}

const FloatingIcon = ({ icon: Icon, delay, duration, size, top, left, opacity }: FloatingIconProps) => {
    return (
        <div
            className="absolute animate-float pointer-events-none text-blue-400"
            style={{
                top,
                left,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: opacity * 1.5 + 0.1, // Increased visibility
            }}
        >
            <Icon size={size} strokeWidth={1} />
        </div>
    );
};

export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
    const icons = useMemo(() => {
        const iconTypes = [Cloud, DollarSign, TrendingUp, BarChart3, PieChart, Activity];
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            icon: iconTypes[i % iconTypes.length],
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 20,
            size: 40 + Math.random() * 60,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2 + Math.random() * 0.3, // Increased base opacity
        }));
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-100/50 blur-[120px]" />
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {icons.map((icon) => (
                    <FloatingIcon key={icon.id} {...icon} />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                {children}
            </div>
        </div>
    );
}
