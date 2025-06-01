import React from "react";

export const GoldStar = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="url(#goldGradient)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFC300" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
      <filter id="shine" x="0" y="0" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="0.3"
          floodColor="#fff"
          floodOpacity="0.6"
        />
      </filter>
    </defs>
    <path
      filter="url(#shine)"
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
    />
  </svg>
);

export const SilverStar = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="url(#silverGradient)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="silverGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="50%" stopColor="#A9A9A9" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
      <filter id="shine" x="0" y="0" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="0.3"
          floodColor="#fff"
          floodOpacity="0.6"
        />
      </filter>
    </defs>
    <path
      filter="url(#shine)"
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
    />
  </svg>
);

export const BronzeStar = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="url(#bronzeGradient)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bronzeGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#CD7F32" />
        <stop offset="50%" stopColor="#B87333" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
      <filter id="shine" x="0" y="0" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="0.3"
          floodColor="#fff"
          floodOpacity="0.6"
        />
      </filter>
    </defs>
    <path
      filter="url(#shine)"
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
    />
  </svg>
);
