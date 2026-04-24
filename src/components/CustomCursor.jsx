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
                        className="absolute h-10 w-10 rounded-full border border-[#FF653F]/30 bg-[radial-gradient(circle_at_center,rgba(255,101,63,0.18),rgba(69,46,90,0.05)_65%,transparent)] blur-[1px]"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
