import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-space': '#0D0D0E',
        'background-console': '#232136',
        'font-console': '#e0def4',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
