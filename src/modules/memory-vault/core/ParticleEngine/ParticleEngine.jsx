// Memory Vault Studio - 60 FPS HTML5 Canvas Particle Engine

import React, { useEffect, useRef } from 'react';

export default function ParticleEngine({ type = 'sparkles', primaryColor = '#F8D48E' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = type === 'snow' ? 60 : type === 'confetti' ? 50 : 35;
    const particles = Array.from({ length: count }, () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        alpha: Math.random(),
        vx: (Math.random() - 0.5) * (type === 'confetti' ? 2 : 0.4),
        vy: type === 'snow' ? Math.random() * 1 + 0.5 : type === 'hearts' ? -Math.random() * 0.8 - 0.2 : (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * 0.02 + 0.005,
        color: type === 'hearts' ? '#FF758F' : type === 'snow' ? '#FFFFFF' : type === 'confetti' ? ['#FF4D4D', '#4D96FF', '#FFD93D', '#6BCB77'][Math.floor(Math.random() * 4)] : primaryColor
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.pulse;

        if (p.alpha > 1 || p.alpha < 0) p.pulse = -p.pulse;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = Math.abs(p.alpha);

        if (type === 'hearts') {
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 5}px sans-serif`;
          ctx.fillText('♥', p.x, p.y);
        } else if (type === 'snow') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        } else if (type === 'confetti') {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size * 2, p.size * 4);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [type, primaryColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3
      }}
    />
  );
}
