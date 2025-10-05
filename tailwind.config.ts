import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#cccccc',
        primary: {
          DEFAULT: '#00ff00',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#404040',
          foreground: '#cccccc',
        },
        muted: {
          DEFAULT: '#333333',
          foreground: '#cccccc',
        },
        accent: {
          DEFAULT: '#00ff00',
          foreground: '#000000',
        },
        border: '#404040',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
