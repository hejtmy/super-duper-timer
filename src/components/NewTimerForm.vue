<script setup>
import { ref } from 'vue'
import { useTimerStore } from '../stores/timerStore'
import { Plus } from 'lucide-vue-next'

const timerStore = useTimerStore()

const label = ref('')
const duration = ref(60)
const selectedTone = ref('1')

const tones = ['1', '2', '3', '4', '5', '6']

const addTimer = () => {
  if (duration.value > 0) {
    timerStore.addTimer({
      label: label.value || 'Exam Section',
      durationMinutes: duration.value,
      color: selectedTone.value
    })
    label.value = ''
    duration.value = 60
    selectedTone.value = '1'
  }
}
</script>

<template>
  <form class="form-grid" @submit.prevent="addTimer">

    <div class="field-group">
      <label class="field-label" for="t-label">Label</label>
      <input
        id="t-label"
        v-model="label"
        type="text"
        placeholder="e.g. Math Section"
        class="app-input"
      />
    </div>

    <div class="field-group">
      <label class="field-label" for="t-minutes">Minutes</label>
      <input
        id="t-minutes"
        v-model.number="duration"
        type="number"
        min="1"
        class="app-input"
      />
    </div>

    <div class="field-group">
      <label class="field-label">Tone</label>
      <div class="swatch-row" role="radiogroup" aria-label="Color tone">
        <button
          type="button"
          v-for="t in tones"
          :key="t"
          class="swatch"
          :class="{ 'is-active': selectedTone === t }"
          :data-tone="t"
          :aria-checked="selectedTone === t"
          role="radio"
          :aria-label="`Tone ${t}`"
          @click="selectedTone = t"
        ></button>
      </div>
    </div>

    <button type="submit" class="app-btn-primary">
      <Plus :size="18" />
      Add Timer
    </button>

  </form>
</template>
