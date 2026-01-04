import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import partnerLogo from '../partner.JPG';

const LandingAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [glitchIntensity, setGlitchIntensity] = useState(0);
    const [vhsOffset, setVhsOffset] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase(1), 300); // Intro Delay: 0.3s
        const timer2 = setTimeout(() => setPhase(2), 3300); // SITCOM duration: 3.0s
        const timer3 = setTimeout(() => setPhase(3), 6800); // Partner duration: 3.5s
        const timer4 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 7600); // Final Exit Transition: 0.8s

        // Random glitch intensity pulses
        const glitchInterval = setInterval(() => {
            setGlitchIntensity(Math.random());
        }, 150);

        // VHS tracking distortion
        const vhsInterval = setInterval(() => {
            setVhsOffset(Math.random() * 10 - 5);
        }, 100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearInterval(glitchInterval);
            clearInterval(vhsInterval);
        };
    }, [onComplete]);

    const title = "SITCOM SYNTAX";
    const words = title.split(' ');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f5f7fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {/* Sound Bar Visualizer Background */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '8px',
                padding: '0 20px',
                zIndex: 1,
                overflow: 'hidden'
            }}>
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={`bar-${i}`}
                        animate={{
                            height: [
                                `${10 + Math.random() * 15}%`,
                                `${30 + Math.random() * 40}%`,
                                `${15 + Math.random() * 25}%`,
                                `${40 + Math.random() * 50}%`,
                                `${10 + Math.random() * 15}%`,
                            ],
                            opacity: [0.3, 0.7, 0.5, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 1.2 + Math.random() * 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.05
                        }}
                        style={{
                            width: '100%',
                            maxWidth: '20px',
                            minHeight: '5%',
                            background: i % 3 === 0
                                ? 'linear-gradient(to top, rgba(0, 243, 255, 0.6), rgba(0, 243, 255, 0.2))'
                                : i % 3 === 1
                                    ? 'linear-gradient(to top, rgba(255, 0, 255, 0.6), rgba(255, 0, 255, 0.2))'
                                    : 'linear-gradient(to top, rgba(147, 51, 234, 0.6), rgba(147, 51, 234, 0.2))',
                            borderRadius: '4px 4px 0 0',
                            boxShadow: i % 3 === 0
                                ? '0 0 20px rgba(0, 243, 255, 0.4)'
                                : i % 3 === 1
                                    ? '0 0 20px rgba(255, 0, 255, 0.4)'
                                    : '0 0 20px rgba(147, 51, 234, 0.4)',
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </div>

            {/* Ambient Glow Behind Bars */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '60%',
                    background: 'radial-gradient(ellipse at bottom, rgba(0, 243, 255, 0.15) 0%, rgba(255, 0, 255, 0.1) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    animate={{
                        y: [0, -100 - Math.random() * 200],
                        x: [0, (Math.random() - 0.5) * 100],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeOut'
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '0%',
                        left: `${(i / 15) * 100}%`,
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#00f3ff' : '#ff00ff',
                        boxShadow: `0 0 10px ${i % 2 === 0 ? '#00f3ff' : '#ff00ff'}`,
                        zIndex: 2
                    }}
                />
            ))}


            {/* Sound Bar Visualizer at Top */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '8px',
                padding: '0 20px',
                zIndex: 1,
                overflow: 'hidden'
            }}>
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={`bar-top-${i}`}
                        animate={{
                            height: [
                                `${10 + Math.random() * 15}%`,
                                `${30 + Math.random() * 40}%`,
                                `${15 + Math.random() * 25}%`,
                                `${40 + Math.random() * 50}%`,
                                `${10 + Math.random() * 15}%`,
                            ],
                            opacity: [0.3, 0.7, 0.5, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 1.2 + Math.random() * 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.05
                        }}
                        style={{
                            width: '100%',
                            maxWidth: '20px',
                            minHeight: '5%',
                            background: i % 3 === 0
                                ? 'linear-gradient(to bottom, rgba(0, 243, 255, 0.6), rgba(0, 243, 255, 0.2))'
                                : i % 3 === 1
                                    ? 'linear-gradient(to bottom, rgba(255, 0, 255, 0.6), rgba(255, 0, 255, 0.2))'
                                    : 'linear-gradient(to bottom, rgba(147, 51, 234, 0.6), rgba(147, 51, 234, 0.2))',
                            borderRadius: '0 0 4px 4px',
                            boxShadow: i % 3 === 0
                                ? '0 0 20px rgba(0, 243, 255, 0.4)'
                                : i % 3 === 1
                                    ? '0 0 20px rgba(255, 0, 255, 0.4)'
                                    : '0 0 20px rgba(147, 51, 234, 0.4)',
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </div>

            {/* Ambient Glow at Top */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '60%',
                    background: 'radial-gradient(ellipse at top, rgba(0, 243, 255, 0.15) 0%, rgba(255, 0, 255, 0.1) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            {/* Holographic overlay */}
            <motion.div
                animate={{
                    background: [
                        'linear-gradient(45deg, rgba(0, 243, 255, 0.1) 0%, transparent 50%, rgba(255, 0, 255, 0.1) 100%)',
                        'linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, transparent 50%, rgba(0, 243, 255, 0.1) 100%)',
                        'linear-gradient(225deg, rgba(0, 243, 255, 0.1) 0%, transparent 50%, rgba(255, 0, 255, 0.1) 100%)',
                        'linear-gradient(315deg, rgba(255, 0, 255, 0.1) 0%, transparent 50%, rgba(0, 243, 255, 0.1) 100%)',
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 5
                }}
            />

            {/* Electromagnetic pulse rings */}
            {glitchIntensity > 0.75 && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        border: '3px solid rgba(0, 243, 255, 0.6)',
                        borderRadius: '50%',
                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.8)'
                    }}
                />
            )}


            {/* Grid overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.03, 0.01, 0.03, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        linear-gradient(0deg, transparent 24%, rgba(0, 243, 255, 0.05) 25%, rgba(0, 243, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, 0.05) 75%, rgba(0, 243, 255, 0.05) 76%, transparent 77%, transparent),
                        linear-gradient(90deg, transparent 24%, rgba(0, 243, 255, 0.05) 25%, rgba(0, 243, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, 0.05) 75%, rgba(0, 243, 255, 0.05) 76%, transparent 77%, transparent)
                    `,
                    backgroundSize: '50px 50px',
                    pointerEvents: 'none',
                    zIndex: 10
                }}
            />

            {/* Matrix rain effect */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`matrix-${i}`}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{
                        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        left: `${(i / 15) * 100}%`,
                        width: '2px',
                        height: '100px',
                        background: 'linear-gradient(to bottom, transparent, rgba(0, 243, 255, 0.5), transparent)',
                        filter: 'blur(1px)'
                    }}
                />
            ))}

            <AnimatePresence mode="wait">
                {phase < 2 && (
                    <motion.div
                        key="glitch-title"
                        initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.2,
                            filter: 'blur(20px)',
                            rotateY: 90
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{
                            perspective: '1000px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            zIndex: 100
                        }}
                    >
                        {words.map((word, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx === 0 ? -100 : 100, rotateZ: idx === 0 ? -5 : 5 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    rotateZ: 0
                                }}
                                transition={{
                                    delay: idx * 0.2,
                                    duration: 0.6,
                                    type: 'spring',
                                    stiffness: 100
                                }}
                                className="glitch-container"
                                style={{
                                    filter: glitchIntensity > 0.85 ? `hue-rotate(${glitchIntensity * 360}deg)` : 'none',
                                    position: 'relative'
                                }}
                            >
                                <span className="glitch-text glitch-text-enhanced" data-text={word}>
                                    {word}
                                </span>

                                {/* RGB Split Effect */}
                                <motion.span
                                    className="rgb-split-red"
                                    data-text={word}
                                    animate={{
                                        x: glitchIntensity > 0.9 ? [-3, 3, -2, 0] : 0,
                                        opacity: glitchIntensity > 0.9 ? [0.7, 0.5, 0.7] : 0.5
                                    }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {word}
                                </motion.span>
                                <motion.span
                                    className="rgb-split-blue"
                                    data-text={word}
                                    animate={{
                                        x: glitchIntensity > 0.9 ? [3, -3, 2, 0] : 0,
                                        opacity: glitchIntensity > 0.9 ? [0.7, 0.5, 0.7] : 0.5
                                    }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {word}
                                </motion.span>

                                {/* Neon glow effect */}
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '110%',
                                        height: '110%',
                                        background: 'radial-gradient(circle, rgba(0, 243, 255, 0.3) 0%, transparent 70%)',
                                        filter: 'blur(20px)',
                                        zIndex: -3,
                                        pointerEvents: 'none'
                                    }}
                                />
                            </motion.div>
                        ))}

                        {/* Digital artifacts */}
                        {glitchIntensity > 0.8 && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.1 }}
                                    style={{
                                        position: 'absolute',
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        width: `${Math.random() * 200 + 50}px`,
                                        height: '3px',
                                        background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`,
                                        transform: `translateX(-50%) skew(${Math.random() * 20 - 10}deg)`
                                    }}
                                />
                                {/* Additional glitch blocks */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.8, 0] }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        position: 'absolute',
                                        top: `${Math.random() * 80 + 10}%`,
                                        left: `${Math.random() * 80 + 10}%`,
                                        width: `${Math.random() * 100 + 30}px`,
                                        height: `${Math.random() * 100 + 30}px`,
                                        border: '2px solid rgba(0, 243, 255, 0.6)',
                                        background: 'rgba(255, 0, 255, 0.1)'
                                    }}
                                />
                            </>
                        )}
                    </motion.div>
                )}

                {phase === 2 && (
                    <motion.div
                        key="partner-animation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(20px)' }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100,
                            gap: '40px',
                            textAlign: 'center'
                        }}
                    >
                        {/* Heading at the top */}
                        <motion.h2
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                color: '#1a1a1a',
                                fontWeight: '800',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                                background: 'linear-gradient(45deg, #00f3ff, #ff00ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.3))'
                            }}
                        >
                            Our Industry Partner
                        </motion.h2>

                        {/* Logo at the center */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1.5, // Natural PowerPoint-style fade duration
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            style={{
                                width: 'min(300px, 60vw)',
                                height: 'min(300px, 60vw)',
                                background: 'white',
                                borderRadius: '24px',
                                padding: '20px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0, 243, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src={partnerLogo}
                                alt="Kapidhwaj Innovations"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    clipPath: 'inset(2px)' // Hides the black border in the source image
                                }}
                            />
                            {/* Decorative scanline on logo */}
                            <motion.div
                                animate={{ top: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    width: '100%',
                                    height: '50%',
                                    background: 'linear-gradient(to bottom, transparent, rgba(0, 243, 255, 0.1), transparent)',
                                    pointerEvents: 'none'
                                }}
                            />
                        </motion.div>

                        {/* Name below the logo */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            <span style={{
                                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                                color: '#333',
                                fontWeight: '800',
                                letterSpacing: '1px'
                            }}>
                                Kapidhwaj Innovations
                            </span>
                            <motion.div
                                style={{
                                    height: '3px',
                                    background: 'linear-gradient(90deg, transparent, #00f3ff, #ff00ff, transparent)',
                                    borderRadius: '2px'
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 1.2, duration: 1 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced light flares with chromatic aberration */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(0, 243, 255, 0.2) 0%, rgba(255, 0, 255, 0.1) 50%, rgba(255, 255, 255, 0) 70%)',
                    borderRadius: '50%',
                    top: '-300px',
                    left: '-300px',
                    filter: 'blur(60px)',
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '700px',
                    height: '700px',
                    background: 'radial-gradient(circle, rgba(255, 0, 255, 0.15) 0%, rgba(0, 243, 255, 0.1) 50%, rgba(255, 255, 255, 0) 70%)',
                    borderRadius: '50%',
                    bottom: '-250px',
                    right: '-250px',
                    filter: 'blur(60px)',
                }}
            />

            {/* Particle effects */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                        scale: 0
                    }}
                    animate={{
                        x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.25
                    }}
                    style={{
                        position: 'absolute',
                        width: i % 3 === 0 ? '6px' : '4px',
                        height: i % 3 === 0 ? '6px' : '4px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#00f3ff' : '#ff00ff',
                        boxShadow: `0 0 ${i % 3 === 0 ? '15px' : '10px'} ${i % 2 === 0 ? '#00f3ff' : '#ff00ff'}`
                    }}
                />
            ))}

            {/* Corner accent elements */}
            {[0, 1, 2, 3].map((corner) => (
                <motion.div
                    key={`corner-${corner}`}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: corner * 0.5
                    }}
                    style={{
                        position: 'absolute',
                        width: '100px',
                        height: '100px',
                        border: '2px solid rgba(0, 243, 255, 0.3)',
                        ...(corner === 0 && { top: 20, left: 20, borderRight: 'none', borderBottom: 'none' }),
                        ...(corner === 1 && { top: 20, right: 20, borderLeft: 'none', borderBottom: 'none' }),
                        ...(corner === 2 && { bottom: 20, left: 20, borderRight: 'none', borderTop: 'none' }),
                        ...(corner === 3 && { bottom: 20, right: 20, borderLeft: 'none', borderTop: 'none' }),
                    }}
                />
            ))}
        </div>
    );
};

export default LandingAnimation;
