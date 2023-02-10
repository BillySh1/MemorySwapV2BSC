import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props} viewBox="0 0 293 293" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="146.5" cy="146.5" r="146.5" fill="black" />
      <path d="M142.09 207.45L142.09 36L59.0101 85.39L142.09 207.45Z" fill="#6481F8" />
      <path d="M150.23 207.45L233.31 85.39L150.23 36L150.23 207.45Z" fill="#B9A6FF" />
      <path d="M142.09 221.9L52.0101 89.5601L35.0001 99.67L142.09 256.99L142.09 221.9Z" fill="#7DA2F5" />
      <path d="M150.23 256.99L257.32 99.67L240.31 89.5601L150.23 221.9L150.23 256.99Z" fill="#CAB7FF" />
      <g filter="url(#filter0_d_945_1476)">
        <path
          d="M163.578 107.99L128.24 107.99L49.3201 185.99L87.0133 185.99L145.909 124.128L203.627 185.99L241.32 185.99L163.578 107.99Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_d_945_1476)">
        <path d="M187.32 176.99L164.987 153.99L126.821 153.99L103.32 176.99L187.32 176.99Z" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_945_1476"
          x="45.3201"
          y="107.99"
          width="200"
          height="86"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_945_1476" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_945_1476" result="shape" />
        </filter>
        <filter
          id="filter1_d_945_1476"
          x="99.3201"
          y="153.99"
          width="92"
          height="31"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_945_1476" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_945_1476" result="shape" />
        </filter>
      </defs>
    </Svg>
  );
};

export default Icon;
