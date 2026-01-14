import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Mapping user-friendly names to DaisyUI themes
  const themeMap = {
    'Natural': 'forest',
    'Cyberpunk': 'cyberpunk',
    'Ancient': 'retro',
    'Minimalist': 'lofi'
  }

  // Reverse map for UI display if needed, but we can just iterate keys
  const themes = Object.keys(themeMap)

  const currentThemeName = ref('Natural') // storage key will hold the Friendly Name

  const savedThemeName = localStorage.getItem('sdet-theme')
  if (savedThemeName && themes.includes(savedThemeName)) {
    currentThemeName.value = savedThemeName
  }

  const applyTheme = (name) => {
    const daisyTheme = themeMap[name] || 'forest'
    document.documentElement.setAttribute('data-theme', daisyTheme)
  }

  // Apply initial
  applyTheme(currentThemeName.value)

  watch(currentThemeName, (val) => {
    console.log('Switching theme to:', val)
    applyTheme(val)
    localStorage.setItem('sdet-theme', val)
  }, { immediate: true })

  return {
    currentTheme: currentThemeName,
    themes: ref(themes)
  }
})
