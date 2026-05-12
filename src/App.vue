<script setup>
import { useThemeStore } from './stores/themeStore'
import { useTimerStore } from './stores/timerStore'
import { storeToRefs } from 'pinia'
import NewTimerForm from './components/NewTimerForm.vue'
import TimerItem from './components/TimerItem.vue'

const themeStore = useThemeStore()
const timerStore = useTimerStore()
const { currentTheme, themes } = storeToRefs(themeStore)
const { timers } = storeToRefs(timerStore)

const subtitleByTheme = {
  Naturalist: 'forest hours, kept by hand',
  Cyberpunk:  'CHRONO//OVERCLOCK_v2.0',
  Bookworm:   'a chronicle of study'
}
</script>

<template>
  <div class="app-shell stagger">

    <header class="app-nav">
      <div class="app-nav-left">
        <span class="app-brand">Exam Timer</span>
        <span class="app-brand-sub">{{ subtitleByTheme[currentTheme] }}</span>
      </div>
      <div class="app-nav-right">
        <span class="field-label" style="margin: 0;">Theme</span>
        <select class="app-select" v-model="currentTheme" style="width: auto; min-width: 180px;">
          <option v-for="theme in themes" :key="theme" :value="theme">
            {{ theme }}
          </option>
        </select>
      </div>
    </header>

    <main class="app-main">

      <section class="app-card">
        <h2 class="card-title">Create New Timer</h2>
        <NewTimerForm />
      </section>

      <section class="timer-section">
        <div class="section-header">
          <h2 class="section-title">Active Timers</h2>
          <span class="section-count" v-if="timers.length">{{ timers.length }}</span>
        </div>

        <div class="timer-list" style="margin-top: 18px;">
          <div v-if="timers.length === 0" class="empty-card">
            <h3 class="empty-title">Nothing Running</h3>
            <p class="empty-body">Set a new section above and it will appear here.</p>
          </div>

          <TimerItem
            v-for="timer in timers"
            :key="timer.id"
            :timer="timer"
          />
        </div>
      </section>

    </main>

    <footer class="app-footer">
      Super Duper Exam Timer · {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>
