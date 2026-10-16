import React, { useEffect, useRef } from 'react';
import { Transaction } from '../types';

interface AnalyticsChartProps {
  transactions: Transaction[];
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ transactions }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 360;
    const height = 130;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Get up to 5 recent transaction amounts
    const recent = transactions.slice(0, 5);
    const vals = recent.map((t) => Math.abs(t.amt));
    const max = Math.max(...vals, 1000);

    if (vals.length === 0) {
      // Empty chart placeholder
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('No transaction data to display yet', width / 2, height / 2);
      return;
    }

    const barWidth = Math.min(42, (width - 40) / Math.max(vals.length, 1) - 12);
    const totalBarsWidth = vals.length * barWidth + (vals.length - 1) * 16;
    const startX = Math.max(16, (width - totalBarsWidth) / 2);

    vals.forEach((v, i) => {
      const h = Math.max(8, (v / max) * 75);
      const x = startX + i * (barWidth + 16);
      const y = height - h - 22;

      // Draw subtle rounded bar
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      const radius = 6;
      ctx.roundRect(x, y, barWidth, h, [radius, radius, 0, 0]);
      ctx.fill();

      // Top value label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'center';
      const formattedVal = v >= 1000 ? `₦${Math.round(v / 1000)}k` : `₦${v}`;
      ctx.fillText(formattedVal, x + barWidth / 2, y - 5);

      // Bottom index / label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '10px system-ui';
      ctx.fillText(`#${i + 1}`, x + barWidth / 2, height - 8);
    });
  }, [transactions]);

  return (
    <div className="glass p-4 rounded-xl mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm text-gray-200 flex items-center gap-2">
          <i className="fa-solid fa-chart-simple text-yellow-400"></i>
          <span>Transaction Analytics</span>
        </h3>
        <span className="text-xs text-gray-400">Last 5 Activities</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[130px] rounded-lg block"
      />
    </div>
  );
};
