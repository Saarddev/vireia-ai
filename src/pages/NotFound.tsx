import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useSEO } from '@/hooks/use-seo';
import { Home, Play, Pause, RotateCw, ArrowDown } from 'lucide-react';

// --- Tetris Setup ---
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
};

const COLORS = {
  I: "bg-cyan-100/70 border-cyan-400/70",
  O: "bg-yellow-100/75 border-yellow-300/60",
  T: "bg-purple-100/70 border-purple-400/60",
  S: "bg-lime-100/60 border-lime-400/55",
  Z: "bg-pink-100/60 border-pink-300/50",
  J: "bg-blue-100/65 border-blue-300/60",
  L: "bg-orange-100/70 border-orange-300/60",
  0: "bg-white/0 border-white/10"
};

function createEmptyBoard() {
  return Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));
}

function getRandomPiece() {
  const keys = Object.keys(TETROMINOES);
  const k = keys[Math.floor(Math.random() * keys.length)];
  return {
    shape: TETROMINOES[k],
    type: k,
    x: Math.floor((BOARD_WIDTH - TETROMINOES[k][0].length) / 2),
    y: 0,
  };
}

export default function NotFound() {
  const location = useLocation();
  const [board, setBoard] = useState(createEmptyBoard);
  const [current, setCurrent] = useState(getRandomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [over, setOver] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTick = useRef(performance.now());

  useSEO({
    title: '404 - Play Tetris | Vireia AI',
    description: 'Page not found? Enjoy a beautiful Tetris break.',
    canonical: `https://www.vireia.com${location.pathname}`,
    keywords: '404, tetris, puzzle, game',
    noindex: true,
  });

  // --- Helper Logic ---
  const checkCollision = useCallback((piece, brd, dx = 0, dy = 0) => {
    for (let y = 0; y < piece.shape.length; ++y) {
      for (let x = 0; x < piece.shape[y].length; ++x) {
        if (piece.shape[y][x]) {
          let px = piece.x + x + dx;
          let py = piece.y + y + dy;
          if (px < 0 || px >= BOARD_WIDTH || py >= BOARD_HEIGHT)
            return true;
          if (py >= 0 && brd[py][px]) return true;
        }
      }
    }
    return false;
  }, []);

  const rotate = useCallback((piece) => {
    const rotated = piece.shape[0].map((_, idx) => piece.shape.map(row => row[idx]).reverse());
    return { ...piece, shape: rotated };
  }, []);

  const placePiece = useCallback((piece, brd) => {
    const copy = brd.map(row => [...row]);
    piece.shape.forEach((row, dy) =>
      row.forEach((cell, dx) => {
        if (cell) {
          const y = piece.y + dy, x = piece.x + dx;
          if (y >= 0) copy[y][x] = piece.type;
        }
      })
    );
    return copy;
  }, []);

  const clearLines = useCallback((brd) => {
    let cleared = 0;
    const filtered = brd.filter(row => row.includes(0));
    cleared = BOARD_HEIGHT - filtered.length;
    while (filtered.length < BOARD_HEIGHT) filtered.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    return { brd: filtered, cleared };
  }, []);

  // --- Game Tick (performance: uses rAF and delta) ---
  const tick = useCallback(() => {
    if (!playing || over) return;
    setCurrent(prev => {
      if (checkCollision(prev, board, 0, 1)) {
        const nextBoard = placePiece(prev, board);
        const { brd: clearedBrd, cleared } = clearLines(nextBoard);
        setBoard(clearedBrd);
        setLines(l => l + cleared);
        setScore(s => s + (cleared * 100 * level) + 10);
        setLevel(l => Math.floor((lines + cleared) / 10) + 1);
        const next = getRandomPiece();
        if (checkCollision(next, clearedBrd)) {
          setOver(true);
          setPlaying(false);
          return prev;
        }
        return next;
      }
      return { ...prev, y: prev.y + 1 };
    });
  }, [playing, over, board, checkCollision, placePiece, clearLines, level, lines]);

  // --- Animation/Game Loop ---
  useEffect(() => {
    if (!playing || over) return;
    const gameLoop = (now) => {
      let speed = Math.max(70, 520 - (level - 1) * 50);
      if (now - lastTick.current >= speed) {
        tick();
        lastTick.current = now;
      }
      rafRef.current = requestAnimationFrame(gameLoop);
    };
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, over, tick, level]);

  // --- Keyboard Controls (no rerenders on keypress) ---
  useEffect(() => {
    if (!playing || over) return;
    const keydown = (e) => {
      setCurrent(prev => {
        let np = prev;
        if (e.key === "ArrowLeft") {
          if (!checkCollision(prev, board, -1, 0)) np = { ...prev, x: prev.x - 1 };
        }
        if (e.key === "ArrowRight") {
          if (!checkCollision(prev, board, 1, 0)) np = { ...prev, x: prev.x + 1 };
        }
        if (e.key === "ArrowDown") {
          if (!checkCollision(prev, board, 0, 1)) np = { ...prev, y: prev.y + 1 };
        }
        if (e.key === " " || e.key === "ArrowUp") {
          const rotated = rotate(prev);
          if (!checkCollision(rotated, board)) np = rotated;
        }
        return np;
      });
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [playing, over, board, checkCollision, rotate]);

  // --- Start/Restart Control ---
  const startGame = () => {
    setBoard(createEmptyBoard());
    setCurrent(getRandomPiece());
    setScore(0); setLines(0); setLevel(1);
    setOver(false); setPlaying(true);
    lastTick.current = performance.now();
  };

  // --- Board/Cell Rendering, memoized for perf ---
  const renderBoard = useMemo(() => {
    // Layer piece over static board (no mutating state)
    const display = board.map(arr => [...arr]);
    if (!over) {
      current.shape.forEach((row, dy) =>
        row.forEach((cell, dx) => {
          if (cell) {
            const y = current.y + dy, x = current.x + dx;
            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
              display[y][x] = current.type;
            }
          }
        })
      );
    }
    return display.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div key={x}
            className={`w-6 h-6 border rounded-[5px] transition-colors 
              ${COLORS[cell] || COLORS[0]} `}
            style={{ transitionProperty: 'background,border' }}
          />
        ))}
      </div>
    ));
  }, [board, current, over]);

  // --- Light grid overlay ---
  const gridOverlay = (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ opacity: 0.22 }}>
      {Array.from({ length: BOARD_WIDTH + 1 }).map((_, i) => (
        <line key={i + 'v'} x1={i * 24} y1={0} x2={i * 24} y2={BOARD_HEIGHT * 24} stroke="#b2b2d5" strokeWidth="1" />
      ))}
      {Array.from({ length: BOARD_HEIGHT + 1 }).map((_, i) => (
        <line key={i + 'h'} y1={i * 24} x1={0} y2={i * 24} x2={BOARD_WIDTH * 24} stroke="#b2b2d5" strokeWidth="1" />
      ))}
    </svg>
  );

  // --- Glow Shadow ---
  const glow = (
    <div className="absolute left-0 bottom-0 w-full h-24 pointer-events-none z-30"
      style={{
        background: "linear-gradient(to top, #b296fa 60%, #fff0 100%)",
        filter: 'blur(10px)', opacity: 0.6, borderRadius: '0 0 32px 32px'
      }} />
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9fc] transition-bg duration-400">
      <div className="mb-4 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-2">Page Not Found</h1>
        <h2 className="text-xl font-semibold text-purple-700"> Enjoy a Tetris Break!</h2>
      </div>
      <div className="relative flex flex-col items-center p-4">
        {/* Tetris Board */}
        <div className="relative shadow-2xl rounded-[32px] overflow-hidden border border-[#d8cfff] bg-white"
          style={{
            width: 24 * BOARD_WIDTH,
            height: 24 * BOARD_HEIGHT,
            boxShadow: '0 4px 40px 12px #b8a2fd66',
            background: 'radial-gradient(ellipse 120% 100% at 50% 110%, #ceb9fd, #f6f5ff 50%, #fff 100%)'
          }}>
          {/* Board Cells */}
          <div className="absolute inset-0 z-20 flex flex-col">{renderBoard}</div>
          {/* Grid overlay */}
          {gridOverlay}
          {/* Glow/shadow at bottom */}
          {glow}
        </div>
        {/* Controls & Stats */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex gap-2">
            {!playing && !over && (
              <button onClick={startGame} className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-purple-400 to-purple-500 shadow hover:to-purple-600 focus:outline-none">
                <Play className="w-4 h-4 inline mr-1" /> Start
              </button>
            )}
            {playing && (
              <button onClick={() => setPlaying(false)} className="px-5 py-2 rounded-lg bg-white text-purple-500 border border-purple-200 shadow">
                <Pause className="w-4 h-4 inline mr-1" /> Pause
              </button>
            )}
            {over && (
              <button onClick={startGame} className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-purple-400 to-purple-500 shadow hover:to-purple-600">
                <Play className="w-4 h-4 inline mr-1" /> Restart
              </button>
            )}
            <a href="/" className="ml-3">
              <button className="bg-[#f6f2fd] px-4 py-2 rounded-lg text-purple-400 border border-purple-100 hover:bg-purple-50">
                <Home className="w-4 h-4 inline mr-1" /> Home
              </button>
            </a>
          </div>
          <div className="flex gap-7 px-4 py-1 rounded-xl bg-gradient-to-r from-white/70 to-purple-50/40 shadow">
            <div>
              <div className="text-purple-500 font-bold text-lg">{score}</div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
            <div>
              <div className="font-bold text-purple-500">{lines}</div>
              <div className="text-xs text-gray-500">Lines</div>
            </div>
            <div>
              <div className="font-bold text-purple-500">{level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </div>
          </div>
        </div>
        {/* Controls hint */}
        <div className="w-full text-center mt-3 mb-1 text-xs text-gray-400 font-medium">
          <span className="bg-white/90 px-2 py-1 rounded-lg shadow inline-flex gap-2 items-center tracking-wide">
            <span>←</span> <span>→</span> <span>↓</span> Move &nbsp;·&nbsp;
            <span><RotateCw className="w-3 h-3 inline" /></span> Rotate &nbsp;·&nbsp;
            <span>SPACE</span> Drop
          </span>
        </div>
        {over && (
          <div className="mt-7 px-6 py-4 rounded-xl text-center bg-red-100 border border-red-200 text-red-600 font-bold shadow">
            Game Over! Final Score: {score}
          </div>
        )}
      </div>
    </div>
  );
}
