<script setup>
import { computed, onUnmounted, ref, onMounted } from 'vue'
import { useTimerStore } from '../stores/timerStore'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  timer: {
    type: Object,
    required: true
  }
})

const timerStore = useTimerStore()
const currentTime = ref(Date.now())
let timerInterval

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
})

onUnmounted(() => clearInterval(timerInterval))

const timeLeft = computed(() => {
  const left = props.timer.endTime - currentTime.value
  return left > 0 ? left : 0
})

const progress = computed(() => {
  const total = props.timer.durationOriginal
  const elapsed = total - timeLeft.value
  const pct = (elapsed / total) * 100
  return Math.min(100, Math.max(0, pct))
})

const formattedTimeLeft = computed(() => {
  const ms = timeLeft.value
  const totalSeconds = Math.ceil(ms / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n) => String(n).padStart(2, '0')
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`
  return `${pad(m)}:${pad(s)}`
})

const formattedEndTime = computed(() => {
  return new Date(props.timer.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const toneClass = computed(() => {
  const raw = String(props.timer.color || '1')
  const known = ['1', '2', '3', '4', '5', '6']
  return known.includes(raw) ? `tone-${raw}` : 'tone-1'
})

const pid = computed(() => {
  return props.timer.id ? props.timer.id.slice(0, 4).toUpperCase() : 'XXXX'
})
</script>

<template>
  <article class="timer-card" :class="toneClass" :data-pid="pid">
    <div class="timer-row">

      <h3 class="timer-label">{{ timer.label }}</h3>

      <div class="timer-stat">
        <span class="timer-eyebrow">Remaining</span>
        <span class="timer-time">{{ formattedTimeLeft }}</span>
      </div>

      <div class="timer-stat">
        <span class="timer-eyebrow">Ends</span>
        <span class="timer-endtime">{{ formattedEndTime }}</span>
      </div>

      <div class="progress-rail" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" role="progressbar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <button
        type="button"
        class="app-btn-ghost timer-trash"
        :aria-label="`Remove ${timer.label}`"
        @click="timerStore.removeTimer(timer.id)"
      >
        <Trash2 :size="18" />
      </button>

    </div>
  </article>
</template>
