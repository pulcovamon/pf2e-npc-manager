<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type Creature from '@/types/types'
import CreatureFormComponent from '@/components/CreatureForm.vue'

const route = useRoute()
const router = useRouter()

const creature = ref<Creature | null>(null)
const editMode = ref(false)
const edited = ref<Creature>({
  name: '',
  creatureName: '',
  level: 1,
  hp: 1,
  aligment: '',
  creatureFamily: '',
  description: '',
  traits: [],
})

onMounted(async () => {
  if (isNaN(Number(route.params.id))) {
    router.replace({ name: 'NotFound' })
    return
  }

  const res = await fetch(`http://localhost:3000/api/creature/${route.params.id}`)

  if (res.status === 404) {
    router.replace({ name: 'NotFound' })
    return
  }

  const data = await res.json()
  creature.value = data
  edited.value = {
    ...data,
    traits: Array.isArray(data.traits) ? data.traits : [],
  }
})

function enterEditMode() {
  editMode.value = true
}

function cancelEdit() {
  editMode.value = false
  if (creature.value) {
    edited.value = {
      ...creature.value,
      traits: Array.isArray(creature.value.traits) ? creature.value.traits : [],
    }
  }
}

async function saveChanges() {
  const res = await fetch(`http://localhost:3000/api/creature/${route.params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(edited.value),
  })
  const updated = await res.json()
  creature.value = updated
  editMode.value = false
}

async function handleDelete(id: number) {
  const confirmDelete = window.confirm('Are you sure you want to delete this creature?')
  if (!confirmDelete) return
  
  const res = await fetch(`http://localhost:3000/api/creature/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  router.push('/creatures')
}
</script>

<template>
  <div class="p-6 max-w-4xl">
    <div class="mb-4 flex items-center gap-4 text-violet-600">
      <a @click.prevent="router.back()" class="hover:text-violet-900 transition cursor-pointer">
        <font-awesome-icon icon="arrow-left" />
      </a>
      <h1 class="text-2xl font-bold flex-1">
        {{ editMode ? 'Edit Creature' : creature?.name }}
      </h1>

      <button
        v-if="!editMode"
        @click="enterEditMode"
        class="text-sm bg-violet-600 hover:bg-violet-900 text-white px-3 py-1 rounded cursor-pointer"
      >
        <font-awesome-icon icon="pencil" class="mr-1" />
        Edit
      </button>

      <button
        @click="handleDelete(creature.id)"
        class="text-sm bg-violet-600 hover:bg-violet-900 text-white px-3 py-1 rounded cursor-pointer"
      >
        <font-awesome-icon icon="trash-can" />
        Delete
      </button>
    </div>

    <div v-if="creature && !editMode" class="space-y-2 text-gray-900">
      <p><strong>Creature Type:</strong> {{ creature.creatureName }}</p>
      <p><strong>Level:</strong> {{ creature.level }}</p>
      <p><strong>HP:</strong> {{ creature.hp }}</p>
      <p><strong>Alignment:</strong> {{ creature.aligment || '—' }}</p>
      <p><strong>Family:</strong> {{ creature.creatureFamily || '—' }}</p>
      <p><strong>Description:</strong> {{ creature.description || '—' }}</p>
      <div>
        <strong>Traits:</strong>
        <span
          v-for="t in creature.traits"
          :key="t.name"
          class="inline-block bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded mr-1"
        >
          {{ t.name }}
        </span>
      </div>
    </div>

    <div v-if="editMode" class="space-y-4">
      <CreatureFormComponent v-model="edited" />

      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="cancelEdit"
          class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-violet-600 hover:bg-violet-900 text-white rounded cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>

    <div v-if="!creature && !editMode" class="text-gray-500 text-center mt-8">Loading...</div>
  </div>
</template>
