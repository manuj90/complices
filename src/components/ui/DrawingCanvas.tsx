import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Palette } from 'lucide-react';

const COLORS = ['#F1E8E8', '#DE8F3B', '#EA5021', '#941612', '#477C86', '#6D6D6D'];

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(false);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    return { canvas, ctx };
  }, []);

  useEffect(() => {
    const result = getCtx();
    if (!result) return;
    const { canvas, ctx } = result;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [getCtx]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const result = getCtx();
    if (!result) return;
    const { ctx } = result;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const result = getCtx();
    if (!result) return;
    const { ctx } = result;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clear = () => {
    const result = getCtx();
    if (!result) return;
    const { canvas, ctx } = result;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <motion.div
      className="drawing-canvas"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="drawing-canvas__header">
        <span className="drawing-canvas__title">Dejá tu marca</span>
        <div className="drawing-canvas__tools">
          <Palette size={16} />
          {COLORS.map((c) => (
            <button
              key={c}
              className={`drawing-canvas__color ${color === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={`Color ${c}`}
            />
          ))}
          <button className="drawing-canvas__clear" onClick={clear} aria-label="Borrar">
            <Eraser size={16} />
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="drawing-canvas__surface"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      <p className="drawing-canvas__hint">
        Lo que dibujes se proyecta en la experiencia
      </p>
    </motion.div>
  );
}