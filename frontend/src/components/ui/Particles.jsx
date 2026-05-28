import { useEffect, useRef } from 'react';

export default function Particles({ count = 40 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: ['#00B400', '#0077C8', '#FFD54A'][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-40" aria-hidden />;
}
