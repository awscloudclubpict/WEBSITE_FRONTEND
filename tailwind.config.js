/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Global colors
        'global-1': '#060717',
        'global-2': '#060c20',
        'global-3': '#071128',
        'global-4': '#0711287c',
        'global-5': '#091734',
        'global-6': '#09173499',
        'global-7': '#1119407f',
        'global-8': '#327dd6',
        'global-9': '#f4b631',
        'global-10': '#ffffff',
        
        // Text colors
        'text-global-1': '#000000',
        'text-global-2': '#327dd6',
        'text-global-3': '#f4b631',
        'text-global-4': '#ffffff',
        'text-global-5': '#ffffff99',
        
        // Header colors
        'header-1': '#67a5de',
        
        // Button colors
        'button-1': '#ffcb18',
      },
      backgroundImage: {
        'gradient-blue-purple': 'linear-gradient(90deg, #327dd6 0%, #9e53d1 100%)',
      },
    },
  },
  plugins: [],
}