interface BrandProps {
  className?: string;
}

const letters: { ch: string; color: string }[] = [
  { ch: "h", color: "#7cae8a" },
  { ch: "e", color: "#5b4b3a" },
  { ch: "l", color: "#7fa8d0" },
  { ch: "d", color: "#7fa8d0" },
  { ch: "e", color: "#f2b84b" },
  { ch: "n", color: "#1f3d2b" },
];

function Footprint({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} fill="#7cae8a">
      <ellipse cx="0" cy="1.1" rx="1.15" ry="1.7" />
      <circle cx="-0.85" cy="-1.15" r="0.42" />
      <circle cx="-0.1" cy="-1.5" r="0.45" />
      <circle cx="0.7" cy="-1.35" r="0.42" />
      <circle cx="1.25" cy="-0.75" r="0.36" />
    </g>
  );
}

export default function Brand({ className = "" }: BrandProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 30" className="w-auto" style={{ height: "1.5em" }} aria-hidden>
        <path
          d="M16 27.5C6.2 20.2 2 16.2 2 10.8 2 6.9 5 4 8.7 4c2.3 0 4.5 1.1 5.9 2.9C15.9 5.1 18.1 4 20.4 4 24.1 4 27 6.9 27 10.8c0 5.4-4.2 9.4-11 16.7z"
          fill="none"
          stroke="#7cae8a"
          strokeWidth="1.6"
        />
        <Footprint x={11.5} y={12} rotate={-14} />
        <Footprint x={17} y={9.5} rotate={10} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold tracking-tight" style={{ fontSize: "1em" }}>
          {letters.map((l, i) => (
            <span key={i} style={{ color: l.color }}>
              {l.ch}
            </span>
          ))}
        </span>
        <span
          className="font-semibold uppercase text-brown/70"
          style={{ fontSize: "0.3em", letterSpacing: "0.35em", marginTop: "0.25em" }}
        >
          Spielzeug
        </span>
      </span>
    </span>
  );
}
