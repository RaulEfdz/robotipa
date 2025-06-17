import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="150"
      height="40"
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Robotipa Logo"
    >
      <rect width="150" height="40" rx="5" className="fill-primary" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="font-headline font-semibold text-lg fill-primary-foreground"
      >
        Robotipa
      </text>
    </svg>
  );
};

export default Logo