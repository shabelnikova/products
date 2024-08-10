import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      truncate: {
        multiline: {
          3: {
            '-webkit-line-clamp': '3',
          },
          4: {
            '-webkit-line-clamp': '4',
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "charcoal": "#2A2C2F",
        "light-gray-cold": "#f8f9fa",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.truncate-3-lines': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          '-webkit-line-clamp': '3',
        },
        '.truncate-4-lines': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          '-webkit-line-clamp': '4',
        },
      });
    },
  ],
};
export default config;
