import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

// Colors sourced from AGENTS.md; mapped into Tailwind theme without hardcoding in components
const colors = {
  green: {
    DEFAULT: '#9dc64e',
    light: '#b6da76',
    dark: '#7ea33e',
  },
  orange: {
    DEFAULT: '#f59043',
    light: '#f9a766',
    dark: '#c97332',
  },
  pink: {
    DEFAULT: '#d15175',
    light: '#df7a97',
    dark: '#a8415e',
  },
  blue: {
    DEFAULT: '#539bbd',
    light: '#78b4cf',
    dark: '#427c97',
  },
  lavender: {
    DEFAULT: '#8a9bbd',
    light: '#a6b2cd',
    dark: '#6e7c97',
  },
  dark: {
    DEFAULT: '#1a1a1a',
    light: '#2a2a2a',
    dark: '#111111',
  },
  text: {
    DEFAULT: '#2f2e2b',
    light: '#4a4945',
    dark: '#22211f',
  },
  primary: {
    DEFAULT: '#c81f1d',
    light: '#e13b38',
    dark: '#9f1816',
  },
  background: {
    DEFAULT: '#f0e8d1',
    light: '#fcf9ef',
    dark: '#ded3b5',
  }
}

const config: Config = {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './content/**/*.{md,mdc}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: colors,
      },
      fontFamily: {
        heading: [
          'roc-grotesk-compressed',
          'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'
        ],
        'heading-wide': [
          'roc-grotesk-wide',
          'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'
        ],
        'heading-normal': [
          'roc-grotesk',
          'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'
        ],
        body: [
          'museo-slab',
          'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'
        ],
      },
    },
  },
  plugins: [typography],
}

export default config
