import { useEffect, useRef } from 'react';

const WaterfallBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * -height; // Start above screen
                this.speed = Math.random() * 5 + 2; // Speed between 2 and 7
                this.length = Math.random() * 20 + 10; // Length between 10 and 30
                this.opacity = Math.random() * 0.5 + 0.1;
                this.width = Math.random() * 2 + 1; // Thickness
            }

            update() {
                this.y += this.speed;
                if (this.y > height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity})`; // Cyan
                ctx.lineWidth = this.width;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y - this.length);
                ctx.stroke();
            }
        }

        // Adjust particle count based on screen width
        const particleCount = Math.floor(width / 10);
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // Clear with trail
            ctx.fillRect(0, 0, width, height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Maybe reset particles or add more on resize, but simple resize is okay for now
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default WaterfallBackground;
