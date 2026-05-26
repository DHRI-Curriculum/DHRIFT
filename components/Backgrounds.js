import React, { useEffect, useRef, useState } from 'react';

const TrianglifyBasic = () => {
  const containerRef = useRef(null);
  const [seed, setSeed] = useState(Math.random());
  const [cellSize, setCellSize] = useState(Math.random() * 40 + 20); // 20-60
  const [variance, setVariance] = useState(Math.random() * 2); // 0-2
  const palettes = [
    // Primary theme colors
    ['#2E2E2E', '#3C342F', '#F9976A'], // bark, brown, sun
    ['#F9F3EF', '#FFFFFF', '#8dd0cd'], // cream, white, sky
    ['#F9976A', '#F9F3EF', '#8dd0cd'], // sun, cream, sky
    // Variations
    ['#2E2E2E', '#3C342F', '#1B1621'], // dark theme
    ['#F9F3EF', '#8dd0cd', '#FFFFFF'], // light theme
    ['#F9976A', '#8dd0cd', '#F9F3EF'], // accent theme
  ];

  useEffect(() => {
    let cancelled = false;

    const generatePattern = async () => {
      if (!containerRef.current) return;

      const { default: trianglify } = await import('trianglify');
      if (cancelled || !containerRef.current) return;

      const pattern = trianglify({
        width: 400,
        height: 250,
        cellSize: cellSize,
        xColors: palettes[Math.floor(Math.random() * palettes.length)],
        variance: variance,
        strokeWidth: 1.51,
        fill: true,
        seed: seed
      });

      // Clear previous canvas
      containerRef.current.innerHTML = '';
      const canvas = pattern.toSVG();
      containerRef.current.appendChild(canvas);
    };

    generatePattern();
    return () => {
      cancelled = true;
    };
  }, [seed, cellSize, variance]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative">
        <div 
          ref={containerRef} 
          className="w-full h-96 rounded-lg shadow-lg overflow-hidden"
        />

      </div>
    </div>
  );
};

export default TrianglifyBasic;
