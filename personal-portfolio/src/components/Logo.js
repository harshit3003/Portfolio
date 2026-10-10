'use client';
import styled from 'styled-components';

const SvgIcon = styled.svg`
  width: ${({ $width }) => $width || '44px'};
  height: auto;
  transition: transform 0.3s ease;
  display: inline-block;
  vertical-align: middle;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function Logo({ width = '48px', className, color }) {
    return (
        <SvgIcon
            className={className}
            $width={width}
            viewBox="0 0 160 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="hgLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
            </defs>

            {/* Left Code Bracket < */}
            <path
                d="M28 10 L12 25 L28 40"
                stroke="url(#hgLogoGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* HG Monogram */}
            <text
                x="70"
                y="34"
                textAnchor="middle"
                style={{
                    fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
                    fontWeight: 900,
                    fontSize: '26px',
                    letterSpacing: '2px',
                    fill: color || 'currentColor'
                }}
            >
                HG
            </text>

            {/* Right Code Bracket > */}
            <path
                d="M112 40 L128 25 L112 10"
                stroke="url(#hgLogoGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Slash / */}
            <line
                x1="136"
                y1="38"
                x2="148"
                y2="12"
                stroke="url(#hgLogoGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
            />
        </SvgIcon>
    );
}
