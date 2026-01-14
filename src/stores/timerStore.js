import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const timers = ref([])

  // Load from local storage
  const savedTimers = localStorage.getItem('sdet-timers')
  if (savedTimers) {
    try {
      const parsed = JSON.parse(savedTimers)
      // Restore timers, but we might need to adjust remaining times if we were tracking real-time
      // For now, let's just load them. 
      // Ideally, we compare endTime with Date.now() to see if it finished while away.
      timers.value = parsed
    } catch (e) {
      console.error('Failed to load timers', e)
    }
  }

  // Persist
  watch(timers, (newTimers) => {
    localStorage.setItem('sdet-timers', JSON.stringify(newTimers))
  }, { deep: true })

  const addTimer = ({ label, durationMinutes, color }) => {
    const startTime = Date.now()
    const durationMs = durationMinutes * 60000

    timers.value.push({
      id: crypto.randomUUID(),
      label: label || 'Untitled Timer',
      durationOriginal: durationMs,
      startTime,
      endTime: startTime + durationMs,
      color: color || '#4CAF50',
      isFinished: false
    })
  }

  const removeTimer = (id) => {
    const index = timers.value.findIndex(t => t.id === id)
    if (index !== -1) timers.value.splice(index, 1)
  }

  const checkTimers = () => {
    const now = Date.now()
    timers.value.forEach(timer => {
      if (!timer.isFinished && now >= timer.endTime) {
        timer.isFinished = true
      }
    })
  }

  // Start a global ticker
  let interval = null
  const startTicker = () => {
    if (interval) clearInterval(interval)
    interval = setInterval(checkTimers, 1000)
    checkTimers() // Initial check
  }

  const stopTicker = () => {
    if (interval) clearInterval(interval)
  }

  // Initialize ticker
  startTicker()

  return {
    timers,
    addTimer,
    removeTimer,
    startTicker,
    stopTicker
  }
})
