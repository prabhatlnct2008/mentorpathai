export default function SystemDiagram() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-card" />

      {/* Card */}
      <div className="relative bg-chat-bg rounded-card p-8 border border-border">
        {/* Mentor online pill */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-bubble-bg border border-bubble-border rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-muted">Mentor online</span>
        </div>

        {/* SVG Diagram */}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated connection lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4C6FFF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#4C6FFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4C6FFF" stopOpacity="0.2" />
            </linearGradient>

            {/* Animated pulse along line */}
            <animate
              id="pulse1"
              attributeName="x1"
              values="0%;100%"
              dur="3s"
              repeatCount="indefinite"
            />
          </defs>

          {/* Connection lines with glow */}
          <g className="connection-lines">
            {/* Models to Tools */}
            <line
              x1="200" y1="60" x2="100" y2="120"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
            />

            {/* Models to Context */}
            <line
              x1="200" y1="60" x2="300" y2="120"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: '0.5s' }}
            />

            {/* Tools to Orchestration */}
            <line
              x1="100" y1="140" x2="200" y2="180"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: '1s' }}
            />

            {/* Context to Orchestration */}
            <line
              x1="300" y1="140" x2="200" y2="180"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: '1.5s' }}
            />

            {/* Orchestration to Evaluation */}
            <line
              x1="200" y1="200" x2="120" y2="250"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: '2s' }}
            />

            {/* Orchestration to Production */}
            <line
              x1="200" y1="200" x2="280" y2="250"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse-line"
              style={{ animationDelay: '2.5s' }}
            />
          </g>

          {/* Node: Models (top center) */}
          <g className="node">
            <circle
              cx="200" cy="60"
              r="35"
              fill="#0B1020"
              stroke="#4C6FFF"
              strokeWidth="2"
              className="node-circle"
            />
            <text
              x="200" y="65"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="14"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Models
            </text>
          </g>

          {/* Node: Tools (MCP) (left) */}
          <g className="node">
            <circle
              cx="100" cy="130"
              r="35"
              fill="#0B1020"
              stroke="#7C3AED"
              strokeWidth="2"
              className="node-circle"
            />
            <text
              x="100" y="128"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="12"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Tools
            </text>
            <text
              x="100" y="142"
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              (MCP)
            </text>
          </g>

          {/* Node: Context & Memory (right) */}
          <g className="node">
            <circle
              cx="300" cy="130"
              r="35"
              fill="#0B1020"
              stroke="#10B981"
              strokeWidth="2"
              className="node-circle"
            />
            <text
              x="300" y="128"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="12"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Context
            </text>
            <text
              x="300" y="142"
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              & Memory
            </text>
          </g>

          {/* Node: Orchestration (center) */}
          <g className="node">
            <circle
              cx="200" cy="190"
              r="40"
              fill="#0B1020"
              stroke="#4C6FFF"
              strokeWidth="2.5"
              className="node-circle-main"
            />
            <text
              x="200" y="188"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="13"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
            >
              Orchestration
            </text>
          </g>

          {/* Node: Evaluation (bottom left) */}
          <g className="node">
            <circle
              cx="120" cy="250"
              r="32"
              fill="#0B1020"
              stroke="#7C3AED"
              strokeWidth="2"
              className="node-circle"
            />
            <text
              x="120" y="255"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="13"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Evaluation
            </text>
          </g>

          {/* Node: Production (bottom right) */}
          <g className="node">
            <circle
              cx="280" cy="250"
              r="32"
              fill="#0B1020"
              stroke="#10B981"
              strokeWidth="2"
              className="node-circle"
            />
            <text
              x="280" y="255"
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="13"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              Production
            </text>
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes pulse-line {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }

        .node-circle,
        .node-circle-main {
          filter: drop-shadow(0 0 8px currentColor);
        }

        .node-circle-main {
          filter: drop-shadow(0 0 12px #4C6FFF);
        }

        .node:hover .node-circle,
        .node:hover .node-circle-main {
          filter: drop-shadow(0 0 16px currentColor);
          transition: filter 0.3s ease;
        }
      `}</style>
    </div>
  )
}
