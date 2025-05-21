<script setup lang="ts">
import { ref, watch } from 'vue'
import type Creature from '@/types/types.ts'

const props = defineProps<{
  modelValue: Creature
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Creature): void
}>()

const localForm = ref({ ...props.modelValue })
const traitsInput = ref(localForm.value.traits.join(', ')) // už je string[]

watch(
  () => props.modelValue,
  (newVal) => {
    localForm.value = { ...newVal }
    traitsInput.value = newVal.traits.join(', ')
  },
)

watch(
  [localForm, traitsInput],
  () => {
    emit('update:modelValue', {
      ...localForm.value,
      traits: traitsInput.value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    })
  },
  { deep: true },
)
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block font-semibold mb-1">Name *</label>
      <input
        v-model="localForm.name"
        class="w-full border border-gray-300 rounded p-2"
        type="text"
        placeholder="Ancient Dragon"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Creature Type *</label>
      <input
        v-model="localForm.creatureName"
        class="w-full border border-gray-300 rounded p-2"
        type="text"
        placeholder="Dragon"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Level *</label>
      <input
        v-model.number="localForm.level"
        class="w-full border border-gray-300 rounded p-2"
        type="number"
        min="0"
        placeholder="12"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">HP *</label>
      <input
        v-model.number="localForm.hp"
        class="w-full border border-gray-300 rounded p-2"
        type="number"
        min="1"
        placeholder="200"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Alignment</label>
      <select v-model="localForm.aligment" class="w-full border border-gray-300 rounded p-2">
        <option value="">—</option>
        <option>LG</option>
        <option>NG</option>
        <option>CG</option>
        <option>LN</option>
        <option>TN</option>
        <option>CN</option>
        <option>LE</option>
        <option>NE</option>
        <option>CE</option>
      </select>
    </div>

    <div>
      <label class="block font-semibold mb-1">Creature Family</label>
      <input
        v-model="localForm.creatureFamily"
        class="w-full border border-gray-300 rounded p-2"
        type="text"
        placeholder="Draconic"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Description</label>
      <textarea
        v-model="localForm.description"
        class="w-full border border-gray-300 rounded p-2"
        rows="3"
        placeholder="Ancient desert-dwelling dragon..."
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">Traits (comma-separated)</label>
      <input
        v-model="traitsInput"
        class="w-full border border-gray-300 rounded p-2"
        type="text"
        placeholder="fire, magical, desert"
      />
    </div>
  </div>
</template>
