import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import { brandColors } from './utils/brandColors'

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
        brand: brandColors,
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
