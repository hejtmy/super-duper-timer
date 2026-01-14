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
  
  if (h > 0) return `${h}h ${m}m ${s}s`
  return `${m}m ${s}s`
})

const formattedEndTime = computed(() => {
  return new Date(props.timer.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

// Safe class lookups for Tailwind JIT
const borderClass = computed(() => {
  const map = {
    'primary': 'border-primary',
    'secondary': 'border-secondary',
    'accent': 'border-accent',
    'neutral': 'border-neutral',
    'info': 'border-info',
    'success': 'border-success',
    'warning': 'border-warning',
    'error': 'border-error'
  }
  return map[props.timer.color] || 'border-primary'
})

const progressClass = computed(() => {
  const map = {
    'primary': 'progress-primary',
    'secondary': 'progress-secondary',
    'accent': 'progress-accent',
    'neutral': 'progress-neutral',
    'info': 'progress-info',
    'success': 'progress-success',
    'warning': 'progress-warning',
    'error': 'progress-error'
  }
  return map[props.timer.color] || 'progress-primary'
})
</script>

<template>
  <div class="card bg-base-100 shadow-xl border-l-[8px]" :class="borderClass">
    <div class="card-body p-5">
      
      <!-- Header -->
      <div class="flex justify-between items-start">
        <h2 class="card-title text-2xl">{{ timer.label }}</h2>
        <button class="btn btn-ghost btn-sm btn-circle text-error" @click="timerStore.removeTimer(timer.id)">
            <Trash2 :size="20" />
        </button>
      </div>

      <!-- Time Display -->
      <div class="flex justify-between items-end mt-2">
        <div class="flex flex-col">
          <span class="text-xs uppercase tracking-widest opacity-70">Remaining</span>
          <span class="text-4xl font-black font-mono tracking-tighter">{{ formattedTimeLeft }}</span>
        </div>
        
        <div class="flex flex-col items-end">
          <span class="text-xs uppercase tracking-widest opacity-70">Ends At</span>
          <span class="text-xl font-bold">{{ formattedEndTime }}</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <progress 
        class="progress w-full h-4 mt-4" 
        :class="progressClass" 
        :value="progress" 
        max="100"
      ></progress>

    </div>
  </div>
</template>

<style scoped>
</style>
