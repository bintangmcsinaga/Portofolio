import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [ripples, setRipples] = useState([]);

    const addRipple = useCallback((e) => {
        const newRipple = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
        };

        setRipples((prev) => {
            // Limit number of ripples to keep performance high
            if (prev.length > 20) {
                return [...prev.slice(1), newRipple];
            }
            return [...prev, newRipple];
        });
    }, []);

    const removeRipple = useCallback((id) => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, []);

    useEffect(() => {
        let lastTime = 0;
        const throttleDelay = 10;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime > throttleDelay) {
                addRipple(e);
                lastTime = now;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [addRipple]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{
                            opacity: 0.5,
                            scale: 0,
                            x: ripple.x - 20,
                            y: ripple.y - 20
                        }}
                        animate={{
                            opacity: 0,
                            scale: 2,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        onAnimationComplete={() => removeRipple(ripple.id)}
                        className="absolute w-10 h-10 rounded-full border border-cyan-400/30 bg-cyan-400/10 blur-[2px]"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
