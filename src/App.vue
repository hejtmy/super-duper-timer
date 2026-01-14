<script setup>
import { useThemeStore } from './stores/themeStore'
import { useTimerStore } from './stores/timerStore'
import { storeToRefs } from 'pinia'
import NewTimerForm from './components/NewTimerForm.vue'
import TimerItem from './components/TimerItem.vue'

const themeStore = useThemeStore()
const timerStore = useTimerStore()
// themes is now a ref, so storeToRefs will pickup or we can access directly
const { currentTheme, themes } = storeToRefs(themeStore)
const { timers } = storeToRefs(timerStore)
</script>

<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center py-8 px-4 gap-8 font-sans">
    
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-xl rounded-box max-w-4xl w-full">
      <div class="flex-1">
        <a class="btn btn-ghost text-2xl font-bold text-primary normal-case">Exam Timer</a>
      </div>
      <div class="flex-none gap-2">
         <span class="text-sm font-semibold opacity-70 hidden sm:inline mr-2">Theme:</span>
        <select class="select select-bordered select-sm w-full max-w-xs" v-model="currentTheme">
          <option v-for="theme in themes" :key="theme" :value="theme">
            {{ theme }}
          </option>
        </select>
      </div>
    </div>

    <main class="w-full max-w-4xl flex flex-col gap-6">
      
      <!-- New Timer Form -->
      <div class="card bg-base-100 shadow-xl w-full">
        <div class="card-body">
          <h2 class="card-title text-primary mb-4">Create New Timer</h2>
          <NewTimerForm />
        </div>
      </div>

      <!-- Timer List -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
           <h2 class="text-2xl font-bold ml-1">Active Timers</h2>
           <span class="badge badge-lg badge-neutral" v-if="timers.length">{{ timers.length }}</span>
        </div>
        
        <div v-if="timers.length === 0" class="hero bg-base-100/50 rounded-box py-10 border-2 border-dashed border-base-300">
           <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-3xl font-bold opacity-50">No Timers</h1>
              <p class="py-6 opacity-70">Start a new exam section above to see it here.</p>
            </div>
          </div>
        </div>

        <TimerItem 
          v-for="timer in timers" 
          :key="timer.id" 
          :timer="timer" 
        />
      </div>

    </main>
    
    <footer class="footer footer-center p-4 text-base-content opacity-50">
      <aside>
        <p>Super Duper Exam Timer © {{ new Date().getFullYear() }}</p>
      </aside>
    </footer>
  </div>
</template>

<style scoped>
</style>
