import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'circle' | 'rect' | 'heart' | 'star';
  rotation: number;
  vRot: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ConfettiCanvasProps {
  triggerBurst?: boolean;
  burstRarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const PASTEL_COLORS = [
  '#FF6B81', '#FF9EAA', '#FFC7DA', '#DCCEFF', '#A2D2FF',
  '#CFF5E7', '#A8E6CF', '#FDFFB6', '#FFD166', '#FFB7C5'
];

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({
  triggerBurst = false,
  burstRarity = 'common',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Trigger burst effect when triggerBurst flips to true
  useEffect(() => {
    if (!triggerBurst) return;

    const count = burstRarity === 'legendary' ? 120 : burstRarity === 'epic' ? 80 : 50;
    const colors = burstRarity === 'legendary'
      ? ['#FFD700', '#FFF275', '#FF9F1C', '#FF5E78', '#FFFFFF']
      : PASTEL_COLORS;

    const newParticles: Particle[] = [];
    const width = window.innerWidth || 400;
    const height = window.innerHeight || 600;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      const shapes: Particle['shape'][] = ['circle', 'rect', 'heart', 'star'];

      newParticles.push({
        x: width / 2,
        y: height / 2 - 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        life: 0,
        maxLife: 80 + Math.random() * 60,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
  }, [triggerBurst, burstRarity]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial ambient background floating particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.3 - Math.random() * 0.5,
          size: 4 + Math.random() * 6,
          color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
          shape: Math.random() > 0.5 ? 'heart' : 'circle',
          rotation: Math.random() * Math.PI,
          vRot: 0.02,
          alpha: 0.4 + Math.random() * 0.4,
          life: 0,
          maxLife: 300,
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically spawn ambient background floaties
      if (Math.random() < 0.05 && particlesRef.current.length < 35) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.5 - Math.random() * 0.8,
          size: 5 + Math.random() * 6,
          color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
          shape: Math.random() > 0.4 ? 'heart' : 'star',
          rotation: Math.random() * Math.PI,
          vRot: 0.02,
          alpha: 0.5,
          life: 0,
          maxLife: 250,
        });
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Apply slight gravity if burst particle
        if (p.maxLife < 200) {
          p.vy += 0.15; // Gravity
          p.vx *= 0.98;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);
        } else {
          // Ambient floaty fade out near top
          if (p.y < 50) p.alpha -= 0.01;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.shape === 'star') {
          drawStar(ctx, p.size);
        }

        ctx.restore();

        return p.life < p.maxLife && p.alpha > 0 && p.y < canvas.height + 20;
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
};

function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, s / 2);
  ctx.bezierCurveTo(0, 0, -s, 0, -s, s / 2);
  ctx.bezierCurveTo(-s, s, 0, s * 1.5, 0, s * 1.8);
  ctx.bezierCurveTo(0, s * 1.5, s, s, s, s / 2);
  ctx.bezierCurveTo(s, 0, 0, 0, 0, s / 2);
  ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const points = 5;
  const outer = size / 2;
  const inner = size / 4;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / points;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}
