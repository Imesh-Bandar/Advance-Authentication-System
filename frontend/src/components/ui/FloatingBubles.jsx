import React from 'react'

const bubbles = [
    {
        className: "absolute top-16 left-16 w-28 h-28 bg-white opacity-70 rounded-full shadow-xl",
        style: { animationDelay: '0s', background: 'linear-gradient(135deg, #fff 60%, #e0e7ff 100%)' }
    },
    {
        className: "absolute bottom-24 right-24 w-32 h-32 bg-blue-100 opacity-40 rounded-full shadow-xl",
        style: { animationDelay: '1.5s', background: 'linear-gradient(135deg, #dbeafe 60%, #f1f5f9 100%)' }
    },
    {
        className: "absolute top-1/2 left-1/3 w-20 h-20 bg-white opacity-60 rounded-full shadow-lg",
        style: { animationDelay: '2s', background: 'linear-gradient(135deg, #f3f4f6 60%, #bae6fd 100%)' }
    },
    // Additional bubbles for richer effect
    {
        className: "absolute top-10 right-32 w-16 h-16 bg-blue-200 opacity-30 rounded-full shadow",
        style: { animationDelay: '2.7s', background: 'linear-gradient(135deg, #e0e7ff 60%, #f0fdfa 100%)' }
    },
    {
        className: "absolute bottom-10 left-1/4 w-24 h-24 bg-blue-50 opacity-50 rounded-full shadow",
        style: { animationDelay: '3.2s', background: 'linear-gradient(135deg, #dbeafe 60%, #fff 100%)' }
    },
    {
        className: "absolute top-1/4 right-1/5 w-14 h-14 bg-white opacity-60 rounded-full shadow",
        style: { animationDelay: '1.2s', background: 'linear-gradient(135deg, #fff 60%, #e0e7ff 100%)' }
    },
    {
        className: "absolute bottom-1/3 right-1/3 w-20 h-20 bg-blue-100 opacity-40 rounded-full shadow",
        style: { animationDelay: '4s', background: 'linear-gradient(135deg, #f0fdfa 60%, #dbeafe 100%)' }
    },
    {
        className: "absolute top-1/5 left-1/2 w-12 h-12 bg-blue-200 opacity-30 rounded-full shadow",
        style: { animationDelay: '5s', background: 'linear-gradient(135deg, #e0e7ff 60%, #fff 100%)' }
    }
];

const FloatingBubles = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none w-screen h-screen"
            style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}>
            {/* Soft clean background color */}
            <div className="absolute inset-0 w-full h-full" style={{
                background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)'
            }} />
            {/* Glass overlay */}
            <div className="absolute inset-0 w-full h-full backdrop-blur-[60px] bg-white/30 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]" />
            {/* Subtle vignette */}
            <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-br from-black/5 via-transparent to-white/5" />
            {/* Centered glass effect for form */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[540px] rounded-2xl bg-white/50 shadow-xl backdrop-blur-2xl border border-white/20"
                style={{ zIndex: 1 }}
            />
            {/* Moving bubbles */}
            {bubbles.map((bubble, idx) => (
                <divdesig
                    key={idx}
                    className={`${bubble.className} animate-soft-bounce`}
                    style={bubble.style}
                />
            ))}
            {/* Bubble animation keyframes */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
                html, body {
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                }
                @keyframes soft-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-30px) scale(1.04); }
                }
                .animate-soft-bounce {
                    animation: soft-bounce 7s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default FloatingBubles