<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number // in ms
}>()

const visible = ref(true)
const emit = defineEmits(['close'])

watchEffect(() => {
  if (props.duration !== 0) {
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration ?? 3000)
  }
})

const colorClass = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
}[props.type ?? 'info']
</script>

<template>
  <transition name="fade">
    <div v-if="visible" :class="`border p-3 rounded shadow text-sm ${colorClass}`">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
