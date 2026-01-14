<script setup>
import { ref } from 'vue'
import { useTimerStore } from '../stores/timerStore'
import { Plus } from 'lucide-vue-next'

const timerStore = useTimerStore()

const label = ref('')
const duration = ref(60)
// Using DaisyUI semantic colors instead of hex for better compatibility
const selectedColor = ref('primary')

const colors = [
  { name: 'Primary', value: 'primary', bg: 'bg-primary' },
  { name: 'Secondary', value: 'secondary', bg: 'bg-secondary' },
  { name: 'Accent', value: 'accent', bg: 'bg-accent' },
  { name: 'Neutral', value: 'neutral', bg: 'bg-neutral' },
  { name: 'Info', value: 'info', bg: 'bg-info' },
  { name: 'Success', value: 'success', bg: 'bg-success' },
  { name: 'Warning', value: 'warning', bg: 'bg-warning' },
  { name: 'Error', value: 'error', bg: 'bg-error' },
]

const addTimer = () => {
  if (duration.value > 0) {
    // We pass the semantic class or resolved color. 
    // To keep it simple for the Store (which expects a color string for the border),
    // we might need to change how TimerItem renders it. 
    // For now, let's pass the class name and Handle it in TimerItem.
    timerStore.addTimer({
      label: label.value || 'Exam Section',
      durationMinutes: duration.value,
      color: selectedColor.value // passing 'primary', 'secondary' etc
    })
    
    label.value = ''
    duration.value = 60
    selectedColor.value = 'primary'
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      
      <!-- Label -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Label</span>
        </div>
        <input 
          v-model="label" 
          type="text" 
          placeholder="e.g. Math Section" 
          class="input input-bordered w-full" 
        />
      </label>

      <!-- Duration -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Minutes</span>
        </div>
        <input 
          v-model.number="duration" 
          type="number" 
          min="1" 
          class="input input-bordered w-full" 
        />
      </label>

      <!-- Color Picker -->
      <div class="form-control w-full">
         <div class="label">
          <span class="label-text">Color</span>
        </div>
        <div class="flex flex-wrap gap-2">
            <button 
              v-for="c in colors" 
              :key="c.value"
              class="btn btn-sm btn-circle border-2"
              :class="[c.bg, selectedColor === c.value ? 'ring-2 ring-offset-2 ring-primary' : '']"
              @click="selectedColor = c.value"
              :aria-label="c.name"
            ></button>
        </div>
      </div>

      <!-- Button -->
      <button class="btn btn-primary w-full" @click="addTimer">
        <Plus :size="20" />
        Add Timer
      </button>

    </div>
  </div>
</template>
