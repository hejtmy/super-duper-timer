import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      "forest",      // Natural
      "cyberpunk",   // Cyberpunk
      "retro",       // Ancient
      "lofi",        // Minimalist
    ],
  },
}
