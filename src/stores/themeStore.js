import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const themeMap = {
    'Naturalist': 'naturalist',
    'Cyberpunk':  'cyberpunk',
    'Bookworm':   'bookworm'
  }

  const themes = Object.keys(themeMap)
  const currentThemeName = ref('Naturalist')

  const saved = localStorage.getItem('sdet-theme')
  if (saved && themes.includes(saved)) currentThemeName.value = saved

  const applyTheme = (name) => {
    const key = themeMap[name] || 'naturalist'
    document.documentElement.setAttribute('data-theme', key)
    document.documentElement.dataset.themeReadable = name
  }

  applyTheme(currentThemeName.value)

  watch(currentThemeName, (val) => {
    applyTheme(val)
    localStorage.setItem('sdet-theme', val)
  })

  return {
    currentTheme: currentThemeName,
    themes: ref(themes)
  }
})
