import React from "react";

const EnergyIcon=(props)=>{
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="141.35"
          height="90.54"
          viewBox="0 0 141.35 90.54"
        >
          <defs>
            <radialGradient
              id="radial-gradient"
              cx="89.42"
              cy="55.35"
              r="44.7"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fcd700"></stop>
              <stop offset="0.24" stopColor="#f8ca00"></stop>
              <stop offset="0.69" stopColor="#f3b501"></stop>
              <stop offset="1" stopColor="#f1ae01"></stop>
            </radialGradient>
            <radialGradient
              id="radial-gradient-2"
              cx="52.12"
              cy="6.89"
              r="68.06"
              xlinkHref="#radial-gradient"
            ></radialGradient>
            <radialGradient
              id="radial-gradient-3"
              cx="51.21"
              cy="0.44"
              r="21.45"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f5bc00"></stop>
              <stop offset="0.18" stopColor="#f0a801"></stop>
              <stop offset="0.52" stopColor="#e78701"></stop>
              <stop offset="0.81" stopColor="#e27202"></stop>
              <stop offset="1" stopColor="#e06b02"></stop>
            </radialGradient>
            <radialGradient
              id="radial-gradient-4"
              cx="26.87"
              cy="45.07"
              r="32.35"
              xlinkHref="#radial-gradient-3"
            ></radialGradient>
            <radialGradient
              id="radial-gradient-5"
              cx="53.1"
              cy="30.43"
              r="44.28"
              xlinkHref="#radial-gradient-3"
            ></radialGradient>
          </defs>
          <g>
            <path
              fill="url(#radial-gradient)"
              d="M146 55.35l-11.66 14.13-11.61 14.14H32.88V79a23.67 23.67 0 000-47.33v-4.6h89.85l11.61 14.14z"
              transform="translate(-4.6 -13.04)"
            ></path>
            <path
              fill="#002c59"
              d="M141.14 55.35l-10.63 12.93-10.62 12.93h-82.2V77a21.65 21.65 0 100-43.3v-4.21h82.2l10.62 12.93z"
              transform="translate(-4.6 -13.04)"
            ></path>
            <path
              fill="#eac363"
              d="M32.88 27.08a28.27 28.27 0 1028.26 28.27 28.27 28.27 0 00-28.26-28.27zm0 51.93a23.67 23.67 0 1123.66-23.66A23.66 23.66 0 0132.88 79z"
              transform="translate(-4.6 -13.04)"
            ></path>
            <circle
              cx="32.88"
              cy="55.35"
              r="23.67"
              fill="#002c59"
              transform="rotate(-76.72 22.334 51.737)"
            ></circle>
            <path
              fill="url(#radial-gradient-2)"
              d="M18.17 7.13L10.18 44.41 24.94 44.41 14.97 89.06 46.71 29.52 29.37 29.52 46.71 0 18.17 7.13z"
            ></path>
            <path
              fill="url(#radial-gradient-3)"
              d="M32.2 29.52L48.68 1.48 46.71 0 29.37 29.52 32.2 29.52z"
            ></path>
            <path
              fill="url(#radial-gradient-4)"
              d="M10.18 44.41L12.15 45.88 24.61 45.88 14.97 89.06 24.94 44.41 10.18 44.41z"
            ></path>
            <path
              fill="url(#radial-gradient-5)"
              d="M14.97 89.06L16.94 90.54 48.68 31 46.71 29.52 14.97 89.06z"
            ></path>
          </g>
          <g>
            <text
              fill="#fff"
              fontFamily="Nunito-Bold, Nunito"
              fontSize="42.71"
              fontWeight="700"
              transform="translate(71.64 57.54)"
            >
              {props.energy}
            </text>
          </g>
        </svg>
      );
}

export default EnergyIcon;
