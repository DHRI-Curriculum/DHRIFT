import React, { useEffect, useRef, useState } from 'react';
import trianglify from 'trianglify';

const TrianglifyBasic = () => {
  const containerRef = useRef(null);
  const [seed, setSeed] = useState(Math.random());
  const [cellSize, setCellSize] = useState(Math.random() * 40 + 20); // 20-60
  const [variance, setVariance] = useState(Math.random() * 2); // 0-2
  const [intensity, setIntensity] = useState(0.5 + Math.random() * 0.5); // 0.5-1

  const palettes = [
    // Original palettes
    ['#f7f7f7', '#d1d1d1', '#a8a8a8'],
    ['#ff6b6b', '#f06595', '#cc5de8'],
    ['#4dabf7', '#3bc9db', '#38d9a9'],
    ['#ffd43b', '#ffa94d', '#ff8787'],
    // Nature inspired
    ['#2D5A27', '#5AA45C', '#95E06C'],
    ['#1B3B6F', '#065A82', '#1C7293'],
    ['#FC7307', '#FCA001', '#FDD85D'],
    // Modern & minimal
    ['#2B2D42', '#8D99AE', '#EDF2F4'],
    ['#233D4D', '#FE7F2D', '#FCCA46'],
    // Vibrant
    ['#7400B8', '#6930C3', '#5E60CE'],
    ['#FF0A54', '#FF477E', '#FF5C8A'],
    ['#55A630', '#80B918', '#AACC00'],
    // Pastel
    ['#FFE5D9', '#FFD7BA', '#FEC89A'],
    ['#BDE0FE', '#A2D2FF', '#CDB4DB'],
    // Dark mode
    ['#2B2D42', '#1A1A1D', '#4E4E50']
  ];

  const generatePattern = () => {
    if (!containerRef.current) return;

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

  useEffect(() => {
    generatePattern();
  }, [seed, cellSize, variance, intensity]);

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