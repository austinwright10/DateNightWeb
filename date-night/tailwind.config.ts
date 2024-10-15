import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/onboarding/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFCCCC',
        buttonColor: '#FF6666',
      },
    },
  },
  plugins: [],
}
export default config
