<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue'
import type Creature from '@/types/types.ts'

const props = defineProps<{
  modelValue: Creature
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Creature): void
}>()

const localForm = ref({ ...props.modelValue })
const traitsInput = ref(localForm.value.traits.join(', '))
const errors = ref<{ [key: string]: boolean }>({})

function validate(): boolean {
  const newErrors: { [key: string]: boolean } = {}
  if (!localForm.value.name.trim()) newErrors.name = true
  if (!localForm.value.creatureName.trim()) newErrors.creatureName = true
  if (!localForm.value.level) newErrors.level = true
  if (!localForm.value.hp) newErrors.hp = true

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

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
    validate()
  },
  { deep: true },
)

defineExpose({ validate })
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block font-semibold mb-1">Name *</label>
      <input
        v-model="localForm.name"
        :class="[
          'w-full border rounded p-2',
          errors.name ? 'border-red-500' : 'border-gray-300'
        ]"
        type="text"
        placeholder="Ancient Dragon"
      />
      <p v-if="errors.name" class="text-sm text-red-500 mt-1">Name is required.</p>
    </div>

    <div>
      <label class="block font-semibold mb-1">Creature Type *</label>
      <input
        v-model="localForm.creatureName"
        :class="[
          'w-full border rounded p-2',
          errors.creatureName ? 'border-red-500' : 'border-gray-300'
        ]"
        type="text"
        placeholder="Dragon"
      />
      <p v-if="errors.creatureName" class="text-sm text-red-500 mt-1">Creature Type is required.</p>
    </div>

    <div>
      <label class="block font-semibold mb-1">Level *</label>
      <input
        v-model.number="localForm.level"
        :class="[
          'w-full border rounded p-2',
          errors.level ? 'border-red-500' : 'border-gray-300'
        ]"
        type="number"
        min="0"
        placeholder="12"
      />
      <p v-if="errors.level" class="text-sm text-red-500 mt-1">Level is required.</p>
    </div>

    <div>
      <label class="block font-semibold mb-1">HP *</label>
      <input
        v-model.number="localForm.hp"
        :class="[
          'w-full border rounded p-2',
          errors.hp ? 'border-red-500' : 'border-gray-300'
        ]"
        type="number"
        min="1"
        placeholder="200"
      />
      <p v-if="errors.hp" class="text-sm text-red-500 mt-1">HP is required.</p>
    </div>

    <div>
      <label class="block font-semibold mb-1">Alignment</label>
      <select
        v-model="localForm.aligment"
        class="w-full border border-gray-300 rounded p-2"
      >
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
