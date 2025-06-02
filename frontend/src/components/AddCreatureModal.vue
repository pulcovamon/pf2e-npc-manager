<script setup lang="ts">
import { ref } from 'vue'
import CreatureFormComponent from '@/components/CreatureForm.vue'
import type Creature from '@/types/types.ts'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', creature: Creature): void
}>()

const formComponentRef = ref<InstanceType<typeof CreatureFormComponent> | null>(null)

const form = ref<Creature>({
  name: '',
  creatureName: '',
  level: 1,
  hp: 1,
  aligment: '',
  creatureFamily: '',
  description: '',
  traits: [],
})

function submit() {
  if (!formComponentRef.value?.validate?.()) return

  emit('add', form.value)
  form.value = {
    name: '',
    creatureName: '',
    level: 1,
    hp: 1,
    aligment: '',
    creatureFamily: '',
    description: '',
    traits: [],
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div
        class="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg max-h-screen overflow-y-auto"
      >
        <h2 class="text-xl font-bold mb-4">Add Creature</h2>

        <form
        id="create"
        @submit="checkForm"
        action="https://vuejs.org/"
        method="post"
        >
          <CreatureFormComponent v-model="form" />
        </form>

        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="close"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="submit"
            class="px-4 py-2 bg-violet-600 hover:bg-violet-900 text-white rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
